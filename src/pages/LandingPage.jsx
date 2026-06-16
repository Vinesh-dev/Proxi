import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black px-6">
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center animate-fade-in">
        <h1 className="text-5xl font-extrabold leading-tight text-white text-center">
          Welcome to{" "}
          <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
            PROXI
          </span>
        </h1>

        <p className="mt-6 text-center text-lg italic text-slate-300">
          Ready ahh maamee!!.
        </p>

        <div className="mt-10">
          <Button onClick={() => navigate("/signup")}>Sign up with College Email</Button>
        </div>
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-600" />
          <span className="text-sm text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-600" />
        </div>
        <div className="flex justify-center gap-4">
          <button className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-colors">
            G
          </button>

          <button className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-colors">
            f
          </button>

          <button className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-colors">
            X
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?
        </p>

        <Link to="/login" className="mt-2 text-center font-semibold text-cyan-400 hover:underline">
          Log In
        </Link>
      </div>
    </main>
  );
}

export default LandingPage;