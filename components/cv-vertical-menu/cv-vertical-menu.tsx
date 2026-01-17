"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { MENU_ITEMS, ICON_BASE_PATH } from "@/config/navigation-config";
import styles from "./cv-vertical-menu.module.scss";

/**
 * Mobile breakpoint for vertical menu positioning behavior.
 * Menu appears below hero and becomes sticky on scroll for viewports <= this width.
 */
const TOUCH_SCREEN_BREAKPOINT = 960;

type CvVerticalMenuProps = {
  /**
   * Height of the hero area in pixels.
   * Used for mobile sticky positioning - menu starts below hero area.
   * When undefined, mobile sticky behavior is disabled.
   */
  heroHeight?: number;
};

export function CvVerticalMenu({ heroHeight }: CvVerticalMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [menuItemHeight, setMenuItemHeight] = useState(0);
  const [contentSectionsOffsetArray, setContentSectionsOffsetArray] = useState<
    number[]
  >([]);
  const [scaleCoefficients, setScaleCoefficients] = useState<number[]>([]);
  const [markerOffset, setMarkerOffset] = useState(0);
  const [markerHeight, setMarkerHeight] = useState(0);

  /**
   * Retrieves a property value from all navigation anchor sections.
   * Uses section IDs from menu config instead of class name queries.
   */
  const getSectionsProp = useCallback(
    (propName: "clientHeight" | "offsetTop"): number[] => {
      return MENU_ITEMS.map((item) => {
        const section = document.getElementById(item.id);
        return section ? section[propName] : 0;
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
        sectionIndex === -1 ? offsets.length : Math.max(sectionIndex - 1, 0);

      return (
        selectedMenuItem * itemHeight +
        (windowScroll - offsets[selectedMenuItem]) *
        coefficients[selectedMenuItem]
      );
    },
    []
  );

  const setAreaMarkerPosition = useCallback(() => {
    if (
      contentSectionsOffsetArray.length === 0 ||
      scaleCoefficients.length === 0 ||
      menuItemHeight === 0
    ) {
      return;
    }

    const windowTopScrollY = window.scrollY;
    const windowBottomScrollY = windowTopScrollY + window.innerHeight;

    const newMarkerOffset = getRescaledOffset(
      windowTopScrollY,
      contentSectionsOffsetArray,
      scaleCoefficients,
      menuItemHeight
    );
    setMarkerOffset(newMarkerOffset);

    // When user reaches end of the page, make visible area marker equal to menu item size
    if (windowBottomScrollY >= document.body.clientHeight) {
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
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initMenu, 100);

    return () => clearTimeout(timer);
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
    if (!wrapperRef.current || heroHeight === undefined) return;

    const isScrolledPastHero = window.scrollY >= heroHeight;
    wrapperRef.current.dataset.sticky = isScrolledPastHero ? "true" : "false";
  }, [heroHeight]);

  // Handle mobile sticky positioning
  useEffect(() => {
    if (heroHeight === undefined) return;

    // Update CSS custom property for hero height
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty("--hero-height", `${heroHeight}px`);
    }

    const onResize = () => {
      if (window.innerWidth <= TOUCH_SCREEN_BREAKPOINT) {
        updateStickyState();
        window.addEventListener("scroll", updateStickyState, { passive: true });
      } else {
        window.removeEventListener("scroll", updateStickyState);
        if (wrapperRef.current) {
          wrapperRef.current.dataset.sticky = "";
        }
      }
    };

    // Initial setup
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", updateStickyState);
      window.removeEventListener("resize", onResize);
    };
  }, [heroHeight, updateStickyState]);

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
    <div
      ref={wrapperRef}
      className={styles.menuWrapper}
      style={{ opacity: heroHeight !== undefined ? 1 : undefined }}
    >
      <nav className={styles.verticalMenu} aria-label="Page navigation">
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
                <Image
                  src={`${ICON_BASE_PATH}${item.icon}`}
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
      </nav>
    </div>
  );
}
