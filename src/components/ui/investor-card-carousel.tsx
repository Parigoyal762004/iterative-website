import { useEffect, useRef, useState } from 'react'
import { Users, Landmark, Building2, Banknote, Rocket, Briefcase, Building } from 'lucide-react'
import logoIconImg from '@/assets/logo-icon.png'

// Investor categories from Akro's actual network — same 3D carousel physics as
// the reference (volumetric depth, parallax tilt, smoothstep staircase), but
// reskinned with Akro's real content/palette instead of generic bank-card mockups.
const INVESTOR_CARDS = [
  { label: 'Angel Investors',       desc: 'Early conviction, fast decisions.',        Icon: Rocket,     accent: '#3F6F73' },
  { label: 'Family Offices',        desc: 'Patient capital, long horizons.',          Icon: Building2,  accent: '#F2B705' },
  { label: 'HNIs',                  desc: 'Direct access, no intermediaries.',        Icon: Users,      accent: '#3F6F73' },
  { label: 'NBFCs',                 desc: 'Structured credit at scale.',              Icon: Banknote,   accent: '#F2B705' },
  { label: 'Micro VCs',             desc: 'Sector-focused, high-conviction.',         Icon: Briefcase,  accent: '#3F6F73' },
  { label: 'Institutional Investors', desc: 'Governance-ready deal flow.',            Icon: Landmark,   accent: '#F2B705' },
  { label: 'Corporate Treasuries',  desc: 'Strategic capital deployment.',            Icon: Building,   accent: '#3F6F73' },
]

const CARD_COUNT = INVESTOR_CARDS.length

