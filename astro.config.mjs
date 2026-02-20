// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    // Use "static" output for purely static site generation (like Next.js output: "export")
    experimental: {
        chromeDevtoolsWorkspace: true,
    },
    output: "static",

    integrations: [
        react(),
        partytown({
            config: {
                forward: ["dataLayer.push"],
            },
        }),
        mdx()
    ],

    vite: {
        plugins: [tailwindcss()],
        css: {
            devSourcemap: true,
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
    },
});
