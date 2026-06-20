import Link from "next/link";
import { ArrowRight, BookOpen, Newspaper, TrendingUp } from "lucide-react";

export const metadata = {
  title: "About | Crypto News",
  description: "About Crypto News and how we cover markets, stories, and learning resources.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 pt-24 pb-16 px-6 sm:px-10 lg:px-24">
      <section className="mx-auto max-w-5xl rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 bg-gradient-to-br from-sky-50 via-white to-emerald-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 shadow-xl">
        <p className="inline-flex items-center rounded-full border border-sky-300 dark:border-sky-700 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-sky-700 dark:text-sky-300">
          About Crypto News
        </p>
        <h1 className="mt-5 text-3xl sm:text-5xl font-bold leading-tight">
          Fast market headlines with context you can actually use.
        </h1>
        <p className="mt-5 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 max-w-3xl">
          Crypto News focuses on the signal over noise: key market moves, project updates, and regulation shifts,
          with glossary support so newer readers can learn while they browse.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/news/Latest News" className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-zinc-900 hover:opacity-90 transition">
            Explore Latest News
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/glossary" className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            Learn in Glossary
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900">
          <Newspaper className="h-5 w-5 text-sky-600" />
          <h2 className="mt-3 font-semibold">Curated Coverage</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">We prioritize high-impact stories and clear summaries over headline spam.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          <h2 className="mt-3 font-semibold">Real-Time Signals</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Ticker snapshots and trending lists help you identify momentum quickly.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900">
          <BookOpen className="h-5 w-5 text-violet-600" />
          <h2 className="mt-3 font-semibold">Built-In Learning</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Glossary terms keep articles accessible whether you are new or experienced.</p>
        </div>
      </section>
    </main>
  );
}
