#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const sourceRelativePath = 'docs/brand-system/design-tokens.v3.generic.json';
const cssOutputRelativePath = 'src/styles/brand/tokens.generated.css';
const typescriptOutputRelativePath = 'src/themes/brand-tokens.generated.ts';
const supportedArguments = new Set(['--check']);

for (const argument of process.argv.slice(2)) {
    if (!supportedArguments.has(argument)) {
        throw new Error(`Unknown argument: ${argument}`);
    }
}

const checkOnly = process.argv.includes('--check');
const sourcePath = path.join(repositoryRoot, sourceRelativePath);
const outputs = [
    {
        relativePath: cssOutputRelativePath,
        build: buildCss
    },
    {
        relativePath: typescriptOutputRelativePath,
        build: buildTypescript
    }
];

const source = JSON.parse(await readFile(sourcePath, 'utf8'));

validateSource(source);

const generatedOutputs = outputs.map(output => ({
    ...output,
    path: path.join(repositoryRoot, output.relativePath),
    content: output.build(source)
}));

if (checkOnly) {
    const staleOutputs = [];

    for (const output of generatedOutputs) {
        let currentContent;

        try {
            currentContent = await readFile(output.path, 'utf8');
        } catch (error) {
            if (error && error.code === 'ENOENT') {
                staleOutputs.push(output.relativePath);
                continue;
            }

            throw error;
        }

        if (currentContent !== output.content) {
            staleOutputs.push(output.relativePath);
        }
    }

    if (staleOutputs.length > 0) {
        console.error('Generated brand token artifacts are stale:');

        for (const staleOutput of staleOutputs) {
            console.error(`- ${staleOutput}`);
        }

        console.error('Run `npm run brand:tokens` and commit the updated artifacts.');
        process.exitCode = 1;
    } else {
        console.log('Generated brand token artifacts are up to date.');
    }
} else {
    for (const output of generatedOutputs) {
        await mkdir(path.dirname(output.path), { recursive: true });

        let currentContent = null;

        try {
            currentContent = await readFile(output.path, 'utf8');
        } catch (error) {
            if (!error || error.code !== 'ENOENT') {
                throw error;
            }
        }

        if (currentContent !== output.content) {
            await writeFile(output.path, output.content, 'utf8');
            console.log(`Generated ${output.relativePath}`);
        }
    }

    console.log('Brand token generation complete.');
}

function validateSource(tokens) {
    assertObject(tokens, 'token source');
    assertObject(tokens.meta, 'meta');

    if (typeof tokens.meta.version !== 'string' || !tokens.meta.version) {
        throw new Error('meta.version must be a non-empty string.');
    }

    assertObject(tokens.themes, 'themes');
    assertObject(tokens.themes.light, 'themes.light');
    assertObject(tokens.themes.dark, 'themes.dark');
    assertMatchingLeafPaths(tokens.themes.light, tokens.themes.dark, 'light theme', 'dark theme');

    assertObject(tokens.shadow, 'shadow');
    assertObject(tokens.shadow.light, 'shadow.light');
    assertObject(tokens.shadow.dark, 'shadow.dark');
    assertMatchingLeafPaths(tokens.shadow.light, tokens.shadow.dark, 'light shadows', 'dark shadows');

    for (const key of ['typography', 'radius', 'space', 'layout', 'motion', 'components']) {
        assertObject(tokens[key], key);
    }

    for (const themeName of ['light', 'dark']) {
        const theme = tokens.themes[themeName];
        const themeLabel = `${themeName} theme`;

        assertContrast(theme, 'color.text.primary', 'color.bg.canvas', 4.5, `${themeLabel} primary text on canvas`);
        assertContrast(theme, 'color.text.primary', 'color.surface.default', 4.5, `${themeLabel} primary text on surface`);
        assertContrast(theme, 'color.text.inverse', 'color.bg.inverse', 4.5, `${themeLabel} inverse text`);
        assertContrast(theme, 'color.border.focus', 'color.bg.canvas', 3, `${themeLabel} focus on canvas`);
        assertContrast(theme, 'color.border.focus', 'color.surface.default', 3, `${themeLabel} focus on surface`);
    }
}

function assertObject(value, label) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`${label} must be an object.`);
    }
}

function assertMatchingLeafPaths(left, right, leftLabel, rightLabel) {
    const leftPaths = collectLeafEntries(left).map(([tokenPath]) => tokenPath);
    const rightPaths = collectLeafEntries(right).map(([tokenPath]) => tokenPath);
    const onlyLeft = leftPaths.filter(tokenPath => !rightPaths.includes(tokenPath));
    const onlyRight = rightPaths.filter(tokenPath => !leftPaths.includes(tokenPath));

    if (onlyLeft.length === 0 && onlyRight.length === 0) {
        return;
    }

    const details = [];

    if (onlyLeft.length > 0) {
        details.push(`${leftLabel} only: ${onlyLeft.join(', ')}`);
    }

    if (onlyRight.length > 0) {
        details.push(`${rightLabel} only: ${onlyRight.join(', ')}`);
    }

    throw new Error(`Theme token paths do not match (${details.join('; ')}).`);
}

