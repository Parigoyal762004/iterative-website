import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface BlurTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function BlurText({ text, className = '', style }: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduced = useReducedMotion()
  const words = text.split(' ')

  return (
    <div
      ref={ref}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em', ...style }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={reduced ? {} : { filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={inView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
          className={className}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
