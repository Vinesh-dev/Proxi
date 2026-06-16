import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

    // Email validation
    if (!formData.email) {
      newErrors.email = "College email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else {
      // Check if it's a college email (typically ending in .edu, or containing college/uni keywords)
      const isCollegeEmail =
        formData.email.endsWith(".edu") ||
        formData.email.split("@")[1]?.includes("college") ||
        formData.email.split("@")[1]?.includes("univ");
      
      const isPublicDomain = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"].some(
        (domain) => formData.email.toLowerCase().endsWith(domain)
      );

      if (isPublicDomain || !isCollegeEmail) {
        newErrors.email = "Proxi requires an official college/university email (e.g., .edu)";
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API registration & sending verification OTP
    setTimeout(() => {
      setIsLoading(false);
      // Store email in sessionStorage to display on the verification page
      sessionStorage.setItem("signup_email", formData.email);
      // Route to verification
      navigate("/verify");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Welcome</span>
        </Link>

        {/* Title / Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Join{" "}
            <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)] inline-block">
              PROXI
            </span>
          </h1>
          <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
            Find your tribe. Verified, campus-exclusive social discovery based on compatibility.
          </p>
        </div>

        {/* Badge info */}
        <div className="mb-6 flex items-start gap-3 bg-cyan-950/40 border border-cyan-800/40 p-4.5 rounded-2xl">
          <ShieldCheck size={20} className="text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-xs text-cyan-200/90 leading-relaxed">
            <strong>Campus Verification Required:</strong> We only accept official university/college emails (e.g., student@rajalakshmi.edu.in). Personal emails are not allowed to ensure trust and safety.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4.5">
          <InputField
            label="College Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="yourname@rajalakshmi.edu.in"
            error={errors.email}
            icon={Mail}
            required
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password (min 6 chars)"
            error={errors.password}
            icon={Lock}
            required
          />

          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            icon={Lock}
            required
          />

          <div className="pt-2">
            <Button type="submit" className="relative overflow-hidden group">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending Code...</span>
                </div>
              ) : (
                <span>Verify Email & Continue</span>
              )}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
          >
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}

export default SignupPage;
