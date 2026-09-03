import { VerdictTier } from '../types/quiz';

export const VERDICT_TIERS: VerdictTier[] = [
  {
    min: 0,
    max: 20,
    title: "Freshly Grass-Touched",
    tagline: "Biological organism with minimal digital corruption",
    roasts: [
      "Congratulations. You actually have a life and your circadian rhythm is intact.",
      "Your dopamine receptors are completely pristine. We are slightly suspicious of you.",
      "You probably drink water, go outside, and don't know who cooked.",
      "Your screen time report doesn't make your battery cry. Impressive innocence."
    ],
    color: "#10b981", // Emerald
    badgeBg: "rgba(16, 185, 129, 0.15)",
    meterColor: "#34d399",
  },
  {
    min: 21,
    max: 40,
    title: "Mildly Online",
    tagline: "Casual spectator standing safely near the internet edge",
    roasts: [
      "You know enough to get the joke at dinner, but not enough to explain the lore.",
      "You check the feed once or twice, laugh politely, and put the phone face down. Healthy.",
      "Your algorithmic fingerprint is still faintly human.",
      "You recognize memes after they've already peaked and cooled off."
    ],
    color: "#06b6d4", // Cyan
    badgeBg: "rgba(6, 182, 212, 0.15)",
    meterColor: "#22d3ee",
  },
  {
    min: 41,
    max: 60,
    title: "Chronically Scrolling",
    tagline: "Regular citizen of the algorithmic conveyor belt",
    roasts: [
      "You opened your phone for two minutes and lost forty-five. It's a lifestyle.",
      "You know the audio before the video even starts. The conditioning is working.",
      "Half your vocabulary originated on a forum you don't even remember visiting.",
      "Your thumb has developed specialized muscle memory for rapid swipe motions."
    ],
    color: "#8b5cf6", // Violet
    badgeBg: "rgba(139, 92, 246, 0.15)",
    meterColor: "#a78bfa",
  },
  {
    min: 61,
    max: 80,
    title: "Brainrot Certified",
    tagline: "Official diploma holder in advanced internet subculture",
    roasts: [
      "Your brain processes compressed JPGs faster than real-world emotional cues.",
      "You've watched enough niche video essays to write an unaccredited thesis.",
      "At this level of exposure, your thoughts have their own ambient background music.",
      "You don't just consume the timeline; you reside comfortably inside its framework."
    ],
    color: "#f59e0b", // Amber
    badgeBg: "rgba(245, 158, 11, 0.15)",
    meterColor: "#fbbf24",
  },
  {
    min: 81,
    max: 95,
    title: "Terminally Online",
    tagline: "Your nervous system has merged with optical fiber",
    roasts: [
      "You've seen things the rest of society won't understand for another two business years.",
      "The algorithm doesn't recommend content to you; it consults you first.",
      "You recognized those audio cues with unnatural speed. Please look at a tree.",
      "Your thought process is approximately 84% reaction gifs and hyper-specific cultural references."
    ],
    color: "#f43f5e", // Rose
    badgeBg: "rgba(244, 63, 94, 0.15)",
    meterColor: "#fb7185",
  },
  {
    min: 96,
    max: 100,
    title: "Beyond Saving",
    tagline: "Pure silicon consciousness, irreversible digital singularity",
    roasts: [
      "There is no brain left. Just an endlessly buffering TikTok feed trapped inside a skull.",
      "You recognized every single reference before the neurons even fired. Uncanny.",
      "Medical science cannot explain how someone absorbs this much niche content and survives.",
      "The internet has officially declared you as its primary resident."
    ],
    color: "#e11d48", // Crimson Red
    badgeBg: "rgba(225, 29, 72, 0.2)",
    meterColor: "#f43f5e",
  }
];

export function getVerdict(percentage: number) {
  const rounded = Math.round(percentage);
  const tier = VERDICT_TIERS.find(t => rounded >= t.min && rounded <= t.max) || VERDICT_TIERS[VERDICT_TIERS.length - 1];
  
  // Randomly select one roast from the tier
  const roastIndex = Math.floor(Math.random() * tier.roasts.length);
  const roast = tier.roasts[roastIndex];

  return {
    ...tier,
    roast,
  };
}
