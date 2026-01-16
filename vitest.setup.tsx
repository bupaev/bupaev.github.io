import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock Next.js Image component
vi.mock('next/image', () => ({
    default: ({ src, alt, width, height, ...props }: {
        src: string;
        alt: string;
        width: number;
        height: number;
        [key: string]: unknown;
    }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} width={width} height={height} {...props} />;
    },
}));

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
