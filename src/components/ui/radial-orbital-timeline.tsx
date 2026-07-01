import { useEffect, useRef, useState, useCallback } from 'react'
import {
  TrendingUp, Rocket, Globe, Ship, Layers, ClipboardCheck,
  ShieldCheck, BarChart3, Users, Landmark
} from 'lucide-react'
import logoImg from '@/assets/logo.png'

type IconComponent = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>

interface OrbitalNode {
  id: number
  title: string
  category: string
  content: string
  Icon: IconComponent
  color: string
  angle: number
  energy: number
}

const FOUNDER_NODES: OrbitalNode[] = [
  { id: 1, title: 'Business Loans',      category: 'Founders', content: 'Unsecured and secured loans matched to your cashflow, GST returns, and business profile. No collateral needed for working capital.',  Icon: TrendingUp,     color: '#3F6F73', angle: 0,   energy: 92 },
  { id: 2, title: 'Startup Fundraising', category: 'Founders', content: 'From pre-seed to growth stage. We sharpen your narrative, build the model, and connect you to the right investors.',                   Icon: Rocket,         color: '#3F6F73', angle: 60,  energy: 85 },
  { id: 3, title: 'FDI and ECB',         category: 'Founders', content: 'Foreign direct investment and external commercial borrowings with full RBI/FEMA compliance and cross-border capital structuring.',         Icon: Globe,          color: '#3F6F73', angle: 120, energy: 78 },
  { id: 4, title: 'Export Factoring',    category: 'Founders', content: 'Up to 90% of export invoice value unlocked on Day 0. Collateral-free and non-recourse. Stop funding your buyer\'s credit period.',         Icon: Ship,           color: '#3F6F73', angle: 180, energy: 88 },
  { id: 5, title: 'Project Funding',     category: 'Founders', content: 'Milestone-based drawdowns for large-scale projects. Senior, mezzanine, and hybrid structures tailored to your development timeline.',    Icon: Layers,         color: '#3F6F73', angle: 240, energy: 72 },
  { id: 6, title: 'Loan Readiness',      category: 'Founders', content: 'Know exactly where you stand before applying. Detailed audit, instant score, and a structured action plan to maximise approval odds.',   Icon: ClipboardCheck, color: '#3F6F73', angle: 300, energy: 96 },
]

const INVESTOR_NODES: OrbitalNode[] = [
  { id: 7,  title: 'Verified Deal Flow', category: 'Investors', content: 'Anonymised deal cards with sector, stage, and ticket size. Every deal is pre-vetted before it reaches you.',                           Icon: ShieldCheck, color: '#F2B705', angle: 0,   energy: 95 },
  { id: 8,  title: '50+ Closed Deals',  category: 'Investors', content: 'Track record verified across equity advisory and structured debt mandates. Real capital, real closures, all anonymised.',               Icon: BarChart3,   color: '#F2B705', angle: 90,  energy: 90 },
  { id: 9,  title: 'Direct Access',     category: 'Investors', content: 'Full founder introductions post NDA and agreement. You get direct access to the decision-makers, not intermediaries.',                  Icon: Users,       color: '#F2B705', angle: 180, energy: 82 },
  { id: 10, title: '₹50L to ₹50Cr',    category: 'Investors', content: 'Curated across early stage equity to structured credit. Ticket sizes designed to match your deployment strategy and risk profile.',    Icon: Landmark,    color: '#F2B705', angle: 270, energy: 88 },
]

interface RadialOrbitalTimelineProps {
  mode: 'founders' | 'investors'
}

