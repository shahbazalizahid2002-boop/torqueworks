import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Logo from "./Logo";

const serviceLinks = ["Oil Change", "Engine Repair", "Brake Service", "AC Repair", "Detailing & Wash"];

const contact = [
  { icon: Phone, text: "+92 300 1234567" },
  { icon: Mail, text: "info@torqueworks.pk" },
  { icon: MapPin, text: "Main Boulevard, Lahore" },
  { icon: Clock, text: "Mon – Sat, 9 AM – 8 PM" },
];

function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-zinc-400">
            Professional car repair and maintenance with online booking and live
            job tracking. Honest work, genuine parts, on time.
          </p>
        </div>

        <div>
          <h4 className="font-display text-2xl tracking-wider">Services</h4>
          <ul className="mt-4 space-y-3">
            {serviceLinks.map((s) => (
              <li key={s}>
                <a href="/#services" className="text-zinc-400 transition hover:text-orange-400">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-2xl tracking-wider">Contact</h4>
          <ul className="mt-4 space-y-3">
            {contact.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-zinc-400">
                <Icon className="h-4 w-4 shrink-0 text-orange-500" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} TorqueWorks. All rights reserved.</p>
          <p>Built with the MERN stack</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;