import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock CSS modules
vi.mock('*.module.scss', () => ({
    default: new Proxy({}, {
        get: (_target, prop) => prop,
    }),
}));

// Mock window methods
Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: vi.fn(),
});

Object.defineProperty(window, 'scrollY', {
    writable: true,
    value: 0,
});

Object.defineProperty(window, 'innerHeight', {
    writable: true,
    value: 768,
});

// Mock document.body.clientHeight
Object.defineProperty(document.body, 'clientHeight', {
    writable: true,
    value: 3000,
});
