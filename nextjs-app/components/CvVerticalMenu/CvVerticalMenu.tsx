'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import styles from './CvVerticalMenu.module.scss'

interface MenuItem {
  title: string
  id: string
  icon: string
}

const menuItems: MenuItem[] = [
  { title: 'Hello!', id: 'hero-area', icon: '/icons/cv-menu/head-with-glasses.svg' },
  { title: 'Overview', id: 'synopsis', icon: '/icons/cv-menu/venn-diagram.svg' },
  { title: 'Skills', id: 'skills', icon: '/icons/cv-menu/pen-and-wrench.svg' },
  { title: 'Experience', id: 'experience', icon: '/icons/cv-menu/mountain-with-flag.svg' },
  { title: 'Education', id: 'education', icon: '/icons/cv-menu/academic-cap.svg' }
]

export default function CvVerticalMenu({ style }: { style?: CSSProperties }) {
  const [markerOffset, setMarkerOffset] = useState(0)
  const [markerHeight, setMarkerHeight] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuItemHeight = useRef(0)
  const contentSectionsHeightArray = useRef<number[]>([])
  const contentSectionsOffsetArray = useRef<number[]>([])
  const scaleCoefficients = useRef<number[]>([])

  const getSectionsProp = (propName: 'clientHeight' | 'offsetTop'): number[] => {
    const sectionsHTMLCollection = document.getElementsByClassName('anchor-for-navigation')
    return Array.from(sectionsHTMLCollection).map(section => (section as HTMLElement)[propName])
  }

  const getRescaledOffset = (windowScroll: number): number => {
    const sectionIndex = contentSectionsOffsetArray.current.findIndex(offset => windowScroll < offset)
    const selectedMenuItem = sectionIndex === -1
      ? contentSectionsOffsetArray.current.length
      : Math.max(sectionIndex - 1, 0)

    return selectedMenuItem * menuItemHeight.current +
      (windowScroll - contentSectionsOffsetArray.current[selectedMenuItem]) * scaleCoefficients.current[selectedMenuItem]
  }

  const setAreaMarkerPosition = () => {
    const windowTopScrollY = window.scrollY
    const windowBottomScrollY = windowTopScrollY + window.innerHeight

    setMarkerOffset(getRescaledOffset(windowTopScrollY))

    // when user reaches end of the page make visible area marker equals size of menu item for better look
    if (windowBottomScrollY >= document.body.clientHeight) {
      setMarkerHeight(menuItemHeight.current)
      return
    }

    setMarkerHeight(getRescaledOffset(windowBottomScrollY) - getRescaledOffset(windowTopScrollY))
  }

  useEffect(() => {
    if (!menuRef.current) {
      return
    }

    const menuItems = menuRef.current.getElementsByClassName('item')
    if (menuItems.length > 0) {
      menuItemHeight.current = (menuItems[0] as HTMLElement).clientHeight
    }

    contentSectionsHeightArray.current = getSectionsProp('clientHeight')
    contentSectionsOffsetArray.current = getSectionsProp('offsetTop')

    // menu pixel per content pixel
    scaleCoefficients.current = contentSectionsHeightArray.current.map(sectionsHeight =>
      menuItemHeight.current / sectionsHeight
    )

    setAreaMarkerPosition()

    window.addEventListener('scroll', setAreaMarkerPosition)
    window.addEventListener('resize', setAreaMarkerPosition)

    return () => {
      window.removeEventListener('scroll', setAreaMarkerPosition)
      window.removeEventListener('resize', setAreaMarkerPosition)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onMenuItemClick = (targetIndex: number) => {
    window.scrollTo({
      top: contentSectionsOffsetArray.current[targetIndex],
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <nav className={styles['vertical-menu']} style={style}>
      <div
        className={styles['visible-area-marker']}
        style={{
          transform: `translateY(${markerOffset}px)`,
          height: `${markerHeight}px`
        }}
      />
      <div ref={menuRef}>
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.item} item`}
            onClick={() => onMenuItemClick(index)}
          >
            <span className={styles['item-icon']}>
              <Image src={item.icon} alt={item.title} width={40} height={40} draggable={false} />
            </span>
            <span className={styles['item-text']}>
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </nav>
  )
}
