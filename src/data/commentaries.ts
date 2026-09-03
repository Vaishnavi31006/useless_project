import { Category, QuestionMode } from '../types/quiz';

export type SpeedTier = 'very_fast' | 'moderately_fast' | 'slow' | 'timeout';

export function getSpeedTier(timeTaken: number, isTimeout: boolean): SpeedTier {
  if (isTimeout || timeTaken >= 10) return 'timeout';
  if (timeTaken <= 2.0) return 'very_fast';
  if (timeTaken <= 5.0) return 'moderately_fast';
  return 'slow';
}

function pickRandom(arr: string[]): string {
  if (!arr || arr.length === 0) return "Noted.";
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

// ----------------------------------------------------
// FEED EXPOSURE COMMENTARIES
// ----------------------------------------------------
export const FEED_COMMENTARIES = {
  heavy: {
    very_fast: [
      "You didn't recognize it. Your brain autocompleted it.",
      "That was not recognition. That was muscle memory.",
      "Your algorithm has clearly been training you.",
      "Zero hesitation. This content has permanent residency in your subconscious."
    ],
    regular: [
      "Your feed has been doing its job with alarming consistency.",
      "Clean match. That content has definitely dominated your screen.",
      "Extensively absorbed. The timeline left a deep mark here.",
      "You've encountered this enough times to write an essay on it."
    ]
  },
  moderate: {
    fast: [
      "Okay, you've definitely seen this before.",
      "Your feed has been doing its job.",
      "A frequent visitor to your timeline.",
      "The algorithmic recommendation engine reached you."
    ],
    regular: [
      "You've scrolled past it a few times. Faint digital imprint.",
      "Moderate exposure verified. It didn't colonize your brain, but you know it.",
      "You recognized it from the casual scroll rotation.",
      "It showed up on your feed and you didn't swipe immediately."
    ]
  },
  slight: [
    "You've encountered the brainrot, but it hasn't fully colonized you.",
    "A faint echo in your algorithmic history.",
    "You scrolled past this once at 2 AM and forgot about it.",
    "Peripherally registered. Your defenses held up decently."
  ],
  zero: [
    "Congratulations. You found an uninfected corner of the internet.",
    "You have somehow avoided this.",
    "An unexplored region of the algorithm.",
    "Your feed has shielded you from this specific digital hazard."
  ],
  timeout: [
    "Zero exposure registered. Clock ran out while you pondered.",
    "Indecision in the feed. The timer took the wheel.",
    "Ten seconds passed without recognition. Brain buffered completely.",
    "Stalled at the algorithmic intersection."
  ]
};

// Category-flavored feed commentary supplements
export const CATEGORY_FEED_COMMENTARY: Record<Category, {
  heavy?: string[];
  zero?: string[];
}> = {
  memes: {
    heavy: [
      "This format has been drilled into your memory by endless reposts.",
      "You've seen this captioned in twelve different subreddits."
    ],
    zero: [
      "A meme that somehow never crossed your path. Pure fortune."
    ]
  },
  movies: {
    heavy: [
      "This film reference has been clipped to death on your timeline.",
      "The algorithm turned this entire movie into an unavoidable soundbyte for you."
    ],
    zero: [
      "Your cinema timeline remains uncorrupted by this hype cycle."
    ]
  },
  music: {
    heavy: [
      "This audio has soundtracked 400 TikToks on your For You page.",
      "Your brain heard that melody and instantly triggered an algorithmic reflex."
    ],
    zero: [
      "That track never made it onto your digital airwaves."
    ]
  },
  ai: {
    heavy: [
      "You've seen enough synthetic generations to spot this artifact immediately.",
      "The AI hype machine served this directly to your feed."
    ],
    zero: [
      "You managed to avoid this wave of generated content entirely."
    ]
  },
  slang: {
    heavy: [
      "That term is practically native dialect in your online circles.",
      "You've seen people use that word unironically for six months."
    ],
    zero: [
      "You dodged this linguistic trend cleanly. Dignity preserved."
    ]
  }
};

// ----------------------------------------------------
// RECOGNITION COMMENTARIES (Normal MCQ)
// ----------------------------------------------------
export const RECOGNITION_GENERIC = {
  correct: {
    very_fast: [
      "Suspiciously fast recognition. Your reflex arc is purely digital.",
      "Zero hesitation. You didn't even process the question, just pure instinct.",
      "That speed was almost unnatural. Concerning reflex test.",
      "You recognized that faster than light travels through glass fiber."
    ],
    moderately_fast: [
      "Solid timing. You know your way around the timeline.",
      "Clean answer. Brain working at acceptable broadband speeds.",
      "Prompt and accurate. The internet experience is showing.",
      "Smooth execution. Just enough consideration without overthinking."
    ],
    slow: [
      "The memory cached eventually.",
      "Your mental dial-up modem connected right before the wire cut.",
      "A bit sluggish, but the answer cleared customs.",
      "You took your sweet time, but a point is a point."
    ]
  },
  wrong: {
    very_fast: [
      "Incredible confidence for someone completely mistaken.",
      "Speedy and incorrect. A lethal combination.",
      "Fast and wrong. Impressive display of misplaced certainty.",
      "You smashed that button with unjustified boldness."
    ],
    regular: [
      "A miss. The digital archives will remember this.",
      "Not quite. That reference sailed cleanly over your head.",
      "Incorrect. The timeline has left you behind on this one.",
      "Wrong choice. Better luck on the next algorithmic rotation."
    ]
  },
  timeout: [
    "Time expired. Did you freeze or did the brain buffer?",
    "Ten seconds vanished into thin air. Complete mental stall.",
    "Zero points. Clock ticked down while you stared into the void.",
    "Static on the line. The timer claimed another victim."
  ]
};

export const RECOGNITION_CATEGORY: Record<Category, any> = {
  memes: {
    correct: {
      very_fast: [
        "I see you've spent an unwholesome amount of time online.",
        "That was suspiciously fast. The meme repository is deep.",
        "You didn't even hesitate. Concerning cultural literacy.",
        "Your feed has trained you with military precision."
      ],
      slow: [
        "The meme loaded eventually. The buffer was real.",
        "You've definitely seen this before... somewhere in 2021."
      ]
    },
    wrong: {
      very_fast: [
        "That confidence was completely unjustified.",
        "Speedy, decisive, and entirely wrong."
      ],
      regular: [
        "Meme literacy check: failed.",
        "Close, but that's not what the timeline canon says."
      ]
    }
  },
  movies: {
    correct: {
      very_fast: [
        "You didn't even need the context. How many times have you watched this clip?",
        "Direct hit. Cinema brainrot at peak performance."
      ],
      slow: [
        "Mental credits rolled for a few seconds before the title hit.",
        "A slow burn answer, but technically correct."
      ]
    },
    wrong: {
      very_fast: [
        "Wrong director, wrong movie, unmatched haste.",
        "Bold guess, totally incorrect cinematic universe."
      ],
      regular: [
        "Your cinema education has suffered noticeably.",
        "Close. The brainrot was simply not cinematic enough."
      ]
    }
  },
  music: {
    correct: {
      very_fast: [
        "You knew that before the track even reached the chorus.",
        "Instant soundbyte identification. The algorithm sings in your veins."
      ],
      slow: [
        "Took you half the verse to remember where you heard this.",
        "Buffering audio stream finally processed."
      ]
    },
    wrong: {
      very_fast: [
        "Hit the buzzer like a maestro, missed like a beginner.",
        "Swift answer, terrible rhythm. Completely wrong."
      ],
      regular: [
        "The algorithm clearly hasn't served you this track yet.",
        "Tone deaf on that reference."
      ]
    }
  },
  ai: {
    correct: {
      very_fast: [
        "You recognized that immediately. At this point, you spot synthetic hallucinations by instinct.",
        "Identified AI slop in under two seconds. That's a rare contemporary skill."
      ],
      slow: [
        "Stared at the uncanny pixels for a solid five seconds before deciding.",
        "You had to squint, but the hallucination gave itself away."
      ]
    },
    wrong: {
      very_fast: [
        "Fooled by a neural net at breakneck velocity.",
        "The machine outwitted you in 1.5 seconds flat."
      ],
      regular: [
        "Somehow the machine won this battle.",
        "You have not yet achieved machine-level brainrot detection."
      ]
    }
  },
  slang: {
    correct: {
      very_fast: [
        "You didn't learn that phrase. You absorbed it by osmosis.",
        "That vocabulary came out a little too naturally. Concerning."
      ],
      slow: [
        "Had to mentally translate that through three dictionaries, huh?",
        "The slang took a moment to register, but you caught on."
      ]
    },
    wrong: {
      very_fast: [
        "Fired off the wrong definition with zero hesitation.",
        "Confident misinterpretation. That word means something else entirely."
      ],
      regular: [
        "The internet has evolved faster than your lexicon.",
        "That term has officially passed you by."
      ]
    }
  }
};

/**
 * Unified commentary retrieval function.
 * Supports both 'feed' exposure questions and 'recognition' questions.
 * Categories remain strictly internal and are never exposed to the user.
 */
export function getCommentary(
  category: Category,
  mode: QuestionMode,
  params: {
    isCorrect?: boolean;
    exposureScore?: number;
    timeTaken: number;
    isTimeout?: boolean;
  }
): string {
  const { isCorrect = false, exposureScore = 0, timeTaken, isTimeout = false } = params;
  const speedTier = getSpeedTier(timeTaken, isTimeout);

  // 1. FEED QUESTION COMMENTARY
  if (mode === 'feed') {
    if (speedTier === 'timeout') {
      return pickRandom(FEED_COMMENTARIES.timeout);
    }

    if (exposureScore >= 70) {
      // Check category heavy supplement (50% chance if available)
      const catHeavy = CATEGORY_FEED_COMMENTARY[category]?.heavy;
      if (catHeavy && Math.random() < 0.4) {
        return pickRandom(catHeavy);
      }
      return speedTier === 'very_fast'
        ? pickRandom(FEED_COMMENTARIES.heavy.very_fast)
        : pickRandom(FEED_COMMENTARIES.heavy.regular);
    }

    if (exposureScore >= 40) {
      return (speedTier === 'very_fast' || speedTier === 'moderately_fast')
        ? pickRandom(FEED_COMMENTARIES.moderate.fast)
        : pickRandom(FEED_COMMENTARIES.moderate.regular);
    }

    if (exposureScore > 0) {
      return pickRandom(FEED_COMMENTARIES.slight);
    }

    // Zero exposure (never seen)
    const catZero = CATEGORY_FEED_COMMENTARY[category]?.zero;
    if (catZero && Math.random() < 0.4) {
      return pickRandom(catZero);
    }
    return pickRandom(FEED_COMMENTARIES.zero);
  }

  // 2. RECOGNITION QUESTION COMMENTARY
  if (speedTier === 'timeout') {
    return pickRandom(RECOGNITION_GENERIC.timeout);
  }

  const categoryPool = RECOGNITION_CATEGORY[category];

  if (isCorrect) {
    if (speedTier === 'very_fast' && categoryPool?.correct?.very_fast?.length && Math.random() < 0.6) {
      return pickRandom(categoryPool.correct.very_fast);
    }
    if (speedTier === 'slow' && categoryPool?.correct?.slow?.length && Math.random() < 0.5) {
      return pickRandom(categoryPool.correct.slow);
    }
    const genericTier = speedTier === 'slow' ? 'slow' : speedTier === 'moderately_fast' ? 'moderately_fast' : 'very_fast';
    return pickRandom(RECOGNITION_GENERIC.correct[genericTier]);
  } else {
    const wrongTier = speedTier === 'very_fast' ? 'very_fast' : 'regular';
    if (categoryPool?.wrong?.[wrongTier]?.length && Math.random() < 0.5) {
      return pickRandom(categoryPool.wrong[wrongTier]);
    }
    return pickRandom(RECOGNITION_GENERIC.wrong[wrongTier]);
  }
}
