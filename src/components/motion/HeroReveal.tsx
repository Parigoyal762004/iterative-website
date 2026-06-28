import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

interface HeroRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

/**
 * Wraps content in overflow-hidden so text slides up from below the clip edge.
 * Use for hero headlines and subheads that should feel like they're rising in.
 */
export function HeroReveal({
  children,
  delay = 0,
  duration = 0.75,
  className,
}: HeroRevealProps) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{ y: '105%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * Container that staggers multiple HeroReveal children.
 * Each direct child gets a staggered delay.
 */
interface HeroRevealGroupProps {
  children: React.ReactNode
  stagger?: number
  initialDelay?: number
  className?: string
}

export function HeroRevealGroup({
  children,
  stagger = 0.12,
  initialDelay = 0.1,
  className,
}: HeroRevealGroupProps) {
  return (
    <div className={cn(className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <HeroReveal key={i} delay={initialDelay + i * stagger}>
              {child}
            </HeroReveal>
          ))
        : <HeroReveal delay={initialDelay}>{children}</HeroReveal>}
    </div>
  )
}
