import { Category, QuestionMode } from '../types/quiz';

function pickRandom(arr: string[]): string {
  if (!arr || arr.length === 0) return "Noted.";
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

// ----------------------------------------------------
// FEED EXPOSURE COMMENTARIES
// ----------------------------------------------------
export const FEED_COMMENTARIES = {
  heavy: [
    "Okay, you've definitely seen this before.",
    "You didn't find this. Your feed delivered it to you personally.",
    "Your algorithm has clearly been training you.",
    "Clean match. That content definitely reached your screen.",
    "That was not recognition. That was muscle memory.",
    "Extensively absorbed. The timeline left a deep mark here."
  ],
  moderate: [
    "Your feed has been doing its job.",
    "A frequent visitor to your timeline.",
    "You've scrolled past it a few times. Faint digital imprint.",
    "Moderate exposure verified. It didn't colonize your brain, but you know it."
  ],
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
      "You've seen this captioned across half the internet."
    ],
    zero: [
      "A meme that somehow never crossed your path. Pure fortune."
    ]
  },
  movies: {
    heavy: [
      "This film reference has been clipped to death on your timeline.",
      "The algorithm turned this entire scene into an unavoidable reference."
    ],
    zero: [
      "Your cinema timeline remains uncorrupted by this hype cycle."
    ]
  },
  music: {
    heavy: [
      "This audio has soundtracked countless videos on your feed.",
      "Your brain heard that soundbyte and immediately knew."
    ],
    zero: [
      "That audio snippet never made it onto your digital radar."
    ]
  },
  ai: {
    heavy: [
      "You've seen enough synthetic generations to recognize this immediately.",
      "The AI recommendation pipeline served this directly to you."
    ],
    zero: [
      "You managed to avoid this wave of generated content entirely."
    ]
  },
  slang: {
    heavy: [
      "That term is practically native dialect in your online circles.",
      "You've seen people use that word unironically for months."
    ],
    zero: [
      "You dodged this linguistic trend cleanly. Dignity preserved."
    ]
  }
};

// ----------------------------------------------------
// RECOGNITION COMMENTARIES (MCQ)
// ----------------------------------------------------
export const RECOGNITION_GENERIC = {
  correct: [
    "That was not recognition. That was muscle memory.",
    "You didn't recognize it. Your brain autocompleted it.",
    "Your algorithm has clearly been training you.",
    "Solid recall. The internet experience is showing.",
    "Clean answer. Brain working at high broadband speeds.",
    "Spot-on. The reference came back to you effortlessly."
  ],
  wrong: [
    "That confidence was completely unjustified.",
    "Fast AND wrong. Impressive display of misplaced certainty.",
    "You answered that with incredible confidence for someone who was incorrect.",
    "A miss. The digital archives will remember this.",
    "Not quite. That reference sailed cleanly over your head.",
    "Incorrect. The timeline has left you behind on this one."
  ]
};

export const RECOGNITION_CATEGORY: Record<Category, {
  correct?: string[];
  wrong?: string[];
}> = {
  memes: {
    correct: [
      "I see you've spent an unwholesome amount of time online.",
      "Concerning cultural literacy. Your meme radar is sharp."
    ],
    wrong: [
      "That confidence was completely unjustified.",
      "Meme literacy check: failed."
    ]
  },
  movies: {
    correct: [
      "You didn't even need the context. Cinema brainrot at peak performance.",
      "Letterboxd would nod in quiet approval."
    ],
    wrong: [
      "Wrong director, wrong movie, unmatched certainty.",
      "Your cinema education has suffered noticeably."
    ]
  },
  music: {
    correct: [
      "Soundbyte identified. The algorithm sings in your veins.",
      "Your ears have been properly internet-trained."
    ],
    wrong: [
      "Tone deaf on that reference.",
      "The algorithm clearly hasn't served you this track yet."
    ]
  },
  ai: {
    correct: [
      "Identified immediately. You spot synthetic hallucinations by instinct.",
      "Your brain has been exposed to hazardous amounts of generated media."
    ],
    wrong: [
      "Fooled by a neural net.",
      "Somehow the machine won this battle."
    ]
  },
  slang: {
    correct: [
      "You didn't learn that phrase. You absorbed it by osmosis.",
      "That vocabulary came out a little too naturally. Concerning."
    ],
    wrong: [
      "The internet has evolved faster than your lexicon.",
      "That term has officially passed you by."
    ]
  }
};

/**
 * Unified commentary retrieval function.
 * Supports both 'feed' exposure questions and 'recognition' questions without any timer dependence.
 * Categories remain strictly internal and are never exposed to the user.
 */
export function getCommentary(
  category: Category,
  mode: QuestionMode,
  params: {
    isCorrect?: boolean;
    exposureScore?: number;
  }
): string {
  const { isCorrect = false, exposureScore = 0 } = params;

  // 1. FEED QUESTION COMMENTARY
  if (mode === 'feed') {
    if (exposureScore >= 70) {
      const catHeavy = CATEGORY_FEED_COMMENTARY[category]?.heavy;
      if (catHeavy && Math.random() < 0.4) {
        return pickRandom(catHeavy);
      }
      return pickRandom(FEED_COMMENTARIES.heavy);
    }

    if (exposureScore >= 40) {
      return pickRandom(FEED_COMMENTARIES.moderate);
    }

    if (exposureScore > 0) {
      return pickRandom(FEED_COMMENTARIES.slight);
    }

    const catZero = CATEGORY_FEED_COMMENTARY[category]?.zero;
    if (catZero && Math.random() < 0.4) {
      return pickRandom(catZero);
    }
    return pickRandom(FEED_COMMENTARIES.zero);
  }

  // 2. RECOGNITION QUESTION COMMENTARY
  const categoryPool = RECOGNITION_CATEGORY[category];

  if (isCorrect) {
    if (categoryPool?.correct?.length && Math.random() < 0.5) {
      return pickRandom(categoryPool.correct);
    }
    return pickRandom(RECOGNITION_GENERIC.correct);
  } else {
    if (categoryPool?.wrong?.length && Math.random() < 0.5) {
      return pickRandom(categoryPool.wrong);
    }
    return pickRandom(RECOGNITION_GENERIC.wrong);
  }
}
