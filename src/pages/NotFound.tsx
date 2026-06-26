import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const NotFound = () => (
  <section className="bg-primary text-white min-h-[80vh] flex items-center">
    <div className="container py-28">
      <span className="eyebrow text-accent">404</span>
      <div className="divider-gold mt-6 mb-8" />
      <h1 className="text-5xl md:text-7xl max-w-3xl leading-[1.05]">
        Page not found.
      </h1>
      <p className="mt-8 max-w-xl text-white/75 text-lg">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>
      <div className="mt-12">
        <Link to="/">
          <MagneticButton variant="teal">
            Back to Home <ArrowRight size={16} />
          </MagneticButton>
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
