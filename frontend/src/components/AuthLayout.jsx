import { Link } from "react-router-dom";
import { ArrowLeft, CircleCheck, Star } from "lucide-react";
import Logo from "./Logo";

const perks = [
  "Book any service online in under a minute",
  "Track every stage of your repair live",
  "View your bills and full service history",
];

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-zinc-900 p-12 lg:flex">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-orange-500/25 blur-[120px]" />

        <div className="relative">
          <Logo />
        </div>

        <div className="relative">
          <h2 className="font-display text-6xl leading-[0.95] tracking-wide">
            Your car's <span className="text-gradient">service hub</span>, always with you
          </h2>
          <ul className="mt-8 space-y-4">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-zinc-300">
                <CircleCheck className="h-5 w-5 shrink-0 text-orange-500" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
            ))}
          </div>
          <p className="mt-3 text-zinc-300">
            "Booked in two minutes and watched every step of the repair from my phone.
            Exactly the service I was looking for."
          </p>
          <p className="mt-4 text-sm font-semibold">Ahmed Raza · Honda Civic 2020</p>
        </div>
      </div>

      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10 animate-fade-up">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="font-display text-5xl tracking-wide">{title}</h1>
          <p className="mt-2 text-zinc-400">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;