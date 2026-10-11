import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Car, Wrench, CircleCheck, CalendarPlus, CalendarDays, Clock,
  Plus, Loader2, UserCog, Receipt, X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api, { getErrorMessage } from "../api";

const stages = ["Pending", "Confirmed", "In Progress", "Completed"];

const statusStyles = {
  Pending: "bg-amber-500/15 text-amber-300",
  Confirmed: "bg-sky-500/15 text-sky-300",
  "In Progress": "bg-orange-500/15 text-orange-300",
  Completed: "bg-emerald-500/15 text-emerald-300",
  Cancelled: "bg-red-500/15 text-red-300",
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  });

function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/bookings/my")
      .then(({ data }) => setBookings(data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      const { data } = await api.patch(`/bookings/${id}/cancel`);
      setBookings((prev) => prev.map((b) => (b._id === id ? data : b)));
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const firstName = user.name.split(" ")[0];
  const stats = [
    { icon: Car, label: "My Cars", value: new Set(bookings.map((b) => b.car.plate)).size },
    {
      icon: Wrench,
      label: "Active Jobs",
      value: bookings.filter((b) => ["Pending", "Confirmed", "In Progress"].includes(b.status)).length,
    },
    { icon: CircleCheck, label: "Completed", value: bookings.filter((b) => b.status === "Completed").length },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden pb-24 pt-28">
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Dashboard</p>
            <h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">
              Welcome, <span className="text-gradient">{firstName}</span>
            </h1>
            <p className="mt-2 text-zinc-400">Manage your cars and track every service in one place.</p>
          </div>
          <Link
            to="/book"
            className="group inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-zinc-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400"
          >
            <Plus className="h-5 w-5" /> Book a Service
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
              <div className="flex items-center justify-between">
                <p className="text-zinc-400">{label}</p>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-500/10 text-orange-400">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 font-display text-5xl tracking-wide">{value}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-3xl tracking-wider">My Bookings</h2>

        {loading && (
          <div className="mt-6 flex items-center gap-3 text-zinc-400">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading your bookings...
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-zinc-900/40 p-12 text-center">
            <CalendarPlus className="mx-auto h-12 w-12 text-orange-500" />
            <h3 className="mt-4 text-2xl font-bold">No bookings yet</h3>
            <p className="mx-auto mt-2 max-w-md text-zinc-400">
              Book your first service and track it here, step by step.
            </p>
            <Link
              to="/book"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-orange-400"
            >
              <Plus className="h-5 w-5" /> Book a Service
            </Link>
          </div>
        )}

        <div className="mt-6 space-y-5">
          {bookings.map((b) => {
            const idx = stages.indexOf(b.status);
            return (
              <div key={b._id} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-500/10 text-orange-400">
                      <Car className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{b.services.map((s) => s.name).join(" + ")}</h3>
                      <p className="text-sm text-zinc-400">
                        {b.car.make} {b.car.model}
                        {b.car.year ? ` ${b.car.year}` : ""} ·{" "}
                        <span className="font-semibold text-zinc-300">{b.car.plate}</span>
                      </p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[b.status]}`}>
                    {b.status}
                  </span>
                </div>

                {b.status !== "Cancelled" && (
                  <div className="mt-5 grid grid-cols-4 gap-2">
                    {stages.map((s, i) => (
                      <div key={s}>
                        <div
                          className={`h-1.5 rounded-full ${
                            i <= idx ? "bg-gradient-to-r from-orange-500 to-amber-400" : "bg-zinc-800"
                          }`}
                        />
                        <p className={`mt-2 text-xs ${i <= idx ? "text-zinc-300" : "text-zinc-600"}`}>{s}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-4 text-sm text-zinc-400">
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-orange-500" /> {formatDate(b.date)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" /> {b.timeSlot}
                  </span>
                  <span className="flex items-center gap-2">
                    <UserCog className="h-4 w-4 text-orange-500" /> {b.mechanic || "Mechanic not assigned yet"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-orange-500" />
                    {b.finalBill != null
                      ? `Bill: Rs ${b.finalBill.toLocaleString()}`
                      : `Est. Rs ${b.totalPrice.toLocaleString()}`}
                  </span>

                  {["Pending", "Confirmed"].includes(b.status) && (
                    <button
                      onClick={() => handleCancel(b._id)}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 text-red-300 transition hover:bg-red-500/10"
                    >
                      <X className="h-4 w-4" /> Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;