

import { useState, useEffect, useRef, useCallback } from "react";

import { MENU_ITEMS } from "./navigation-config";
import styles from "./vertical-menu.module.scss";

/**
 * Mobile breakpoint for vertical menu positioning behavior.
 * Menu appears below hero and becomes sticky on scroll for viewports <= this width.
 */
const TOUCH_SCREEN_BREAKPOINT = 768;

/**
 * Dimensions for mobile circular menu tick marks
 */
const TICK_MARK_LENGTH = 6;
const TICK_MARK_WIDTH = 1;
const TICK_MARK_OUTER_RADIUS = 32;
const TICK_MARK_INNER_RADIUS = TICK_MARK_OUTER_RADIUS - TICK_MARK_LENGTH;

export function VerticalMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [menuItemHeight, setMenuItemHeight] = useState(0);
  const [contentSectionsOffsetArray, setContentSectionsOffsetArray] = useState<
    number[]
  >([]);
  const [scaleCoefficients, setScaleCoefficients] = useState<number[]>([]);
  const [markerOffset, setMarkerOffset] = useState(0);
  const [markerHeight, setMarkerHeight] = useState(0);
  
  // Mobile circular menu state
  const [activeIndex, setActiveIndex] = useState(0);
  const [docScrollHeight, setDocScrollHeight] = useState(1);
  const progressCircleRef = useRef<SVGCircleElement>(null);

  // Use ref for hero height to avoid re-renders during scroll/resize measurements
  const heroHeightRef = useRef<number | undefined>(undefined);

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Retrieves a property value from all navigation anchor sections.
   * Uses section IDs from menu config instead of class name queries.
   */
  const getSectionsProp = useCallback(
    (prop: "clientHeight" | "offsetTop") => {
      return MENU_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return 0;
        
        if (prop === "offsetTop") {
          return Math.max(el.getBoundingClientRect().top + window.scrollY, 0);
        }

        let val = el[prop] as number;
        // Fallback for empty anchor divs (like the decoupled hero-area) to get the actual section height
        if (prop === "clientHeight" && val === 0 && el.nextElementSibling) {
          val = el.nextElementSibling.clientHeight;
        }
        return val;
      });
    },
    []
  );

  /**
   * Calculates the rescaled offset for the visible area marker.
   * Maps content section positions to corresponding menu item positions.
   *
   * Menu items have equal heights but content sections have different heights.
   * This function converts scroll position in the page to corresponding
   * position within the menu to correctly mark the visible area.
   *
   * @param windowScroll - Current window scroll position (scrollY)
   * @param offsets - Array of section offsetTop positions
   * @param coefficients - Scaling coefficients (menuItemHeight / sectionHeight)
   * @param itemHeight - Height of individual menu items
   * @returns Calculated offset for the marker position in pixels
   */
  const getRescaledOffset = useCallback(
    (
      windowScroll: number,
      offsets: number[],
      coefficients: number[],
      itemHeight: number
    ): number => {
      const sectionIndex = offsets.findIndex((offset) => {
        return windowScroll < offset;
      });

      const selectedMenuItem =
        sectionIndex === -1 ? Math.max(offsets.length - 1, 0) : Math.max(sectionIndex - 1, 0);

      const sectionOffset = offsets[selectedMenuItem] || 0;
      const coeff = coefficients[selectedMenuItem] || 0;

      return (
        selectedMenuItem * itemHeight +
        (windowScroll - sectionOffset) * coeff
      );
    },
    []
  );

  const setAreaMarkerPosition = useCallback(() => {
    if (contentSectionsOffsetArray.length === 0) return;

    const windowTopScrollY = window.scrollY;
    const windowBottomScrollY = windowTopScrollY + window.innerHeight;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

    // Update state for mobile progress circle ALWAYS (decoupled from desktop layout)
    const idx = contentSectionsOffsetArray.findIndex(
      (offset) => windowTopScrollY + window.innerHeight / 2 < offset
    );
    setActiveIndex(
      idx === -1 ? contentSectionsOffsetArray.length - 1 : Math.max(idx - 1, 0)
    );
    
    // Direct DOM manipulation guarantees 60fps fluid stroke updates without triggering React layout loops
    const progress = Math.min(Math.max(windowTopScrollY / maxScroll, 0), 1);
    if (progressCircleRef.current) {
      progressCircleRef.current.style.strokeDashoffset = `${194.78 - progress * 194.78}`;
    }

    // Desktop marker operations (Requires desktop to be visible)
    if (scaleCoefficients.length === 0 || menuItemHeight === 0) {
      return;  
    }

    const newMarkerOffset = getRescaledOffset(
      windowTopScrollY,
      contentSectionsOffsetArray,
      scaleCoefficients,
      menuItemHeight
    );
    setMarkerOffset(newMarkerOffset);

    // When user reaches end of the page, make visible area marker equal to menu item size
    if (windowBottomScrollY >= document.documentElement.scrollHeight) {
      setMarkerHeight(menuItemHeight);
      return;
    }

    setMarkerHeight(
      getRescaledOffset(
        windowBottomScrollY,
        contentSectionsOffsetArray,
        scaleCoefficients,
        menuItemHeight
      ) - newMarkerOffset
    );
  }, [
    contentSectionsOffsetArray,
    scaleCoefficients,
    menuItemHeight,
    getRescaledOffset,
  ]);

  // Initialize menu item heights and section offsets
  useEffect(() => {
    const initMenu = () => {
      if (!menuRef.current) return;

      const firstItem = menuRef.current.querySelector(`.${styles.item}`);
      if (!firstItem) return;

      const itemHeight = (firstItem as HTMLElement).clientHeight;
      setMenuItemHeight(itemHeight);

      const heights = getSectionsProp("clientHeight");
      const offsets = getSectionsProp("offsetTop");

      setContentSectionsOffsetArray(offsets);

      // Calculate scaling coefficients: menu pixels per content pixel
      const coeffs = heights.map((sectionHeight) => {
        return itemHeight / sectionHeight;
      });
      setScaleCoefficients(coeffs);

      // Initialize max scroll height to un-clamp ticks early
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setDocScrollHeight(maxScroll);

      // Set initial active activeIndex 
      const windowTopScrollY = window.scrollY;
      const idx = offsets.findIndex(
        (offset) => windowTopScrollY + window.innerHeight / 2 < offset
      );
      setActiveIndex(idx === -1 ? offsets.length - 1 : Math.max(idx - 1, 0));
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initMenu, 100);

    // Watch for actual physical height expansions (e.g. lazy-loaded content, toggled elements)
    const resizeObserver = new ResizeObserver(() => {
      initMenu();
    });
    resizeObserver.observe(document.body);

    // Watch for orientation width changes (ignoring mobile address bar height collapse)
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        initMenu();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [getSectionsProp]);

  // Handle scroll for marker position updates
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setAreaMarkerPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Trigger initial position calculation via scroll handler
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [setAreaMarkerPosition]);

  /**
   * Updates the sticky state based on scroll position.
   * On mobile: menu sticks to top after scrolling past hero area.
   */
  const updateStickyState = useCallback(() => {
    if (!navRef.current || heroHeightRef.current === undefined) return;

    const isScrolledPastHero = window.scrollY >= heroHeightRef.current;
    navRef.current.dataset.sticky = isScrolledPastHero ? "true" : "false";
  }, []);

  // Handle mobile sticky positioning and hero height measurement
  useEffect(() => {
    const updateHeroHeight = () => {
      // Measure the DOM element to determine hero height
      const heroSection = document.getElementById("hero-area");
      if (heroSection) {
        const height = heroSection.clientHeight;
        heroHeightRef.current = height;
        if (navRef.current) {
          navRef.current.style.setProperty("--hero-height", `${height}px`);
        }
      }
    };

    const onResize = () => {
      updateHeroHeight();

      if (window.innerWidth <= TOUCH_SCREEN_BREAKPOINT) {
        updateStickyState();
        window.addEventListener("scroll", updateStickyState, { passive: true });
      } else {
        window.removeEventListener("scroll", updateStickyState);
        if (navRef.current) {
          navRef.current.dataset.sticky = "";
        }
      }
    };

    // Initial setup
    updateHeroHeight(); // Measure immediately
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", updateStickyState);
      window.removeEventListener("resize", onResize);
    };
  }, [updateStickyState]);

  const onMenuItemClick = (targetIndex: number) => {
    if (contentSectionsOffsetArray[targetIndex] !== undefined) {
      window.scrollTo({
        top: contentSectionsOffsetArray[targetIndex],
        left: 0,
        behavior: "smooth",
      });
    }
  };


  return (
    <nav
      ref={navRef}
      className={styles.verticalMenu}
      aria-label="Page navigation"
      style={{ opacity: mounted ? 1 : undefined }}
    >
      {/* Desktop Menu Wrapper */}
      <div className={styles.desktopMenuWrapper}>
        <div
          className={styles.visibleAreaMarker}
          style={{
            transform: `translateY(${markerOffset}px)`,
            height: `${markerHeight}px`,
          }}
          aria-hidden="true"
        />
        <div ref={menuRef}>
          {MENU_ITEMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={styles.item}
              onClick={() => onMenuItemClick(index)}
              aria-label={`Navigate to ${item.title} section`}
            >
              <span className={styles.itemIcon}>
                <img
                  src={item.icon}
                  alt=""
                  width={32}
                  height={32}
                  draggable={false}
                  aria-hidden="true"
                />
              </span>
              <span className={styles.itemText}>{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Circular Menu */}
      <div className={styles.mobileMenu} aria-hidden="true">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          className={styles.mobileMenuProgress}
        >
          {/* Foreground progress circle */}
          <circle
            cx="32"
            cy="32"
            r="31"
            className={styles.progressCircle}
            ref={progressCircleRef}
            style={{
              strokeDasharray: 194.78,
              strokeDashoffset: 194.78, // Default zero-progress
            }}
          />

          {/* Tick marks for sections */}
          {contentSectionsOffsetArray.map((offset, i) => {
            const ratio = Math.min(offset / docScrollHeight, 1);
            const angle = ratio * 360; // 0deg corresponds to top because of CSS rotation
            const rad = (angle * Math.PI) / 180;
            const x1 = 32 + TICK_MARK_OUTER_RADIUS * Math.cos(rad);
            const y1 = 32 + TICK_MARK_OUTER_RADIUS * Math.sin(rad);
            const x2 = 32 + TICK_MARK_INNER_RADIUS * Math.cos(rad);
            const y2 = 32 + TICK_MARK_INNER_RADIUS * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={styles.tick}
                strokeWidth={TICK_MARK_WIDTH}
              />
            );
          })}
        </svg>
        
        {/* Active Icon in the center */}
        <div className={styles.mobileMenuIcon} aria-hidden="true">
          {MENU_ITEMS.map((item, index) => (
            <img
              key={item.id}
              src={item.icon}
              alt=""
              draggable={false}
              className={`${styles.iconImage} ${
                index === activeIndex ? styles.activeIcon : ""
              }`}
            />
          ))}
        </div>
      </div>
    </nav>

  );
}
