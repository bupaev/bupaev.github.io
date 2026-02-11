/**
 * Data definitions for the "Are We the Right Fit?" section.
 * Each criterion describes environments where the engineer thrives vs. doesn't fit.
 */

export type FitCriterion = {
  title: string;
  fit: string;
  noFit: string;
};

export const FIT_CRITERIA: FitCriterion[] = [
  {
    title: 'Product Complexity',
    fit: 'You are building complex, feature-rich interfaces where sophisticated design and top-tier User Experience are critical for success.',
    noFit: 'You need basic interfaces for simple CRUD operations where user delight is an afterthought or not important for business.',
  },
  {
    title: 'Engineering Balance',
    fit: 'You strive for a sustainable balance between code quality, maintainability, extensibility, and speed of delivery.',
    noFit: 'You prioritize "pushing code to production" at all costs, treating technical debt as a problem for another day (or never).',
  },
  {
    title: 'Product Mindset',
    fit: 'You need a partner who dives deep into business context, asks "Why?", and cares about the product\u2019s success as much as the code.',
    noFit: 'You are looking for a "ticket closer" who silently executes specifications without questioning product decisions.',
  },
  {
    title: 'Design & Process',
    fit: 'You treat Design Systems and Accessibility as first-class citizens and value a bridge between design and engineering.',
    noFit: 'You accept "it looks roughly like the mockup" as a passing grade and view UI details as unnecessary polish.',
  },
  {
    title: 'Team Culture',
    fit: 'You want to build a transparent culture (like an orchestra) with clear processes, documentation, and knowledge sharing.',
    noFit: 'You rely on chaos, "hero culture," or isolated coding where processes are seen purely as bureaucracy.',
  },
  {
    title: 'AI & Innovation',
    fit: 'You embrace a balanced approach to AI: harnessing its power as a force multiplier while maintaining critical awareness of its risks, limitations, and legal boundaries.',
    noFit: 'You tend toward extremes: either fearing AI like fire due to compliance paralysis, or blindly chasing the "vibe-coding" hype with no clue what\u2019s running under the hood.',
  },
];
