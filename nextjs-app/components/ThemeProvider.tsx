'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { initSmoothScroll } from '@/lib/smoothScrollPolyfill'

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize smooth scroll polyfill
    initSmoothScroll()
  }, [])

  return <>{children}</>
}
