import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { User, Phone, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api";

function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Join in seconds and book your first service.">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField label="Full name" icon={User} name="name" value={form.name} onChange={handleChange} placeholder="Ali Khan" required />
          <InputField label="Phone" icon={Phone} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="03XX XXXXXXX" required />
        </div>
        <InputField label="Email" icon={Mail} type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
        <InputField label="Password" icon={Lock} type="password" name="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" minLength={6} required />

        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 font-semibold text-zinc-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Creating account...
            </>
          ) : (
            <>
              Create account <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-orange-400 hover:text-orange-300">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;