/**
 * Navigation configuration for the vertical menu.
 * Centralized menu items and constants for the CV page navigation.
 */

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
    { title: "Hello!", id: "hero-area", icon: "head-with-glasses.svg" },
    { title: "Overview", id: "synopsis", icon: "venn-diagram.svg" },
    { title: "Skills", id: "skills", icon: "pen-and-wrench.svg" },
    { title: "Experience", id: "experience", icon: "mountain-with-flag.svg" },
    { title: "Education", id: "education", icon: "academic-cap.svg" },
];

/** Base path for vertical menu icons */
export const ICON_BASE_PATH = "/icons/vertical-menu/";