export function RadialOrbitalTimeline({ mode }: RadialOrbitalTimelineProps) {
  const nodes = mode === 'founders' ? FOUNDER_NODES : INVESTOR_NODES
  const accentColor = mode === 'founders' ? '#3F6F73' : '#F2B705'
  const [rotation, setRotation] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const rafRef = useRef<number>(0)
  const lastRef = useRef<number>(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const RADIUS = isMobile ? 118 : 210
  const SPEED = 0.008 // degrees per ms

  const animate = useCallback((ts: number) => {
    if (!lastRef.current) lastRef.current = ts
    const delta = ts - lastRef.current
    lastRef.current = ts
    if (!paused) setRotation(r => (r + SPEED * delta) % 360)
    rafRef.current = requestAnimationFrame(animate)
  }, [paused])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  const getPos = (baseAngle: number) => {
    const rad = ((baseAngle + rotation) * Math.PI) / 180
    return { x: Math.cos(rad) * RADIUS, y: Math.sin(rad) * RADIUS }
  }

  const getDepth = (baseAngle: number) => {
    const rad = ((baseAngle + rotation) * Math.PI) / 180
    return Math.sin(rad)
  }

  const handleSelect = (id: number) => {
    if (selected === id) { setSelected(null); setPaused(false) }
    else { setSelected(id); setPaused(true) }
  }

  const selectedNode = nodes.find(n => n.id === selected)
  const SIZE = isMobile ? 290 : 500
  const NODE_SIZE = isMobile ? 38 : 60
  const ICON_SIZE = isMobile ? 16 : 24
  const CORE_SIZE = isMobile ? 44 : 66
  const LABEL_SIZE = isMobile ? 9 : 11

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Orbit canvas */}
      <div
        className="relative select-none"
        style={{ width: SIZE, height: SIZE }}
        onClick={() => { setSelected(null); setPaused(false) }}
      >
        {/* Orbit ring */}
        <svg className="absolute inset-0 pointer-events-none" width={SIZE} height={SIZE}>
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
            fill="none" stroke={accentColor} strokeOpacity={0.15} strokeWidth={1}
            strokeDasharray="3 9"
          />
        </svg>

        {/* Centre core */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: CORE_SIZE, height: CORE_SIZE,
            left: SIZE / 2 - CORE_SIZE / 2, top: SIZE / 2 - CORE_SIZE / 2,
            background: `radial-gradient(circle, ${accentColor}44 0%, transparent 70%)`,
            border: `1px solid ${accentColor}55`,
            boxShadow: `0 0 24px ${accentColor}22`,
          }}
        >
          <img src={logoImg} alt="Akro Ventures" className="w-8 h-8 object-contain rounded-full" style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
          <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${accentColor}22`, animation: 'ping 2.5s cubic-bezier(0,0,0.2,1) infinite' }} />
        </div>

        {/* Orbital nodes */}
        {nodes.map(node => {
          const pos = getPos(node.angle)
          const depth = getDepth(node.angle)
          const scale = 0.85 + (depth + 1) * 0.1
          const opacity = 0.65 + (depth + 1) * 0.175
          const isSelected = selected === node.id
          const NodeIcon = node.Icon

          return (
            <button
              key={node.id}
              onClick={e => { e.stopPropagation(); handleSelect(node.id) }}
              className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: SIZE / 2 + pos.x,
                top: SIZE / 2 + pos.y,
                transform: `translate(-50%, -50%) scale(${isSelected ? 1.18 : scale})`,
                opacity: isSelected ? 1 : opacity,
                zIndex: isSelected ? 30 : Math.round((depth + 1) * 10),
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: NODE_SIZE, height: NODE_SIZE,
                  background: isSelected ? accentColor : `${accentColor}2a`,
                  border: `1.5px solid ${isSelected ? accentColor : accentColor + '55'}`,
                  boxShadow: isSelected ? `0 0 18px ${accentColor}55` : 'none',
                  transition: 'background 0.3s, box-shadow 0.3s',
                }}
              >
                <NodeIcon
                  size={ICON_SIZE}
                  strokeWidth={1.6}
                  className={isSelected ? 'text-white' : ''}
                  style={{ color: isSelected ? '#fff' : accentColor }}
                />
              </div>
              <span
                className="whitespace-nowrap font-medium"
                style={{
                  fontSize: LABEL_SIZE,
                  letterSpacing: '0.04em',
                  color: isSelected ? '#fff' : 'rgba(255,255,255,0.55)',
                  transition: 'color 0.3s',
                  maxWidth: 72,
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}
              >
                {node.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* Detail card */}
      <div
        className="w-full max-w-sm transition-all duration-400 overflow-hidden"
        style={{ maxHeight: selectedNode ? 220 : 0, opacity: selectedNode ? 1 : 0 }}
      >
        {selectedNode && (
          <div
            className="rounded-sm p-5 border"
            style={{ background: 'rgba(255,255,255,0.04)', borderColor: `${accentColor}33` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>
                {selectedNode.category}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-white/30 text-[10px]">fit score</span>
                <div className="h-1 w-20 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${selectedNode.energy}%`, background: accentColor, transition: 'width 0.7s ease' }}
                  />
                </div>
              </div>
            </div>
            <h4 className="font-display text-white font-semibold mb-1.5" style={{ fontSize: '1rem' }}>
              {selectedNode.title}
            </h4>
            <p className="text-white/55 leading-relaxed" style={{ fontSize: '0.78rem' }}>
              {selectedNode.content}
            </p>
          </div>
        )}
      </div>

      {!selectedNode && (
        <p className="text-white/20 text-[10px] tracking-widest uppercase">tap a node to explore</p>
      )}
    </div>
  )
}
