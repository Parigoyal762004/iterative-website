import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: Direction
  className?: string
  as?: React.ElementType
}

function getInitial(dir: Direction) {
  return {
    opacity: 0,
    y: dir === 'up' ? 28 : dir === 'down' ? -28 : 0,
    x: dir === 'left' ? 28 : dir === 'right' ? -28 : 0,
  }
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.65,
  direction = 'up',
  className,
  as: Tag = 'div',
}: FadeInProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      initial={getInitial(direction)}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration, ease: EASE, delay }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}

// Variant-based version for use inside Stagger
export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}
