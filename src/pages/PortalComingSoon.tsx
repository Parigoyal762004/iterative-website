import { Link } from 'react-router-dom'
import { Button } from '@/components/Button'

export default function PortalComingSoon() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-charcoal text-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <span className="eyebrow text-accent block mb-4">Client Portal</span>
        <div className="divider-accent mx-auto mb-8" />
        <h1 className="t-display-m text-white mb-6">
          The portal is on its way.
        </h1>
        <p className="t-body-l text-white/60 mb-10 leading-relaxed">
          The Akro client portal (deal tracking, document signing, and portfolio visibility) is currently in development. Existing clients can reach us directly in the meantime.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="mailto:info@akroventures.com">
            <Button variant="primary" size="lg">Email Us</Button>
          </a>
          <Link to="/">
            <Button variant="ghost-light" size="lg">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
