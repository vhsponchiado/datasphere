import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    test: {
        globals: true,
        root: './',
        environment: 'node',
        include: ['test/units/**/*.spec.ts', 'test/e2e/**/*.e2e-spec.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.ts'],
            exclude: ['src/main.ts', 'src/**/*.module.ts', 'src/**/*.dto.ts', 'src/**/*.entity.ts'],
        },
    },
    plugins: [
        swc.vite({
            module: { type: 'es6' },
        }),
        tsconfigPaths(),
    ],
});
