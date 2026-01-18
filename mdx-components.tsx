import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { Slash } from "@/components/slash/slash";

/**
 * Wrapper components for job header styling in MDX.
 */
function JobTitle({ children }: { children: ReactNode }) {
    return <span className="job-title">{children}</span>;
}

function Company({ children }: { children: ReactNode }) {
    return (
        <span className="company">
            <Slash />
            {children}
        </span>
    );
}

function Interval({ children }: { children: ReactNode }) {
    return (
        <span className="interval">
            <Slash />
            {children}
        </span>
    );
}

/**
 * MDX component overrides and custom components available in all MDX files.
 * Required by @next/mdx for App Router integration.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        Slash,
        JobTitle,
        Company,
        Interval,
    };
}
