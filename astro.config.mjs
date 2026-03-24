// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    // Use "static" output for purely static site generation (like Next.js output: "export")
    experimental: {
        chromeDevtoolsWorkspace: true,
    },
    output: "static",
    site: "https://paulbu.com",

    integrations: [react(), partytown({
        config: {
            forward: ["dataLayer.push"],
            lib: "/partytown/",
        },
    }), mdx(), sitemap({
        customPages: [
            'https://paulbu.com/paul-buramensky-resume.md',
            'https://paulbu.com/paul-buramensky-resume.pdf',
            'https://paulbu.com/llms.txt'
        ]
    })],

    vite: {
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