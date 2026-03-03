import type { ReactNode } from "react";

export type AreaId = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export type TopicInfo = {
    name: string;
    description: string;
};

export type AreaData = {
    id: AreaId;
    points: string;
    scaleX: number;
    scaleY: number;
    cx: number;
    cy: number;
    heading: ReactNode;
    headingText: string;
    topics: TopicInfo[];
    hitPoints?: string;
};

/** Area data for the four skill areas */
export const AREAS: AreaData[] = [
    {
        id: "topLeft",
        points: "80,0 535,0 463,288 8,288",
        hitPoints: "250,50 535,0 463,288 90,288 70,180",
        scaleX: 1.4,
        scaleY: 1.5,
        cx: 310,
        cy: 170,
        heading: (
            <>
                Software
                <br />
                engineering
            </>
        ),
        headingText: "Software Engineering",
        topics: [
            {
                name: "Prioritizing Web Fundamentals",
                description: "Over my career, I've watched frameworks come and go. Starting with Backbone and AngularJS and eventually moving to React and Vue taught me an important lesson: syntax is transient, but fundamentals—HTML, CSS, and JS—are forever.",
            },
            {
                name: "Applying Objective Engineering",
                description: "I've seen how cognitive biases ruin businesses. To me, engineering means making data-driven, objective decisions. We all make mistakes, including me, so I'm always ready to pivot when the data proves me wrong.",
            },
            {
                name: "Enforcing Quality Standards",
                description: "I've spent enough time in legacy minefields to know how quickly projects rot without discipline. I prioritize long-term health through strict standards and security, preventing the slow decay that often accelerates when AI enters the mix.",
            },
            {
                name: "Cultivating Excellent DX",
                description: "Code is still not just for LLM; it's for the humans who maintain it. Readable code and clear docs accelerate delivery today, and the next developer doesn't have to hate you six months later.",
            },
            {
                name: "Owning the Full Lifecycle",
                description: "I don't just “close tickets”. I can and actually prefer to own the whole loop—from the first architectural brainstorm and vision design to testing and the final production launch. Seeing the big picture is how you build products.",
            },
        ],
    },
    {
        id: "topRight",
        points: "526,35 800,35 737,288 464,288",
        hitPoints: "526,35 680,60 740,150 737,288 464,288",
        scaleX: 2.2,
        scaleY: 1.6,
        cx: 610,
        cy: 170,
        heading: <>Leadership</>,
        headingText: "Leadership",
        topics: [
            {
                name: "Fostering Horizontal Culture",
                description: "I'm not a big fan of strict hierarchies. In my experience, teams do their work best in a flat culture where developers, designers, and stakeholders talk directly. The best ideas must win on merit, regardless of titles.",
            },
            {
                name: "Building Frictionless Workflows",
                description: "Chaos doesn’t scale. I build automated, documented workflows to remove friction and spread knowledge. This solves the 'bus factor' — no single person becomes a bottleneck, and new hires can onboard without losing a week.",
            },
            {
                name: "Applying Behavioral Psychology",
                description: "Leadership is fundamentally about people. I apply my knowledge of behavioral psychology to better understand team dynamics, build genuine empathy, and resolve conflicts before they turn into technical debt.",
            },
            {
                name: "Leading with Constructive Honesty",
                description: "Trust and transparency build the best professional relationships. I’m straightforward about technical debt and risks, ensuring everyone has the full picture to make informed calls. Honesty saves time and money.",
            },
        ],
    },
    {
        id: "bottomLeft",
        points: "52,288 463,288 411,500 0,500",
        hitPoints: "85,288 463,288 411,500 240,490 85,380",
        scaleX: 1.3,
        scaleY: 1.9,
        cx: 290,
        cy: 370,
        heading: <>UI/UX <br/> Design</>,
        headingText: "UI/UX Design",
        topics: [
            {
                name: "Practicing Pragmatic Perfectionism",
                description: "I call myself a \"reasonable perfectionist\" — and that tension is real. I care deeply about polish, but I've shipped enough products to know when chasing perfect becomes the enemy of good. The triage is the actual skill.",
            },
            {
                name: "Crafting Visual Aesthetics",
                description: "My eye for detail is forged by a passion for photography, years of collaborating with talented designers, and deconstructing hundreds of designs. This mix of visual literacy and technical grit helps me to create clean and attractive UI.",
            },
            {
                name: "Designing Human-Centric Spaces",
                description: "Whether it's a user navigating a complex interface, a junior developer reading my code, or a manager reviewing my documentation, my goal is always to create a space that feels intuitive, comfortable, and human-centric.",
            },
            {
                name: "Bridging Design and Engineering",
                description: "I speak both languages. I help designers build design systems that hold together technically, not just visually, avoiding the handoff failure where beautiful Figma mockups become janky implementations.",
            },
            {
                name: "Balancing Accessibility",
                description: "I view accessibility as a mark of a professional product. I advocate for inclusive design based on context, meeting the standards that actually matter for the users. Professionalism is about balance.",
            },
        ],
    },
    {
        id: "bottomRight",
        points: "459,288 725,288 676,481 411,481",
        hitPoints: "459,288 725,288 676,430 600,480 411,481",
        scaleX: 2.4,
        scaleY: 2.1,
        cx: 565,
        cy: 365,
        heading: <>AI <br/> expertize</>,
        headingText: "AI Expertise",
        topics: [
            {
                name: "Embracing the AI Revolution",
                description: "AI is a seismic shift that is fundamentally reshaping our industry. While I remain a pragmatic enthusiast rather than a blind fanatic, I understand that being AI-fluent is now critical for both business and personal success.",
            },
            {
                name: "Validating AI Outputs",
                description: "I don’t blindly trust model outputs. I do my best to review AI-generated code to ensure it is secure, maintainable, and fits our specific architecture and logical patterns. The human eye is the final safety layer.",
            },
            {
                name: "Amplifying Engineering Impact",
                description: "The real win isn't that AI writes code faster. It's that offloading routine execution frees up mental bandwidth for the work that actually matters — system design, product strategy, the decisions LLMs genuinely can't make.",
            },
            {
                name: "Filtering the Hype",
                description: "Because the tech landscape is moving so fast, continuous learning is non-negotiable. I actively sift through the daily noise to separate genuine breakthroughs from fleeting trends, ensuring I only adopt tools that deliver real, practical value.",
            },
        ],
    },
];
