const TITLE_STYLE =
  "font-size: 14px; font-weight: 800; color: gold; background: #245695; padding: 2px 0;";
const GREETING_STYLE =
  "font-size: 14px; font-weight: 400; color: gold; background: #245695; padding: 2px 0;";
const BODY_STYLE = "font-size: 12px; font-family: monospace; color: inherit;";

console.log(
  `%c|˶˙ᵕ˙ )ﾉﾞ %cHey, fellow developer!\n\n` +
    `%cIf you're poking around this code — welcome.\n\n` +
    `This codebase has survived three framework migrations (Next → Nuxt → Astro), ` +
    `so it carries some battle scars. There's plenty that could be refactored ` +
    `from a Clean Code perspective, but pragmatically — it works, it ships, ` +
    `and the ROI on polishing it right now is roughly zero.\n\n` +
    `That refactor will happen someday. Realistically, when AI gets better ` +
    `at it than I am <|°ᴗ°|> \n\n`,
  TITLE_STYLE,
  GREETING_STYLE,
  BODY_STYLE,
);

export {};
