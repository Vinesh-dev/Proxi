import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Button from "../components/common/Button";

function VerificationPage() {
  const navigate = useNavigate();
  const [email] = useState(() => {
    return sessionStorage.getItem("signup_email") || "student@college.edu";
  });
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(59);
  
  // Refs for auto-focusing next input
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus the first input on load
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Resend OTP countdown timer
  useEffect(() => {
    if (resendTimer === 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Only allow numbers

    const newCode = [...code];
    // Keep only the last character entered
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    setError("");

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Auto-focus previous input on Backspace
    if (e.key === "Backspace" && !code[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pastedData)) return; // Only allow 6 digits

    const newCode = pastedData.split("");
    setCode(newCode);

    // Focus last input
    if (inputRefs.current[5]) {
      inputRefs.current[5].focus();
    }
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(59);
    setError("");
    alert(`A new verification code has been sent to ${email}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join("");
    
    if (enteredCode.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo, any 6 digit code is accepted
      if (enteredCode.length === 6) {
        alert("Email verified successfully! Welcome to the Proxi community.");
        // Clear registration flow email
        sessionStorage.removeItem("signup_email");
        // Redirect to a mock onboarding page or welcome
        navigate("/onboarding");
      } else {
        setError("Invalid verification code. Please try again.");
      }
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
          to="/signup"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Sign Up</span>
        </Link>

        {/* Title / Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Verify Your{" "}
            <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)] block mt-1">
              Email
            </span>
          </h1>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed px-2">
            We've sent a 6-digit verification code to: <br />
            <strong className="text-white select-all">{email}</strong>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Code Inputs */}
          <div>
            <label className="block text-sm font-medium text-slate-300 text-center mb-4">
              Enter Verification Code
            </label>
            <div className="flex justify-between gap-2 max-w-xs mx-auto" onPaste={handlePaste}>
              {code.map((num, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={num}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-14 text-center text-xl font-bold bg-slate-900/60 border border-slate-700 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 text-white rounded-xl outline-none transition-all"
                  required
                />
              ))}
            </div>
            {error && (
              <p className="mt-4 text-center text-sm text-rose-500 font-medium">
                {error}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button type="submit" className="relative overflow-hidden group">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <span>Verify & Create Account</span>
              )}
            </Button>
          </div>
        </form>

        {/* Resend info */}
        <div className="mt-8 text-center text-sm text-slate-400">
          Didn't receive the code?{" "}
          {resendTimer > 0 ? (
            <span className="text-slate-500 font-medium ml-1">
              Resend in {resendTimer}s
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors focus:outline-none"
            >
              <RefreshCw size={13} />
              <span>Resend Code</span>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default VerificationPage;
