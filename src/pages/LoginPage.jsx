import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for field when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (!formData.email.endsWith(".edu") && !formData.email.includes("college") && !formData.email.includes("univ")) {
      // Proxi-specific: recommend/warn about college email
      newErrors.email = "Please use a verified college email address (e.g., .edu)";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Login simulated successfully! In a real app, this would verify your credentials and authenticate.");
      navigate("/");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Welcome</span>
        </Link>

        {/* Title / Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Welcome Back to{" "}
            <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)] block mt-1">
              PROXI
            </span>
          </h1>
          <p className="mt-2.5 text-sm text-slate-400">
            Log in to connect with your campus community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="College Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="student@rajalakshmi.edu.in"
            error={errors.email}
            icon={Mail}
            required
          />

          <div>
            <div className="flex justify-between items-center mb-1.5 pl-1">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <button
                type="button"
                className="text-xs text-cyan-400 hover:underline hover:text-cyan-300 transition-colors"
                onClick={() => alert("Password reset OTP will be sent to your college email.")}
              >
                Forgot Password?
              </button>
            </div>
            <InputField
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              icon={Lock}
              required
            />
          </div>

          <div className="pt-2">
            <Button type="submit" className="relative overflow-hidden group">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                <span>Log In</span>
              )}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
