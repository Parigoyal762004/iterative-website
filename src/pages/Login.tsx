import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import Logo from '@/components/Logo'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    // Placeholder — wire to Supabase auth when portal is ready
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setError('The investor portal is currently in private beta. If you have been granted access, please contact info@akroventures.com.')
  }

  const inputCls = [
    'w-full px-4 py-3.5 text-sm rounded-lg border transition-colors outline-none',
    'bg-white text-[#2B2B2B] placeholder-[#9CA3AF]',
    'border-[#E5E7EB] focus:border-[#3F6F73]',
  ].join(' ')

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(145deg, #0a1f21 0%, #0f2a2c 45%, #1a3538 100%)' }}
    >
      {/* Dot grid bg */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(63,111,115,0.12) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #3F6F73, #F2B705)' }} />

          <div className="px-8 py-10">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div style={{ filter: 'brightness(0)' }}>
                <Logo />
              </div>
            </div>

            <h1
              className="text-center mb-1"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#2B2B2B',
                letterSpacing: '-0.02em',
              }}
            >
              Investor Portal
            </h1>
            <p className="text-center text-sm text-[#6B7280] mb-8">
              Sign in to access your deal room and portfolio.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputCls} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#2B2B2B] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg px-4 py-3 text-xs leading-relaxed" style={{ background: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg text-sm font-bold text-[#2B2B2B] transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: '#F2B705' }}
              >
                {loading ? (
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-[#2B2B2B]/30 border-t-[#2B2B2B] animate-spin" />
                ) : (
                  <>Sign In <ArrowRight size={15} /></>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#F3F4F6] text-center space-y-3">
              <p className="text-xs text-[#6B7280]">
                Don't have portal access yet?{' '}
                <Link to="/investors#apply" className="font-semibold text-[#3F6F73] hover:text-[#2B2B2B] transition-colors">
                  Apply to join the network
                </Link>
              </p>
              <p className="text-xs text-[#6B7280]">
                Need help?{' '}
                <a href="mailto:info@akroventures.com" className="font-semibold text-[#3F6F73] hover:text-[#2B2B2B] transition-colors">
                  Email us
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-1.5"
          >
            Back to Akro Ventures
          </Link>
        </div>
      </div>
    </div>
  )
}
