import { useRef, useEffect } from 'react'

interface FadingVideoProps {
  src: string
  className?: string
  style?: React.CSSProperties
}

export default function FadingVideo({ src, className = '', style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeOutStarted = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let fadeInRaf: number
    let fadeOutRaf: number

    const fadeIn = () => {
      cancelAnimationFrame(fadeOutRaf)
      fadeOutStarted.current = false
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / 500, 1)
        video.style.opacity = String(p)
        if (p < 1) fadeInRaf = requestAnimationFrame(tick)
      }
      fadeInRaf = requestAnimationFrame(tick)
    }

    const fadeOut = (onDone?: () => void) => {
      cancelAnimationFrame(fadeInRaf)
      const start = performance.now()
      const startOpacity = parseFloat(video.style.opacity || '1')
      const tick = (now: number) => {
        const p = Math.min((now - start) / 550, 1)
        video.style.opacity = String(startOpacity * (1 - p))
        if (p < 1) {
          fadeOutRaf = requestAnimationFrame(tick)
        } else {
          onDone?.()
        }
      }
      fadeOutRaf = requestAnimationFrame(tick)
    }

    const onLoadedData = () => {
      video.style.opacity = '0'
      fadeIn()
    }

    const onTimeUpdate = () => {
      if (!video.duration) return
      const remaining = video.duration - video.currentTime
      if (remaining <= 0.55 && !fadeOutStarted.current) {
        fadeOutStarted.current = true
        fadeOut()
      }
    }

    const onEnded = () => {
      video.currentTime = 0
      video.play().catch(() => {})
      fadeIn()
    }

    video.style.opacity = '0'
    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)

    return () => {
      cancelAnimationFrame(fadeInRaf)
      cancelAnimationFrame(fadeOutRaf)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ opacity: 0, ...style }}
      aria-hidden="true"
    />
  )
}
