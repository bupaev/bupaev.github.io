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
    fit: 'You prioritize product success and personally advocate for the quality and impact of the final outcome.',
    noFit: 'You are pretty indifferent to product success and lack conviction in the long-term vision or value of the results.',
  },
  {
    title: 'Technical Breadth',
    fit: 'You value "T-shaped" engineers who leverage strong fundamentals to master any tech stack and see the big picture.',
    noFit: 'You seek a narrow specialist with focused expertise in one specific framework for a limited scope of work.',
  },
  {
    title: 'Product Complexity',
    fit: 'You build complex interfaces where a polished, intuitive user experience creates competitive advantage.',
    noFit: 'You need basic CRUD forms where visual polish and user satisfaction do not drive business value.',
  },
  {
    title: 'Sustainable Balance',
    fit: 'You treat software as a marathon. You balance rapid delivery with a robust, sustainable foundation.',
    noFit: 'You manage by emergency. A "ship it yesterday" mindset consistently prioritizes speed over technical health.',
  },
  {
    title: 'AI & Innovation',
    fit: 'You adopt AI thoughtfully: maximizing its potential while managing practical limits and security risks.',
    noFit: 'You swing between extremes: either avoiding AI entirely or trusting it blindly without technical oversight.',
  },
  {
    title: 'Purpose & Impact',
    fit: 'You see profit as the baseline but are driven by a product\'s global purpose and positive impact on users.',
    noFit: 'You prioritize profit over value and remain indifferent to the actual human impact your product delivers.',
  },
];