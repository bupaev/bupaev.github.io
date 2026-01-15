"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./cv-vertical-menu.module.scss";

type MenuItem = {
  title: string;
  id: string;
  icon: string;
};

const menuItems: MenuItem[] = [
  { title: "Hello!", id: "hero-area", icon: "head-with-glasses.svg" },
  { title: "Overview", id: "synopsis", icon: "venn-diagram.svg" },
  { title: "Skills", id: "skills", icon: "pen-and-wrench.svg" },
  { title: "Experience", id: "experience", icon: "mountain-with-flag.svg" },
  { title: "Education", id: "education", icon: "academic-cap.svg" },
];

export function CvVerticalMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuItemHeight, setMenuItemHeight] = useState(0);
  const [contentSectionsHeightArray, setContentSectionsHeightArray] = useState<
    number[]
  >([]);
  const [contentSectionsOffsetArray, setContentSectionsOffsetArray] = useState<
    number[]
  >([]);
  const [scaleCoefficients, setScaleCoefficients] = useState<number[]>([]);
  const [markerOffset, setMarkerOffset] = useState(0);
  const [markerHeight, setMarkerHeight] = useState(0);

  const getSectionsProp = useCallback(
    (propName: "clientHeight" | "offsetTop"): number[] => {
      const sectionsHTMLCollection =
        document.getElementsByClassName("anchor-for-navigation");
      return [...sectionsHTMLCollection].map(
        (section) => (section as HTMLElement)[propName]
      );
    },
    []
  );

  /**
   * Menu items have equal heights but content sections have different heights.
   * We have to map content sections offsets to menu items offsets
   * to mark the current visible page area correctly
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

    // when user reaches end of the page make visible area marker equals size of menu item
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

  useEffect(() => {
    const initMenu = () => {
      if (!menuRef.current) return;

      const firstItem = menuRef.current.querySelector(`.${styles.item}`);
      if (!firstItem) return;

      const itemHeight = (firstItem as HTMLElement).clientHeight;
      setMenuItemHeight(itemHeight);

      const heights = getSectionsProp("clientHeight");
      const offsets = getSectionsProp("offsetTop");

      setContentSectionsHeightArray(heights);
      setContentSectionsOffsetArray(offsets);

      // menu pixel per content pixel
      const coeffs = heights.map((sectionHeight) => {
        return itemHeight / sectionHeight;
      });
      setScaleCoefficients(coeffs);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initMenu, 100);

    return () => clearTimeout(timer);
  }, [getSectionsProp]);

  useEffect(() => {
    setAreaMarkerPosition();
    window.addEventListener("scroll", setAreaMarkerPosition);
    window.addEventListener("resize", setAreaMarkerPosition);

    return () => {
      window.removeEventListener("scroll", setAreaMarkerPosition);
      window.removeEventListener("resize", setAreaMarkerPosition);
    };
  }, [setAreaMarkerPosition]);

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
    <nav className={styles.verticalMenu}>
      <div
        className={styles.visibleAreaMarker}
        style={{
          transform: `translateY(${markerOffset}px)`,
          height: `${markerHeight}px`,
        }}
      />
      <div ref={menuRef}>
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={styles.item}
            onClick={() => onMenuItemClick(index)}
          >
            <span className={styles.itemIcon}>
              <Image
                src={`/icons/vertical-menu/${item.icon}`}
                alt={item.title}
                width={32}
                height={32}
                draggable={false}
              />
            </span>
            <span className={styles.itemText}>{item.title}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
