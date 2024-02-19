'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { MoonStar } from 'lucide-react'
import { Sun } from 'lucide-react'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [_, startTransition] = React.useTransition()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        startTransition(() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        })
      }}
    >
      {!theme ? null : theme === 'light' ? (
        // <IconMoon className="transition-all" />
        <MoonStar />
      ) : (
        // <IconSun className="transition-all" />
        <Sun />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}