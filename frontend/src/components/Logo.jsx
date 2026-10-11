import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 shadow-lg shadow-orange-500/30">
        <Wrench className="h-5 w-5 text-zinc-950" strokeWidth={2.5} />
      </span>
      <span className="font-display text-3xl leading-none tracking-wider text-white">
        Torque<span className="text-orange-500">Works</span>
      </span>
    </Link>
  );
}

export default Logo;