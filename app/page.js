
"use client";

import { useState, useMemo } from "react";

const QUIZ_TITLE = "What Kind of Social Media Narcissist Are You?";
const TYPES = {
  Influencer: {
    name: "✨ The Influencer",
    desc:
      "You live for launch day. You post polished content, rally fans, and treat every caption like a press release. Everything is curated — and contagious.",
    emoji: "📸",
  },
  Oversharer: {
    name: "📣 The Oversharer",
    desc:
      "Your life is content. Feelings, food, fights — everything goes live. People are entertained, confused, and oddly comforted.",
    emoji: "📝",
  },
  Performer: {
    name: "🎭 The Performer",
    desc:
      "Everything you do is a scene. Hot takes, hot outfits, dramatic reveals — you exist to get reactions and the bigger the better.",
    emoji: "🔥",
  },
  Curator: {
    name: "🖼️ The Curator",
    desc:
      "You present a mood. Aesthetic boards, thoughtful captions, perfect color palettes. You’re subtle, selective, and stylishly distant.",
    emoji: "🌙",
  },
  Lurker: {
    name: "👀 The Lurker",
    desc:
      "You collect receipts and reactions quietly. You watch, like, screenshot, and re-enter when it benefits you. Low-key, high impact.",
    emoji: "🕶️",
  },
};

const QUESTIONS = [
  {
    q: "You just had a mediocre day — what do you post?",
    a: [
      { t: "Oversharer", text: "Everything: feelings, playlist, receipts — the whole saga." },
      { t: "Influencer", text: "A soft, filtered photo + caption about growth." },
      { t: "Performer", text: "A dramatic rant in 30 seconds with a trending sound." },
      { t: "Curator", text: "A moody flatlay. Minimal text, big vibe." },
      { t: "Lurker", text: "Nothing public. Save some stories and quietly like people." },
    ],
  },
  {
    q: "Your bio says:",
    a: [
      { t: "Influencer", text: "Founder • Dreamer • Link in bio" },
      { t: "Oversharer", text: "Ask me anything — raw & real" },
      { t: "Performer", text: "Controversial takes, content daily" },
      { t: "Curator", text: "Collecting aesthetics + quiet thoughts" },
      { t: "Lurker", text: "Here for the receipts" },
    ],
  },
  {
    q: "You see someone copying your idea. You:",
    a: [
      { t: "Performer", text: "Call it out in a story with venom and flair." },
      { t: "Curator", text: "Subtweet politely and find another mood to elevate." },
      { t: "Influencer", text: "Turn it into a collab (or a teachable moment)." },
      { t: "Lurker", text: "Bookmark it and use it later, quietly." },
      { t: "Oversharer", text: "Make a long post about authenticity and tears." },
    ],
  },
  {
    q: "Your ideal Sunday morning looks like:",
    a: [
      { t: "Curator", text: "Soft light, a book, and a perfectly styled latte." },
      { t: "Oversharer", text: "Brunch with a 10-photo story update." },
      { t: "Influencer", text: "Photo shoot in the golden hour + content plan." },
      { t: "Lurker", text: "Scrolling, saving, ghosting." },
      { t: "Performer", text: "Getting into character for an outrageously fun clip." },
    ],
  },
  {
    q: "You get 500 likes in an hour. You:",
    a: [
      { t: "Influencer", text: "Schedule the next post to ride the wave." },
      { t: "Performer", text: "Drop something even bigger — escalate!" },
      { t: "Oversharer", text: "Write a thank-you essay and cry." },
      { t: "Curator", text: "Smirk and keep the aesthetic intact." },
      { t: "Lurker", text: "Check who liked and silently follow 5." },
    ],
  },
  {
    q: "If your presence had a tagline it would be:",
    a: [
      { t: "Performer", text: "\"More is more.\" " },
      { t: "Influencer", text: "\"Trust the process.\" " },
      { t: "Oversharer", text: "\"I feel things loudly.\" " },
      { t: "Curator", text: "\"Mood over everything.\" " },
      { t: "Lurker", text: "\"I saw that.\" " },
    ],
  },
];

export default function Page() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultType, setResultType] = useState(null);

  const total = QUESTIONS.length;
  const progress = useMemo(() => Math.round(((answers.length) / total) * 100), [answers.length, total]);

  function choose(type) {
    const next = [...answers, type];
    setAnswers(next);
    if (next.length >= total) {
      // compute winner
      const counts = next.reduce((acc, t) => {
        acc[t] = (acc[t] || 0) + 1;
        return acc;
      }, {});
      const sorted = Object.keys(counts).sort((a,b) => counts[b] - counts[a]);
      setResultType(sorted[0]);
    } else {
      setIndex(i => i + 1);
    }
  }

  function restart() {
    setIndex(0);
    setAnswers([]);
    setResultType(null);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl quiz-card rounded-2xl p-6">
        <header className="mb-4">
          <h1 className="quiz-title text-3xl font-extrabold">{QUIZ_TITLE}</h1>
          <p className="text-zinc-400 mt-2">Messy, dramatic, and for laughs — not a diagnosis.</p>
        </header>

        {/* progress */}
        <div className="mb-4">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-xs text-zinc-500 mt-2">{answers.length} of {total} answered</div>
        </div>

        {/* quiz content */}
        {!resultType ? (
          <>
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">{QUESTIONS[index].q}</h2>
              <div className="grid gap-3">
                {QUESTIONS[index].a.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => choose(opt.t)}
                    className="option-glow w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-700 hover:opacity-95 transition btn"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{opt.text}</div>
                        <div className="text-xs text-zinc-400 mt-1">— {opt.t}</div>
                      </div>
                      <div className="text-xs text-zinc-300">Choose</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  // skip: pick a random type for messiness
                  const types = Object.keys(TYPES);
                  const random = types[Math.floor(Math.random() * types.length)];
                  choose(random);
                }}
                className="text-sm text-zinc-400 underline btn-ghost btn"
              >
                Skip / Shuffle
              </button>

              <div className="text-sm text-zinc-500">{index + 1}/{total}</div>
            </div>
          </>
        ) : (
          <section className="text-center py-6">
            <div className="text-6xl mb-4">{TYPES[resultType].emoji}</div>
            <h2 className="text-2xl font-bold mb-2">{TYPES[resultType].name}</h2>
            <p className="text-zinc-300 max-w-xl mx-auto">{TYPES[resultType].desc}</p>

            <div className="mt-6 flex gap-3 justify-center">
              <button onClick={restart} className="px-5 py-3 rounded-full btn btn-ghost">Try again</button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I got ${TYPES[resultType].name} on "${QUIZ_TITLE}"!`)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-full btn btn-accent"
              >
                Share
              </a>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
