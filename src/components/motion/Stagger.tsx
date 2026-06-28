import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay: number) => ({
    opacity: 1,
    transition: { staggerChildren: staggerDelay, delayChildren: 0 },
  }),
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

interface StaggerProps {
  children: React.ReactNode
  stagger?: number
  className?: string
  once?: boolean
  margin?: string
  as?: React.ElementType
}

/**
 * Wraps children in a staggered reveal. Each child must use `staggerItemVariants`
 * (or any Variants with `hidden` / `visible` keys) to participate in the stagger.
 *
 * If children don't have motion variants, wrap each in <StaggerItem />.
 */
export function Stagger({
  children,
  stagger = 0.09,
  className,
  once = true,
  margin = '-80px',
  as: Tag = 'div',
}: StaggerProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function StaggerItem({ children, className, as: Tag = 'div' }: StaggerItemProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div
  return (
    <MotionTag variants={staggerItemVariants} className={cn(className)}>
      {children}
    </MotionTag>
  )
}
