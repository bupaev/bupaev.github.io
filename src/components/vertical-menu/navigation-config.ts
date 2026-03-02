/**
 * Navigation configuration for the vertical menu.
 * Centralized menu items and constants for the CV page navigation.
 */

import academicCap from "./icons/academic-cap.svg";
import headWithGlasses from "./icons/head-with-glasses.svg";
import mountainWithFlag from "./icons/mountain-with-flag.svg";
import penAndWrench from "./icons/pen-and-wrench.svg";
import fitCheck from "./icons/fit-check.svg";
import vennDiagram from "./icons/venn-diagram.svg";

export type MenuItem = {
    title: string;
    id: string;
    icon: string;
};

/**
 * Menu items configuration for the vertical navigation.
 * Each item corresponds to a section on the CV page.
 */
export const MENU_ITEMS: MenuItem[] = [
    { title: "Salute", id: "hero-area", icon: headWithGlasses.src },
    { title: "My Core", id: "overview", icon: vennDiagram.src },
    { title: "Skills", id: "skills", icon: penAndWrench.src },
    { title: "Experience", id: "experience", icon: mountainWithFlag.src },
    { title: "Fit Check", id: "fit-check", icon: fitCheck.src },
    { title: "Education", id: "education", icon: academicCap.src },
];

