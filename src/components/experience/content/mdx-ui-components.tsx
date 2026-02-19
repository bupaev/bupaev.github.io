import type { ReactNode } from "react";
import { Slash } from "@/components/slash/slash";

export function JobTitle({ children }: { children: ReactNode }) {
    return <span className="job-title">{children}</span>;
}

export function Company({ children }: { children: ReactNode }) {
    return (
        <span className="company">
            <Slash />
            {children}
        </span>
    );
}

export function Interval({ children }: { children: ReactNode }) {
    return (
        <span className="interval">
            <Slash />
            {children}
        </span>
    );
}
