---
name: astro-dev
description: "Astro framework development and debugging. Use when working with Astro projects, optimizing build performance, debugging Astro components, troubleshooting SSR issues, configuring Astro integrations, or improving Astro application performance."
tags: ["astro", "typescript", "javascript", "performance", "debugging"]
---

# Astro Development and Debugging Skill

This skill provides guidance for developing, debugging, and optimizing Astro projects.

## Quick Start

### Essential CLI Commands

**Development:**
- `astro dev` - Start dev server with HMR (Hot Module Replacement), by default started on port 4321.
- `astro dev --open` - Start dev server and open browser
- `astro dev --host` - Expose server to network

**Build & Preview:**
- `astro build` - Production build (outputs to `dist/`)
- `astro preview` - Preview production build locally
- `astro check` - Type-check `.astro` files

**Debugging:**
- `astro dev --verbose` - Verbose logging
- `DEBUG=vite:* astro dev` - Vite-level debugging
- `astro build --dev` - Development build for debugging

## Common Debugging Scenarios

### 1. Component Not Rendering
- Check if it's in the frontmatter (server-side) or template (client/server)
- Verify imports are correct
- Use `<Debug />` component to inspect values

### 2. Hydration Issues
- Verify `client:*` directive is present for interactivity
- Check browser console for hydration errors
- Common directives: `client:load`, `client:idle`, `client:visible`, `client:only`

### 3. Type Errors
- Run `astro check` to identify issues
- Ensure TypeScript configuration is correct
- Check imported types match expected structure

### 4. Build Failures
- Review terminal output for specific errors
- Check `astro.config.mjs` for misconfigurations
- Verify all dependencies are installed
- Use `--verbose` for detailed build logs

### 5. Performance Issues
- Minimize client-side JavaScript with server-first rendering
- Use `client:*` directives sparingly
- Leverage Astro's image optimization
- Check bundle size in build output

## Server vs Client Debugging

**Server-side (Astro frontmatter `---`):**
- `console.log()` appears in **terminal**
- Runs during build/SSR
- No browser JavaScript needed

**Client-side (`<script>` tags):**
- `console.log()` appears in **browser console**
- Runs after page load
- Requires JavaScript in browser

**Framework Components (React, Vue, Svelte):**
- Render server-side by default → logs in terminal
- Add `client:*` directive → also logs in browser after hydration

## Dev Toolbar

Enabled by default in development:
- Inspect island hydration
- Check accessibility
- View component tree
- Audit performance

Access at bottom-right corner of dev page.

## Best Practices

1. **Start server-first**: Use static Astro components, add hydration only when needed
2. **Type safety**: Run `astro check` regularly during development
3. **Test builds**: Always test with `astro build` + `astro preview` before deployment
4. **Debug systematically**: Use verbose mode, check both terminal and browser console
5. **Keep dependencies updated**: Prevents compatibility issues

## Integration with React

- React components are **static by default** (zero JavaScript to client)
- Add `client:load` or similar for interactivity
- React 19 fully supported
- Hooks only work with `client:*` directives
- Use Astro components for layouts, React for interactive islands

## Additional Resources

For comprehensive documentation including advanced debugging techniques, performance optimization strategies, testing approaches, and framework integration patterns, see:
- [Astro Documentation](https://docs.astro.build)
- [CLI Reference](https://docs.astro.build/en/reference/cli-reference/)
- [Troubleshooting Guide](https://docs.astro.build/en/guides/troubleshooting/)

## Project Analysis

To analyze your current Astro configuration:
```bash
cat astro.config.mjs
cat package.json
```

This helps identify integration setup, build options, and available scripts.
