import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, Building2, TrendingUp, CheckCircle } from 'lucide-react'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'

type Track = 'choose' | 'investor' | 'founder' | 'success'

interface InvestorForm {
  name: string
  email: string
  phone: string
  investor_type: string
  ticket_size: string
}

interface FounderForm {
  name: string
  email: string
  phone: string
  company: string
  stage: string
  looking_for: string
}

const inputCls = [
  'w-full px-4 py-3 text-sm rounded-lg border transition-colors outline-none',
  'bg-white text-[#2B2B2B] placeholder-[#9CA3AF]',
  'border-[#E5E7EB] focus:border-[#3F6F73]',
].join(' ')

const selectCls = inputCls + ' appearance-none cursor-pointer'

export default function Apply() {
  const [track, setTrack] = useState<Track>('choose')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [investorForm, setInvestorForm] = useState<InvestorForm>({
    name: '', email: '', phone: '', investor_type: '', ticket_size: '',
  })
  const [founderForm, setFounderForm] = useState<FounderForm>({
    name: '', email: '', phone: '', company: '', stage: '', looking_for: '',
  })

  const handleInvestorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.from('portal_applications').insert({
      name: investorForm.name,
      email: investorForm.email,
      phone: investorForm.phone || null,
      applicant_type: 'investor',
      metadata: {
        investor_type: investorForm.investor_type,
        ticket_size: investorForm.ticket_size,
      },
    })
    setLoading(false)
    if (err) {
      setError('Something went wrong. Please try again or email info@akroventures.com.')
    } else {
      setTrack('success')
    }
  }

  const handleFounderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.from('portal_applications').insert({
      name: founderForm.name,
      email: founderForm.email,
      phone: founderForm.phone || null,
      applicant_type: 'founder',
      metadata: {
        company: founderForm.company,
        stage: founderForm.stage,
        looking_for: founderForm.looking_for,
      },
    })
    setLoading(false)
    if (err) {
      setError('Something went wrong. Please try again or email info@akroventures.com.')
    } else {
      setTrack('success')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: 'linear-gradient(145deg, #0a1f21 0%, #0f2a2c 45%, #1a3538 100%)' }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(63,111,115,0.12) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative w-full max-w-lg">
        {/* Back button */}
        {(track === 'investor' || track === 'founder') && (
          <button
            onClick={() => { setTrack('choose'); setError('') }}
            className="mb-4 inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            <ChevronLeft size={14} /> Back
          </button>
        )}

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #3F6F73, #F2B705)' }} />

          <div className="px-8 py-10">
            <div className="mb-8 flex justify-center">
              <Logo />
            </div>

            {/* ── Choose track ── */}
            {track === 'choose' && (
              <>
                <h1
                  className="text-center mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.75rem', fontWeight: 700, color: '#2B2B2B', letterSpacing: '-0.02em' }}
                >
                  Join the Network
                </h1>
                <p className="text-center text-sm text-[#6B7280] mb-8">
                  Tell us who you are and we'll be in touch.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTrack('investor')}
                    className="group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-[#E5E7EB] hover:border-[#3F6F73] transition-all duration-200 text-left"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(63,111,115,0.1)' }}>
                      <TrendingUp size={22} className="text-[#3F6F73]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#2B2B2B] text-center">I'm an Investor</p>
                      <p className="text-xs text-[#9CA3AF] text-center mt-1">HNI, Family Office, VC</p>
                    </div>
                    <ArrowRight size={14} className="text-[#3F6F73] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <button
                    onClick={() => setTrack('founder')}
                    className="group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-[#E5E7EB] hover:border-[#F2B705] transition-all duration-200 text-left"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(242,183,5,0.1)' }}>
                      <Building2 size={22} className="text-[#F2B705]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#2B2B2B] text-center">I'm a Founder</p>
                      <p className="text-xs text-[#9CA3AF] text-center mt-1">Startup, SME, Scale-up</p>
                    </div>
                    <ArrowRight size={14} className="text-[#F2B705] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </>
            )}

            {/* ── Investor form ── */}
            {track === 'investor' && (
              <>
                <h1
                  className="text-center mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.75rem', fontWeight: 700, color: '#2B2B2B', letterSpacing: '-0.02em' }}
                >
                  Investor Application
                </h1>
                <p className="text-center text-sm text-[#6B7280] mb-7">
                  We review every application personally before reaching out.
                </p>

                <form onSubmit={handleInvestorSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">Full Name</label>
                    <input type="text" required value={investorForm.name} onChange={e => setInvestorForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">Email</label>
                    <input type="email" required value={investorForm.email} onChange={e => setInvestorForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">Phone (optional)</label>
                    <input type="tel" value={investorForm.phone} onChange={e => setInvestorForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">Investor Type</label>
                    <select required value={investorForm.investor_type} onChange={e => setInvestorForm(f => ({ ...f, investor_type: e.target.value }))} className={selectCls}>
                      <option value="">Select type</option>
                      <option>HNI / Individual</option>
                      <option>Family Office</option>
                      <option>Angel Investor</option>
                      <option>VC / PE Fund</option>
                      <option>Corporate / Strategic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">Typical Ticket Size</label>
                    <select required value={investorForm.ticket_size} onChange={e => setInvestorForm(f => ({ ...f, ticket_size: e.target.value }))} className={selectCls}>
                      <option value="">Select range</option>
                      <option>Under 25 Lakhs</option>
                      <option>25L - 1 Cr</option>
                      <option>1 Cr - 5 Cr</option>
                      <option>5 Cr - 25 Cr</option>
                      <option>25 Cr+</option>
                    </select>
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
                    style={{ background: '#3F6F73', color: 'white' }}
                  >
                    {loading
                      ? <span className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      : <>Submit Application <ArrowRight size={15} /></>
                    }
                  </button>
                </form>
              </>
            )}

            {/* ── Founder form ── */}
            {track === 'founder' && (
              <>
                <h1
                  className="text-center mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.75rem', fontWeight: 700, color: '#2B2B2B', letterSpacing: '-0.02em' }}
                >
                  Founder Application
                </h1>
                <p className="text-center text-sm text-[#6B7280] mb-7">
                  Tell us about your company and what you're looking for.
                </p>

                <form onSubmit={handleFounderSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">Full Name</label>
                    <input type="text" required value={founderForm.name} onChange={e => setFounderForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">Email</label>
                    <input type="email" required value={founderForm.email} onChange={e => setFounderForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">Phone (optional)</label>
                    <input type="tel" value={founderForm.phone} onChange={e => setFounderForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">Company Name</label>
                    <input type="text" required value={founderForm.company} onChange={e => setFounderForm(f => ({ ...f, company: e.target.value }))} placeholder="Your startup or business" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">Stage</label>
                    <select required value={founderForm.stage} onChange={e => setFounderForm(f => ({ ...f, stage: e.target.value }))} className={selectCls}>
                      <option value="">Select stage</option>
                      <option>Idea / Pre-revenue</option>
                      <option>Pre-seed</option>
                      <option>Seed</option>
                      <option>Series A</option>
                      <option>Series B+</option>
                      <option>Profitable SME</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-1.5">What are you looking for?</label>
                    <select required value={founderForm.looking_for} onChange={e => setFounderForm(f => ({ ...f, looking_for: e.target.value }))} className={selectCls}>
                      <option value="">Select one</option>
                      <option>Equity Fundraising</option>
                      <option>Debt / Working Capital</option>
                      <option>Both Equity and Debt</option>
                      <option>Advisory / Consulting</option>
                      <option>Export Finance</option>
                    </select>
                  </div>

                  {error && (
                    <div className="rounded-lg px-4 py-3 text-xs leading-relaxed" style={{ background: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA' }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-lg text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ background: '#F2B705', color: '#2B2B2B' }}
                  >
                    {loading
                      ? <span className="inline-block h-4 w-4 rounded-full border-2 border-[#2B2B2B]/30 border-t-[#2B2B2B] animate-spin" />
                      : <>Submit Application <ArrowRight size={15} /></>
                    }
                  </button>
                </form>
              </>
            )}

            {/* ── Success ── */}
            {track === 'success' && (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(63,111,115,0.1)' }}>
                  <CheckCircle size={32} className="text-[#3F6F73]" />
                </div>
                <h1
                  className="mb-3"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.75rem', fontWeight: 700, color: '#2B2B2B', letterSpacing: '-0.02em' }}
                >
                  Application Received
                </h1>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-8">
                  Thank you for reaching out. We review every application personally and will get back to you within 48 hours.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-lg text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ background: '#3F6F73', color: 'white' }}
                >
                  Back to Akro Ventures
                </Link>
              </div>
            )}

            {/* Footer links */}
            {(track === 'choose' || track === 'investor' || track === 'founder') && (
              <div className="mt-8 pt-6 border-t border-[#F3F4F6] text-center">
                <p className="text-xs text-[#6B7280]">
                  Already have portal access?{' '}
                  <a href="mailto:info@akroventures.com" className="font-semibold text-[#3F6F73] hover:text-[#2B2B2B] transition-colors">
                    Email us
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-1.5">
            Back to Akro Ventures
          </Link>
        </div>
      </div>
    </div>
  )
}
