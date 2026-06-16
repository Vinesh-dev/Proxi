import Button from "../components/common/Button";

function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black px-6">
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center">
        <h1 className="text-5xl font-extrabold leading-tight text-white">
          Welcome to{" "}
          <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
            PROXI
          </span>
        </h1>

        <p className="mt-6 text-center text-lg italic text-slate-300">
          Ready ahh maamee!!.
        </p>

        <div className="mt-10">
          <Button>Sign up with College Email</Button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?
        </p>

        <button className="mt-2 text-center font-semibold text-cyan-400 hover:underline">
          Log In
        </button>
      </div>
    </main>
  );
}

export default LandingPage;