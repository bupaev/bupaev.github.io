---
trigger: always_on
---

# Javascript coding rules

## Code Style and Structure

- Write concise, technical TypeScript code strictly following Airbnb TypeScript Styleguide
- Use functional and declarative programming patterns; avoid classes.
- Prefer composition over inheritance.

## TypeScript Usage

- Use TypeScript for all code; prefer types over interfaces.
- Use strict mode in TypeScript for better type safety.
- Avoid enums; use maps instead.
- Avoid using `any` or `unknown` unless absolutely necessary. Look for type definitions in the codebase instead.
- Avoid type assertions with `as` or `!`.

## React Best Practices

- Use React v19 features and syntax
- Use react-router v7
- Reduce manual use of `useMemo`/`useCallback` unless handling expensive computations, because React 19 compiler automatically handles: Component memoization, State update batching, Async rendering optimizations
- Adopt new React 19 hooks`useActionState`, `useOptimistic` ,`useFormStatus` where they are reasonable
- Use TypeScript type checking instead of prop-types because they are removed in React 19 removes
- Follow the Rules of Hooks (only call hooks at the top level, only call hooks from React functions).
- Create custom hooks to extract reusable component logic.
- Implement useCallback for memoizing functions passed as props.
- Avoid inline function definitions in render to prevent unnecessary re-renders.
- Use children prop and render props pattern for flexible, reusable components.
- Implement React.lazy() and Suspense for code splitting.
- Use refs sparingly and mainly for DOM access.
- Prefer controlled components over uncontrolled components.
- Use cleanup functions in useEffect to prevent memory leaks.
- Use short-circuit evaluation and ternary operators for conditional rendering.

## Performance Optimization

- Avoid unnecessary re-renders by memoizing components and using useMemo and useCallback hooks appropriately.

## State Management

- Use Redux Toolkit
- Use context for intermediate state sharing when prop drilling becomes cumbersome.

## Error Handling and Validation

- Use Zod for runtime validation and error handling.
- Implement error boundaries to catch and handle errors gracefully.
- Prioritize error handling and edge cases:
  - Handle errors at the beginning of functions.
  - Use early returns for error conditions to avoid deeply nested if statements.
  - Avoid unnecessary else statements; use if-return pattern instead.
  - Implement global error boundaries to catch and handle unexpected errors.

## Testing

- Write comprehensive unit tests for all component using Vitest and React Testing Library.
- Run unit tests after each code change using watch mode
- Implement integration tests for critical user flows.
- Use snapshot testing for components to ensure UI consistency judiciously.

## Security

- Sanitize user inputs to prevent XSS attacks.
- Ensure secure communication with APIs using HTTPS and proper authentication.

## Documentation

- Use @JSDoc format with well-defined description of business logic and non-obvious code
- Don't add redundant comments to self-explanatory code