export function InvestorCardCarousel() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const frameId = useRef<number>(0)
  const progress = useRef<number>(0)
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const wrapRef = useRef<HTMLDivElement>(null)

  const [metrics, setMetrics] = useState({ cardW: 220, cardH: 300 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const rx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const ry = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      mouse.current.targetX = Math.max(-1, Math.min(1, rx))
      mouse.current.targetY = Math.max(-1, Math.min(1, ry))
    }
    const handleMouseLeave = () => {
      mouse.current.targetX = 0
      mouse.current.targetY = 0
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const w = wrapRef.current?.clientWidth ?? window.innerWidth
      const cardW = Math.min(240, Math.max(150, Math.round(w * 0.15 + 110)))
      const cardH = Math.round(cardW * 1.36)
      setMetrics({ cardW, cardH })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderLoop = () => {
    progress.current += 0.0016

    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08

    const cards = cardsRef.current
    const h = wrapRef.current?.clientHeight ?? 400
    const { cardH } = metrics

    const continuousProgress = progress.current
    const roundedIndex = Math.round(continuousProgress)
    const diffFromRound = continuousProgress - roundedIndex
    const easedDiff = Math.sign(diffFromRound) * Math.pow(Math.abs(diffFromRound) * 2, 4.2) / 2
    const virtualActiveIndex = roundedIndex + easedDiff

    for (let i = 0; i < CARD_COUNT; i++) {
      const card = cards[i]
      if (!card) continue

      let offset = i - virtualActiveIndex
      const halfCount = CARD_COUNT / 2
      while (offset > halfCount) offset -= CARD_COUNT
      while (offset < -halfCount) offset += CARD_COUNT

      const absOffset = Math.abs(offset)
      const sign = Math.sign(offset)

      if (absOffset > 3.0) {
        card.style.visibility = 'hidden'
        continue
      }
      card.style.visibility = 'visible'

      const gap = 28
      const peekAmount = -40
      const D = 1200

      let y = 0
      let z = 0
      let rot = 0

      if (absOffset <= 1) {
        const t = absOffset
        const easedT = t * t * (3 - 2 * t)
        const targetY = cardH + gap
        y = -sign * (easedT * targetY)
        z = 320 + easedT * (170 - 320)
        rot = easedT * 132
      } else if (absOffset <= 2) {
        const t = absOffset - 1
        const easedT = t * t * (3 - 2 * t)
        const yStart = cardH + gap
        const zStart = 170
        const rotStart = 132
        const zEnd = -50
        const rotEnd = 175
        const sEnd = D / (D - zEnd)
        const yEnd = (h / 2 - peekAmount) / sEnd - cardH / 2
        y = -sign * (yStart + easedT * (yEnd - yStart))
        z = zStart + easedT * (zEnd - zStart)
        rot = rotStart + easedT * (rotEnd - rotStart)
      } else {
        const t = Math.min(absOffset - 2, 1)
        const easedT = t * t * (3 - 2 * t)
        const zStart = -50
        const rotStart = 175
        const zEnd3 = -220
        const rotEnd3 = 195
        const sEnd2 = D / (D - zStart)
        const yEnd2 = (h / 2 - peekAmount) / sEnd2 - cardH / 2
        const sEnd3 = D / (D - zEnd3)
        const yEnd3 = (h / 2 + 80) / sEnd3 + cardH / 2
        y = -sign * (yEnd2 + easedT * (yEnd3 - yEnd2))
        z = zStart + easedT * (zEnd3 - zStart)
        rot = rotStart + easedT * (rotEnd3 - rotStart)
      }

      const localCardRotation = -sign * rot
      const centerFactor = Math.max(0, 1 - absOffset)
      const maxTiltY = 12
      const maxTiltX = 9
      const activeTiltX = -mouse.current.y * maxTiltX * centerFactor
      const activeTiltY = mouse.current.x * maxTiltY * centerFactor
      const totalRotX = localCardRotation + activeTiltX
      const totalRotY = activeTiltY

      card.style.zIndex = Math.round(z).toString()
      card.style.opacity = '1'
      card.style.transform = `translateY(${y.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg)`
    }
  }

  useEffect(() => {
    const tick = () => {
      renderLoop()
      frameId.current = requestAnimationFrame(tick)
    }
    frameId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics])

  const thicknessLayers = [-1.4, -0.7, 0, 0.7, 1.4]

  return (
    <div ref={wrapRef} className="relative w-full select-none" style={{ height: 420 }}>
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none" style={{ perspective: '1200px' }}>
        <div className="absolute" style={{ width: metrics.cardW, height: metrics.cardH, transformStyle: 'preserve-3d' }}>
          {INVESTOR_CARDS.map((cardData, i) => {
            const CardIcon = cardData.Icon
            return (
              <div
                key={cardData.label}
                ref={el => { cardsRef.current[i] = el }}
                className="absolute inset-0"
                style={{ width: metrics.cardW, height: metrics.cardH, transformStyle: 'preserve-3d' }}
              >
                {thicknessLayers.map((zOffset, layerIdx) => {
                  const isFront = layerIdx === thicknessLayers.length - 1
                  const isBack = layerIdx === 0

                  if (!isFront && !isBack) {
                    return (
                      <div
                        key={layerIdx}
                        className="absolute inset-0 rounded-[14px] pointer-events-none"
                        style={{ backgroundColor: '#1a1a1a', transform: `translateZ(${zOffset}px)` }}
                      />
                    )
                  }

                  if (isFront) {
                    return (
                      <div
                        key={layerIdx}
                        className="absolute inset-0 rounded-[14px] border border-white/10 pointer-events-none overflow-hidden flex flex-col justify-between p-5"
                        style={{
                          background: `linear-gradient(155deg, #17191a 0%, #0e0f10 70%)`,
                          transform: `translateZ(${zOffset}px)`,
                          backfaceVisibility: 'hidden',
                          boxShadow: `inset 0 1px 1px rgba(255,255,255,0.08), inset 0 0 40px ${cardData.accent}14`,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <img src={logoIconImg} alt="" className="w-6 h-6 object-contain opacity-90" />
                          <span
                            className="flex items-center justify-center rounded-full"
                            style={{ width: 34, height: 34, background: `${cardData.accent}22`, border: `1px solid ${cardData.accent}55` }}
                          >
                            <CardIcon size={16} strokeWidth={1.8} style={{ color: cardData.accent }} />
                          </span>
                        </div>
                        <div>
                          <p className="t-label mb-2" style={{ color: cardData.accent }}>Network</p>
                          <h3 className="font-display text-white font-bold leading-tight" style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)' }}>
                            {cardData.label}
                          </h3>
                          <p className="text-white/50 mt-2" style={{ fontSize: '0.72rem', lineHeight: 1.5 }}>
                            {cardData.desc}
                          </p>
                        </div>
                      </div>
                    )
                  }

                  // Back face
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[14px] border border-white/10 pointer-events-none overflow-hidden flex flex-col justify-center items-center gap-2"
                      style={{
                        background: '#0e0f10',
                        transform: `translateZ(${zOffset}px) rotateX(180deg)`,
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <div className="absolute left-0 right-0 top-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${cardData.accent}, transparent)` }} />
                      <img src={logoIconImg} alt="" className="w-8 h-8 object-contain opacity-70" />
                      <p className="text-white/70 text-xs uppercase tracking-widest">{cardData.label}</p>
                      <p className="text-white/30" style={{ fontSize: '0.65rem' }}>Akro Ventures Network</p>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
