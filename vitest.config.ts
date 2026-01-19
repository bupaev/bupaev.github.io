import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.tsx'],
        include: ['**/*.test.{ts,tsx}'],
        exclude: ['node_modules', 'e2e'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: ['components/**/*.{ts,tsx}'],
            exclude: ['**/*.test.{ts,tsx}', '**/*.d.ts'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
