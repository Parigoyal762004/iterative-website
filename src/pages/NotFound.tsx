import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/Button'

const NotFound = () => (
  <section className="bg-charcoal text-white min-h-[80vh] flex items-center">
    <div className="mx-auto max-w-[1280px] px-6 py-28">
      <span className="eyebrow text-accent">404</span>
      <div className="divider-accent mt-6 mb-8" />
      <h1 className="t-display-l font-display text-white max-w-3xl">
        Page not found.
      </h1>
      <p className="mt-8 max-w-xl text-white/60 t-body-xl">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-12">
        <Link to="/">
          <Button size="lg">
            Back to Home <ArrowRight size={15} />
          </Button>
        </Link>
      </div>
    </div>
  </section>
)

export default NotFound
