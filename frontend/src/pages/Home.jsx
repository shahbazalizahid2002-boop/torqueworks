import { Link } from "react-router-dom";
import {
  ArrowRight, Droplets, Cog, Disc, Snowflake, BatteryCharging, Sparkles,
  Car, CircleCheck, Clock, ShieldCheck, BadgeCheck, Wrench, Star, Quote,
  UserPlus, CalendarCheck, Gauge,
} from "lucide-react";

const stats = [
  { value: "12+", label: "Years experience" },
  { value: "8K+", label: "Cars repaired" },
  { value: "4.9", label: "Customer rating" },
];

const trackerSteps = [
  { label: "Car received", time: "9:15 AM", status: "done" },
  { label: "Inspection complete", time: "10:40 AM", status: "done" },
  { label: "Repair in progress", time: "Now", status: "active" },
  { label: "Quality check", time: "—", status: "pending" },
  { label: "Ready for pickup", time: "—", status: "pending" },
];

const highlights = [
  "Certified Mechanics", "Genuine Parts", "Transparent Pricing",
  "6-Month Warranty", "Computer Diagnostics", "Pick & Drop Service",
];

const services = [
  { icon: Droplets, name: "Oil Change", desc: "Premium engine oil and filter replacement to keep your engine running smooth.", price: "2,500" },
  { icon: Cog, name: "Engine Repair", desc: "Computer diagnosis and expert repair of every kind of engine fault.", price: "5,000" },
  { icon: Disc, name: "Brake Service", desc: "Pads, discs and brake fluid checked and replaced for safe stopping.", price: "3,000" },
  { icon: Snowflake, name: "AC Repair", desc: "Gas refill, leak detection and complete cooling system repair.", price: "4,000" },
  { icon: BatteryCharging, name: "Battery & Electrical", desc: "Battery testing, wiring repairs and full lighting checks.", price: "1,500" },
  { icon: Sparkles, name: "Detailing & Wash", desc: "Deep interior cleaning and an exterior polish that shines.", price: "1,000" },
];

const features = [
  { icon: BadgeCheck, title: "Certified Mechanics", desc: "Every job is handled by trained, experienced technicians." },
  { icon: ShieldCheck, title: "6-Month Warranty", desc: "All repairs and parts are covered for your peace of mind." },
  { icon: Gauge, title: "Computer Diagnostics", desc: "Modern scanners find the exact fault. No guesswork." },
  { icon: Clock, title: "On-Time Delivery", desc: "Clear time estimates and live status updates." },
];

const steps = [
  { icon: UserPlus, title: "Create your account", desc: "Sign up in seconds and add your car's make, model and number plate." },
  { icon: CalendarCheck, title: "Book a service", desc: "Pick the service you need and a date and time that suits you." },
  { icon: Car, title: "Track & pick up", desc: "Follow each stage of the repair live, then collect your car." },
];

const reviews = [
  { name: "Ahmed Raza", car: "Honda Civic 2020", text: "Booked online in two minutes and could see exactly what was happening with my car. Picked it up on time with no surprises on the bill." },
  { name: "Sana Malik", car: "Suzuki Cultus 2019", text: "My AC was fixed the same day. Honest pricing, and the team explained everything clearly before starting the work." },
  { name: "Bilal Hussain", car: "Toyota Corolla 2018", text: "The best workshop experience I have had. Live tracking means no more calling again and again to ask about my car." },
];

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">{eyebrow}</p>
      <h2 className="mt-3 font-display text-5xl tracking-wide sm:text-6xl">{title}</h2>
      {desc && <p className="mt-4 text-lg text-zinc-400">{desc}</p>}
    </div>
  );
}

