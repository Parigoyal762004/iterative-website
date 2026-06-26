import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";

const Logo = () => (
  <Link to="/" className="inline-flex items-center group" aria-label="Akro Ventures home">
    <img
      src={logoImg}
      alt="Akro Ventures"
      className="h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
    />
  </Link>
);

export default Logo;
