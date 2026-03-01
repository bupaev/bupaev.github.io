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
    title: 'Dedication to Success',
    fit: 'You are genuinely interested in your product\'s success and care deeply about the quality of the final outcome.',
    noFit: 'You are indifferent to the success of the product, don\'t care about its quality, and don\'t truly believe in its long-term vision.',
  },
  {
    title: 'Technical Breadth',
    fit: 'You value a "T-shaped" engineer. You need someone with a strong fundamental background who sees the bigger picture and can quickly adapt to changing tech stacks.',
    noFit: 'You are strictly looking for a narrow specialist with hyper-focused  expertise in one specific framework. If the role is confined to the quirks of a single technology, our approaches might not align.',
  },
  {
    title: 'Product Complexity',
    fit: 'You are building complex, feature-rich interfaces where a smooth, thoughtful user experience is what sets you apart from the competition.',
    noFit: 'You just need a few basic internal CRUD forms knocked out, where visual polish and user satisfaction don\'t really move the needle for your business.',
  },
  {
    title: 'Sustainable Balance',
    fit: 'You know that software is a marathon. You value a healthy, sustainable balance between delivering quickly and keeping the foundation solid.',
    noFit: 'Everything is an emergency. The mindset is "ship it yesterday," and we\'re constantly piling up technical debt for our future selves to deal with.',
  },
  // {
  //   title: 'Product Mindset',
  //   fit: 'You want a lead engineer who looks at the big picture and asks "Why?" before typing. You appreciate someone who challenges assumptions and brings ideas to the table.',
  //   noFit: 'You just want a silent "ticket closer." If you\'re looking for someone to take orders and blindly implement Jira tickets without asking questions, I\'m not your guy.',
  // },
  {
    title: 'AI & Innovation',
    fit: 'You understand the critical role of AI in modern product success, adopting it thoughtfully but remaining fully aware of its practical limitations and security risks.',
    noFit: 'You\'re caught in the extremes: either completely terrified of AI, or blindly trusting AI to generate your core product without understanding what\'s under the hood.',
  },
  // {
  //   title: 'Purpose & Impact',
  //   fit: 'You recognize that financial success is the baseline, but you are also deeply driven by the global purpose of your product and its positive impact on users.',
  //   noFit: 'Your only metric for success is profit, and you are completely indifferent to the actual value or human impact your product delivers.',
  // },
];