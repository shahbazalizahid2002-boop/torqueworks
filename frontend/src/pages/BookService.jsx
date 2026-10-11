import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Droplets, Cog, Disc, Snowflake, BatteryCharging, Sparkles, Wrench,
  Car, CalendarDays, Clock, Hash, ArrowLeft, ArrowRight, Loader2, CircleCheck,
} from "lucide-react";
import InputField from "../components/InputField";
import api, { getErrorMessage } from "../api";

const icons = {
  "oil-change": Droplets,
  "engine-repair": Cog,
  "brake-service": Disc,
  "ac-repair": Snowflake,
  "battery-electrical": BatteryCharging,
  "detailing-wash": Sparkles,
};

const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

function StepTitle({ num, title, hint }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-500 font-display text-lg text-zinc-950">
        {num}
      </span>
      <h2 className="text-xl font-bold">{title}</h2>
      {hint && <span className="text-sm text-zinc-500">{hint}</span>}
    </div>
  );
}

function BookService() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [form, setForm] = useState({
    serviceKeys: [], make: "", model: "", year: "", plate: "", date: "", timeSlot: "", notes: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/services")
      .then(({ data }) => {
        setServices(data.services);
        setTimeSlots(data.timeSlots);
      })
      .catch((err) => setError(getErrorMessage(err)));
  }, []);

  const selected = services.filter((s) => form.serviceKeys.includes(s.key));
  const total = selected.reduce((sum, s) => sum + s.price, 0);

  const toggleService = (key) => {
    setForm((f) => ({
      ...f,
      serviceKeys: f.serviceKeys.includes(key)
        ? f.serviceKeys.filter((k) => k !== key)
        : [...f.serviceKeys, key],
    }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.serviceKeys.length === 0) return setError("Please choose at least one service.");
    if (!form.timeSlot) return setError("Please choose a time slot.");

    setLoading(true);
    try {
      await api.post("/bookings", {
        serviceKeys: form.serviceKeys,
        car: { make: form.make, model: form.model, year: form.year, plate: form.plate },
        date: form.date,
        timeSlot: form.timeSlot,
        notes: form.notes,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden pb-24 pt-28">
      <div className="absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
        <h1 className="mt-4 font-display text-5xl tracking-wide sm:text-6xl">
          Book a <span className="text-gradient">service</span>
        </h1>
        <p className="mt-2 text-zinc-400">Choose your services, tell us about your car, and pick a time.</p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            {/* 1. Services */}
            <section>
              <StepTitle num="1" title="Choose services" hint="Select one or more" />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {services.map((s) => {
                  const Icon = icons[s.key] || Wrench;
                  const active = form.serviceKeys.includes(s.key);
                  return (
                    <button
                      type="button"
                      key={s.key}
                      onClick={() => toggleService(s.key)}
                      className={`relative flex items-center gap-4 rounded-2xl border p-5 text-left transition ${
                        active
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-white/10 bg-zinc-900/50 hover:border-white/25"
                      }`}
                    >
                      <div
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
                          active ? "bg-orange-500 text-zinc-950" : "bg-orange-500/10 text-orange-400"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{s.name}</p>
                        <p className="text-sm text-zinc-400">
                          Rs {s.price.toLocaleString()} · {s.duration}
                        </p>
                      </div>
                      {active ? (
                        <CircleCheck className="h-6 w-6 text-orange-400" />
                      ) : (
                        <span className="h-6 w-6 rounded-full border-2 border-white/20" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 2. Car */}
            <section>
              <StepTitle num="2" title="Your car" />
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <InputField label="Make" icon={Car} name="make" value={form.make} onChange={handleChange} placeholder="Toyota" required />
                <InputField label="Model" icon={Car} name="model" value={form.model} onChange={handleChange} placeholder="Corolla" required />
                <InputField label="Year (optional)" icon={CalendarDays} type="number" name="year" value={form.year} onChange={handleChange} placeholder="2021" min="1980" max="2030" />
                <InputField label="Number plate" icon={Hash} name="plate" value={form.plate} onChange={handleChange} placeholder="LEA-4521" required />
              </div>
            </section>

            {/* 3. Date & time */}
            <section>
              <StepTitle num="3" title="Date & time" />
              <div className="mt-5">
                <label htmlFor="date" className="mb-2 block text-sm font-medium text-zinc-300">Date</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  min={today}
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-white outline-none transition [color-scheme:dark] focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 sm:w-72"
                />
              </div>
              <p className="mb-2 mt-6 text-sm font-medium text-zinc-300">Time slot</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setForm({ ...form, timeSlot: slot })}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition ${
                      form.timeSlot === slot
                        ? "border-orange-500 bg-orange-500 text-zinc-950"
                        : "border-white/10 bg-zinc-900/50 text-zinc-300 hover:border-white/25"
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    {slot}
                  </button>
                ))}
              </div>
            </section>

            {/* 4. Notes */}
            <section>
              <StepTitle num="4" title="Anything we should know?" />
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                placeholder="e.g. Strange noise when braking, AC not cooling properly..."
                className="mt-5 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15"
              />
            </section>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 backdrop-blur-xl">
              <p className="font-display text-2xl tracking-wider">Booking Summary</p>

              <div className="mt-5">
                <p className="text-sm text-zinc-500">Services</p>
                {selected.length === 0 ? (
                  <p className="mt-2 text-sm font-semibold">—</p>
                ) : (
                  <ul className="mt-2 space-y-2">
                    {selected.map((s) => (
                      <li key={s.key} className="flex justify-between gap-4 text-sm">
                        <span className="font-semibold">{s.name}</span>
                        <span className="text-zinc-400">Rs {s.price.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <dl className="mt-5 space-y-4 border-t border-white/10 pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Car</dt>
                  <dd className="text-right font-semibold">
                    {form.make || form.model ? `${form.make} ${form.model}` : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Plate</dt>
                  <dd className="text-right font-semibold uppercase">{form.plate || "—"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Date</dt>
                  <dd className="text-right font-semibold">{form.date || "—"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Time</dt>
                  <dd className="text-right font-semibold">{form.timeSlot || "—"}</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5">
                <p className="text-zinc-500">Estimated total</p>
                <p className="font-display text-4xl tracking-wide text-orange-400">
                  Rs {total.toLocaleString()}
                </p>
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                Final bill is confirmed by the workshop after inspection.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 font-semibold text-zinc-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Booking...
                  </>
                ) : (
                  <>
                    Confirm Booking <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default BookService;