function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden pb-24 pt-32 lg:pb-32 lg:pt-44">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="absolute -top-48 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              Open today · 9 AM – 8 PM
            </span>

            <h1 className="mt-6 font-display text-6xl leading-[0.9] tracking-wide sm:text-7xl lg:text-8xl">
              Your car deserves <span className="text-gradient">expert care</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-zinc-400">
              Book a service online, follow every stage of the repair in real time,
              and pick up your car exactly when it's ready.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-4 font-semibold text-zinc-950 shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
              >
                Book a Service
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-4 font-semibold transition hover:bg-white/5"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl tracking-wide">{s.value}</p>
                  <p className="text-sm text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md animate-float">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-orange-500/30 via-orange-500/5 to-transparent blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <p className="font-display text-2xl tracking-wider">Live Job Tracker</p>
                <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-400">
                  In Progress
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-500/15">
                  <Car className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <p className="font-semibold">Toyota Corolla 2021</p>
                  <p className="text-sm text-zinc-500">LEA-4521 · Engine Tune-up</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3.5">
                {trackerSteps.map((s) => (
                  <li key={s.label} className="flex items-center gap-3">
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                        s.status === "done"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : s.status === "active"
                          ? "bg-orange-500 text-zinc-950"
                          : "border border-white/15"
                      }`}
                    >
                      {s.status === "done" && <CircleCheck className="h-4 w-4" />}
                      {s.status === "active" && <Wrench className="h-3.5 w-3.5" />}
                      {s.status === "pending" && <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />}
                    </span>
                    <span
                      className={`flex-1 text-sm ${s.status === "pending" ? "text-zinc-500" : "text-zinc-200"} ${
                        s.status === "active" ? "font-semibold" : ""
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="text-xs text-zinc-500">{s.time}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Progress</span>
                  <span className="font-semibold text-orange-400">60%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                <div>
                  <p className="text-zinc-500">Mechanic</p>
                  <p className="font-semibold">Usman Ali</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-500">Est. ready</p>
                  <p className="font-semibold">Today, 5:30 PM</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-8 hidden items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold">6-Month Warranty</p>
                <p className="text-xs text-zinc-500">On every repair</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLLING HIGHLIGHTS */}
      <section className="overflow-hidden border-y border-white/10 bg-zinc-900/40 py-5">
        <div className="flex w-max animate-marquee">
          {[...highlights, ...highlights].map((item, i) => (
            <div key={i} className="flex items-center gap-3 whitespace-nowrap pr-12 text-zinc-400">
              <Wrench className="h-4 w-4 text-orange-500" />
              <span className="font-display text-2xl tracking-wider">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="What we do"
            title="Services for every car"
            desc="From routine maintenance to major repairs, handled by experts with genuine parts."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, name, desc, price }) => (
              <div
                key={name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/50"
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-orange-500/0 blur-2xl transition duration-500 group-hover:bg-orange-500/20" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-500/10 text-orange-400 transition group-hover:bg-orange-500 group-hover:text-zinc-950">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{name}</h3>
                  <p className="mt-2 text-zinc-400">{desc}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <p className="text-sm text-zinc-500">
                      From <span className="text-lg font-bold text-white">Rs {price}</span>
                    </p>
                    <Link
                      to="/register"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-zinc-950"
                      aria-label={`Book ${name}`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="scroll-mt-20 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Why choose us</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl">
              Workshop quality, <span className="text-gradient">zero guesswork</span>
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              No more waiting by the phone or wondering what's wrong with your car.
              You see the diagnosis, the price and the progress, all in one place.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Price approved by you before any work starts",
                "Old parts shown and returned on request",
                "Full digital service history for every car",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-zinc-300">
                  <CircleCheck className="h-5 w-5 shrink-0 text-orange-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className={`rounded-2xl border border-white/10 bg-zinc-900/50 p-6 ${i % 2 === 1 ? "sm:translate-y-8" : ""}`}
              >
                <Icon className="h-8 w-8 text-orange-500" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="scroll-mt-20 border-y border-white/10 bg-zinc-900/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="How it works" title="Three simple steps" />

          <div className="relative mt-16 grid gap-12 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent md:block" />
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-orange-500/30 bg-zinc-950 text-orange-400 shadow-lg shadow-orange-500/10">
                  <Icon className="h-8 w-8" />
                </div>
                <p className="mt-6 font-display text-xl tracking-widest text-orange-500">Step 0{i + 1}</p>
                <h3 className="mt-1 text-xl font-bold">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Reviews" title="Drivers love us" />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.name} className="relative rounded-2xl border border-white/10 bg-zinc-900/50 p-7">
                <Quote className="absolute right-6 top-6 h-10 w-10 text-orange-500/15" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="mt-4 text-zinc-300">"{r.text}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 font-bold text-zinc-950">
                    {r.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-zinc-500">{r.car}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 px-8 py-16 text-center sm:px-16">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="relative">
            <h2 className="font-display text-5xl tracking-wide text-zinc-950 sm:text-7xl">
              Ready to get back on the road?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-orange-950/80">
              Create your free account, book your first service and track it live.
            </p>
            <Link
              to="/register"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-8 py-4 font-semibold text-white shadow-xl transition hover:bg-zinc-800"
            >
              Book Your Service
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;