function collectLeafEntries(value, segments = []) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        return Object.entries(value).flatMap(([key, childValue]) => collectLeafEntries(childValue, [...segments, key]));
    }

    if (Array.isArray(value)) {
        throw new Error(`Token ${segments.join('.')} must be a scalar value.`);
    }

    if (!['string', 'number'].includes(typeof value)) {
        throw new Error(`Token ${segments.join('.')} must be a string or number.`);
    }

    return [[segments.join('.'), value]];
}

function getTokenValue(tokens, tokenPath) {
    const value = tokenPath.split('.').reduce((currentValue, segment) => currentValue?.[segment], tokens);

    if (value === undefined) {
        throw new Error(`Required token ${tokenPath} is missing.`);
    }

    return value;
}

function assertContrast(theme, foregroundPath, backgroundPath, minimumRatio, label) {
    const foreground = getTokenValue(theme, foregroundPath);
    const background = getTokenValue(theme, backgroundPath);
    const ratio = contrastRatio(foreground, background);

    if (ratio < minimumRatio) {
        throw new Error(`${label} contrast is ${ratio.toFixed(2)}:1; expected at least ${minimumRatio}:1.`);
    }
}

function contrastRatio(foreground, background) {
    const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
    const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
    return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(color) {
    if (typeof color !== 'string' || !/^#[0-9a-f]{6}$/i.test(color)) {
        throw new Error(`Contrast tokens must use six-digit hex colors; received ${String(color)}.`);
    }

    const channels = color.slice(1).match(/.{2}/g).map(channel => Number.parseInt(channel, 16) / 255);
    const linearChannels = channels.map(channel => channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4);

    return (0.2126 * linearChannels[0]) + (0.7152 * linearChannels[1]) + (0.0722 * linearChannels[2]);
}

function buildCss(tokens) {
    const sharedVariables = [
        ...namedEntries(tokens.typography.fontFamily, '--brand-font-family'),
        ...Object.entries(tokens.typography.scale).flatMap(([role, values]) => namedEntries(values, `--brand-type-${toKebabCase(role)}`)),
        ...namedEntries(tokens.radius, '--brand-radius'),
        ...namedEntries(tokens.space, '--brand-space'),
        ...namedEntries(tokens.layout, '--brand-layout'),
        ...namedEntries(tokens.motion.durations, '--brand-motion-duration'),
        ...namedEntries(tokens.motion.easing, '--brand-motion-easing'),
        ...namedEntries(tokens.motion.patterns, '--brand-motion-pattern'),
        ...collectLeafEntries(tokens.components).map(([tokenPath, value]) => [
            `--brand-component-${tokenPath.split('.').map(toKebabCase).join('-')}`,
            value
        ])
    ];
    const lightVariables = buildThemeVariables(tokens, 'light');
    const darkVariables = buildThemeVariables(tokens, 'dark');

    return `${generatedHeader(tokens.meta.version, 'CSS')}\n${cssRule(':root', sharedVariables)}\n\n${cssRule(':root,\n.v-theme--light', lightVariables)}\n\n${cssRule(':root.dark,\n.v-theme--dark', darkVariables)}\n`;
}

function buildThemeVariables(tokens, themeName) {
    return [
        ...collectLeafEntries(tokens.themes[themeName].color).map(([tokenPath, value]) => [
            `--brand-color-${tokenPath.split('.').map(toKebabCase).join('-')}`,
            value
        ]),
        ...namedEntries(tokens.shadow[themeName], '--brand-shadow')
    ];
}

function namedEntries(values, prefix) {
    return Object.entries(values).map(([key, value]) => [`${prefix}-${toKebabCase(key)}`, value]);
}

function cssRule(selector, variables) {
    const declarations = variables.map(([name, value]) => `    ${name}: ${value};`).join('\n');
    return `${selector} {\n${declarations}\n}`;
}

function buildTypescript(tokens) {
    const themeTokens = {
        light: {
            color: tokens.themes.light.color,
            shadow: tokens.shadow.light
        },
        dark: {
            color: tokens.themes.dark.color,
            shadow: tokens.shadow.dark
        }
    };
    const sharedTokens = {
        typography: tokens.typography,
        radius: tokens.radius,
        space: tokens.space,
        layout: tokens.layout,
        motion: tokens.motion,
        components: tokens.components
    };

    return `${generatedHeader(tokens.meta.version, 'TypeScript')}\nexport const brandTokenMeta = ${formatTypescriptValue(tokens.meta)} as const;\n\nexport const brandThemeTokens = ${formatTypescriptValue(themeTokens)} as const;\n\nexport const brandSharedTokens = ${formatTypescriptValue(sharedTokens)} as const;\n\nexport type BrandThemeName = keyof typeof brandThemeTokens;\n`;
}

function formatTypescriptValue(value) {
    return JSON.stringify(value, null, 4);
}

function generatedHeader(version, format) {
    return `/*\n * Generated ${format} brand tokens. Do not edit directly.\n * Source: ${sourceRelativePath}\n * Source version: ${version}\n * Run: npm run brand:tokens\n */`;
}

function toKebabCase(value) {
    return value
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/[_\s]+/g, '-')
        .toLowerCase();
}
