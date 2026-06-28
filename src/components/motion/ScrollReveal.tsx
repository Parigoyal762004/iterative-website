import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: Direction
  className?: string
  margin?: string
  once?: boolean
  as?: React.ElementType
}

function getInitial(dir: Direction) {
  return {
    opacity: 0,
    y: dir === 'up' ? 32 : dir === 'down' ? -32 : 0,
    x: dir === 'left' ? 32 : dir === 'right' ? -32 : 0,
  }
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.65,
  direction = 'up',
  className,
  margin = '-80px',
  once = true,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      initial={getInitial(direction)}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, ease: EASE, delay }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}
