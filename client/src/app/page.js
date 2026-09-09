export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">
            Code<span className="text-blue-500">Master</span>
          </h1>

          <div className="flex gap-3">
            <a
              href="/login"
              className="rounded-lg px-4 py-2 text-slate-300 hover:bg-slate-800"
            >
              Login
            </a>

            <a
              href="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700"
            >
              Register
            </a>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
          Coding Practice Platform
        </p>

        <h2 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Master Coding.
          <br />
          <span className="text-blue-500">Build Your Future.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Practice coding problems, improve your DSA skills, and prepare for
          technical interviews with CodeMaster.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/problems"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
          >
            Start Coding
          </a>

          <a
            href="/problems"
            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-800"
          >
            Explore Problems
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold">1000+ Problems</h3>
          <p className="mt-2 text-slate-400">
            Practice problems from Easy to Hard.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold">Multiple Languages</h3>
          <p className="mt-2 text-slate-400">
            Code using Python, JavaScript, Java and more.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold">Track Progress</h3>
          <p className="mt-2 text-slate-400">
            Monitor your submissions and coding statistics.
          </p>
        </div>
      </section>
    </main>
  );
}