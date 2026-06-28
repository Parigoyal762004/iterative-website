import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

interface MaskRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: 'left' | 'right' | 'top' | 'bottom'
}

function getClipPath(dir: MaskRevealProps['direction']) {
  switch (dir) {
    case 'right':  return { hidden: 'inset(0 0 0 100%)', visible: 'inset(0 0 0 0%)' }
    case 'top':    return { hidden: 'inset(100% 0 0 0)',  visible: 'inset(0% 0 0 0)'  }
    case 'bottom': return { hidden: 'inset(0 0 100% 0)',  visible: 'inset(0 0 0% 0)'  }
    default:       return { hidden: 'inset(0 100% 0 0)',  visible: 'inset(0 0% 0 0)'  }
  }
}

export function MaskReveal({
  children,
  delay = 0,
  duration = 0.75,
  className,
  direction = 'left',
}: MaskRevealProps) {
  const clip = getClipPath(direction)

  return (
    <motion.div
      initial={{ clipPath: clip.hidden, opacity: 0 }}
      whileInView={{ clipPath: clip.visible, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, ease: EASE, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
