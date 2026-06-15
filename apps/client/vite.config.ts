import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { mdsvex } from 'mdsvex';
import adapter from 'svelte-adapter-bun';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [
        tailwindcss({
            optimize: {
                minify: true,
            },
        }),
        sveltekit({
            compilerOptions: {
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
                experimental: { async: true },
            },
            adapter: adapter({
                out: './build',
                precompress: true,
                serveAssets: true,
            }),
            preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
            extensions: ['.svelte', '.svx', '.md'],
            experimental: {
                remoteFunctions: true,
                handleRenderingErrors: true,
                forkPreloads: true,
            },
            alias: {
                '@styles': './src/styles',
                '@lib': './src/lib',
                '@i18n': './src/lib/i18n',
                '@components': './src/components',
                '@sections': './src/sections',
            },
        }),
        paraglideVitePlugin({
            project: './i18n.inlang',
            outdir: './src/lib/i18n',
            cleanOutdir: true,
            cookieName: 'I18N_LOCALE',
            localStorageKey: 'I18N_LOCALE',
            strategy: [
                'baseLocale',
                'cookie',
                'globalVariable',
                'localStorage',
                'preferredLanguage',
                'url',
            ],
        }),
    ],
    build: {
        target: 'esnext',
        cssMinify: 'lightningcss',
        minify: 'oxc',
    },
    css: {
        transformer: 'lightningcss',
        devSourcemap: true,
    },

    dev: {
        sourcemap: true,
    },

    server: {
        forwardConsole: {
            logLevels: ['debug', 'warn', 'error'],
            unhandledErrors: true,
        },
    },
    test: {
        expect: { requireAssertions: true },
        projects: [
            {
                extends: './vite.config.ts',
                test: {
                    name: 'client',
                    browser: {
                        enabled: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium', headless: true }],
                    },
                    include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                    exclude: ['src/lib/server/**'],
                },
            },

            {
                extends: './vite.config.ts',
                test: {
                    name: 'server',
                    environment: 'node',
                    include: ['src/**/*.{test,spec}.{js,ts}'],
                    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                },
            },
        ],
    },
});
