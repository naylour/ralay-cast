import { $ } from 'bun';

await $`rm -rf ./dist`;

await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    format: 'esm',
    target: 'bun',
    tsconfig: './tsconfig.build.json',
    packages: 'external',
    splitting: true,
    sourcemap: 'linked',
});

// Bun.build не генерирует декларации — их эмитит tsc (emitDeclarationOnly)
await $`tsc -p tsconfig.build.json`;
