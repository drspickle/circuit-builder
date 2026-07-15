export const SCHEMA_VERSION = 2;

export const GROUPS = {
  upper:     { label: 'Upper Body', subtitle: 'Push · Pull',    color: '#42A5F5' },
  lower:     { label: 'Lower Body', subtitle: 'Squat · Hinge',  color: '#EF5350' },
  full:      { label: 'Full Body',  subtitle: 'Compound moves', color: '#FFA726' },
  stability: { label: 'Stability',  subtitle: 'Core · Carries', color: '#66BB6A' },
};

// type: 'isolation' | 'compound' | 'n/a'
// favorite: true = weighted more heavily in generation
export const DEFAULT_EXERCISES = [
  // ── Upper Body – Push ────────────────────────────────────────────────
  { id: 'bench-press-barbell',    name: 'Bench Press (Barbell)',       group: 'upper', type: 'compound',  favorite: true  },
  { id: 'bench-press-incline',    name: 'Bench Press (Incline)',       group: 'upper', type: 'compound',  favorite: false },
  { id: 'bench-press-dumbbell',   name: 'Bench Press (Dumbbell)',      group: 'upper', type: 'compound',  favorite: false },
  { id: 'close-grip-bench',       name: 'Bench Press (Close-Grip)',    group: 'upper', type: 'compound',  favorite: false },
  { id: 'overhead-press',         name: 'Overhead Press',              group: 'upper', type: 'compound',  favorite: true  },
  { id: 'arnold-press',           name: 'Arnold Press',                group: 'upper', type: 'compound',  favorite: true  },
  { id: 'landmine-press',         name: 'Landmine Press',              group: 'upper', type: 'compound',  favorite: false },
  { id: 'dips-chest',             name: 'Dips (Chest)',                group: 'upper', type: 'compound',  favorite: false },
  { id: 'dips-tricep',            name: 'Dips (Tricep)',               group: 'upper', type: 'compound',  favorite: false },
  { id: 'fly-dumbbell',           name: 'Fly (Dumbbell)',              group: 'upper', type: 'isolation', favorite: true  },
  { id: 'pullover-dumbbell',      name: 'Pullover (Dumbbell)',         group: 'upper', type: 'compound',  favorite: false },

  // ── Upper Body – Pull ────────────────────────────────────────────────
  { id: 'pull-up',                name: 'Pull-Up',                     group: 'upper', type: 'compound',  favorite: true  },
  { id: 'lat-pulldown',           name: 'Lat Pulldown',                group: 'upper', type: 'compound',  favorite: true  },
  { id: 'row-barbell',            name: 'Row (Barbell)',               group: 'upper', type: 'compound',  favorite: false },
  { id: 'row-t-bar',              name: 'Row (T-Bar)',                 group: 'upper', type: 'compound',  favorite: false },
  { id: 'row-dumbbell',           name: 'Row (Dumbbell)',              group: 'upper', type: 'compound',  favorite: false },
  { id: 'face-pull',              name: 'Face Pull',                   group: 'upper', type: 'compound',  favorite: false },

  // ── Upper Body – Shoulders (isolation) ──────────────────────────────
  { id: 'lateral-raise',          name: 'Lateral Raise',               group: 'upper', type: 'isolation', favorite: false },
  { id: 'front-raise',            name: 'Front Raise',                 group: 'upper', type: 'isolation', favorite: false },
  { id: 'upright-row',            name: 'Upright Row',                 group: 'upper', type: 'compound',  favorite: false },

  // ── Upper Body – Arms ────────────────────────────────────────────────
  { id: 'curl-barbell',           name: 'Curl (Barbell)',              group: 'upper', type: 'isolation', favorite: true  },
  { id: 'curl-dumbbell',          name: 'Curl (Dumbbell)',             group: 'upper', type: 'isolation', favorite: false },
  { id: 'curl-incline-db',        name: 'Curl (Incline Dumbbell)',     group: 'upper', type: 'isolation', favorite: false },
  { id: 'curl-preacher',          name: 'Curl (Preacher)',             group: 'upper', type: 'isolation', favorite: false },
  { id: 'hammer-curl',            name: 'Hammer Curl',                 group: 'upper', type: 'isolation', favorite: false },
  { id: 'skull-crushers',         name: 'Skull Crushers',              group: 'upper', type: 'isolation', favorite: true  },
  { id: 'tricep-ext-overhead',    name: 'Tricep Extension (Overhead)', group: 'upper', type: 'isolation', favorite: false },
  { id: 'tricep-pushdown',        name: 'Tricep Pushdown',             group: 'upper', type: 'isolation', favorite: false },

  // ── Lower Body – Knee dominant ───────────────────────────────────────
  { id: 'squat-back',             name: 'Squat (Back)',                group: 'lower', type: 'compound',  favorite: true  },
  { id: 'squat-goblet',           name: 'Squat (Goblet)',              group: 'lower', type: 'compound',  favorite: false },
  { id: 'split-squat-bulgarian',  name: 'Split Squat (Bulgarian)',     group: 'lower', type: 'compound',  favorite: false },
  { id: 'lunge',                  name: 'Lunge',                       group: 'lower', type: 'compound',  favorite: false },
  { id: 'leg-press',              name: 'Leg Press',                   group: 'lower', type: 'compound',  favorite: false },
  { id: 'leg-extension',          name: 'Leg Extension',               group: 'lower', type: 'isolation', favorite: false },
  { id: 'calf-raise',             name: 'Calf Raise',                  group: 'lower', type: 'isolation', favorite: false },

  // ── Lower Body – Hip hinge + lower back ─────────────────────────────
  { id: 'deadlift',               name: 'Deadlift',                    group: 'lower', type: 'compound',  favorite: true  },
  { id: 'romanian-deadlift',      name: 'Romanian Deadlift',           group: 'lower', type: 'compound',  favorite: true  },
  { id: 'rack-pull',              name: 'Rack Pull',                   group: 'lower', type: 'compound',  favorite: false },
  { id: 'good-morning',           name: 'Good Morning',                group: 'lower', type: 'compound',  favorite: false },
  { id: 'hip-thrust',             name: 'Hip Thrust',                  group: 'lower', type: 'compound',  favorite: true  },
  { id: 'glute-bridge',           name: 'Glute Bridge',                group: 'lower', type: 'compound',  favorite: false },
  { id: 'back-extensions',        name: 'Back Extensions',             group: 'lower', type: 'isolation', favorite: true  },

  // ── Full Body ─────────────────────────────────────────────────────────
  { id: 'kettlebell-swing',       name: 'Kettlebell Swing',            group: 'full',  type: 'compound',  favorite: true  },
  { id: 'turkish-get-up',         name: 'Turkish Get-Up',              group: 'full',  type: 'compound',  favorite: false },
  { id: 'clean-barbell',          name: 'Clean (Barbell)',             group: 'full',  type: 'compound',  favorite: false },
  { id: 'thruster',               name: 'Thruster',                    group: 'full',  type: 'compound',  favorite: false },
  { id: 'snatch-barbell',         name: 'Snatch (Barbell)',            group: 'full',  type: 'compound',  favorite: false },
  { id: 'power-clean',            name: 'Power Clean',                 group: 'full',  type: 'compound',  favorite: false },

  // ── Stability – Carries ───────────────────────────────────────────────
  { id: 'farmers-carry',          name: "Farmer's Carry",              group: 'stability', type: 'compound',  favorite: true  },
  { id: 'suitcase-carry',         name: 'Suitcase Carry',              group: 'stability', type: 'compound',  favorite: false },
  { id: 'overhead-carry',         name: 'Overhead Carry',              group: 'stability', type: 'compound',  favorite: false },

  // ── Stability – Balance + anti-rotation ──────────────────────────────
  { id: 'step-up',                name: 'Step Up',                     group: 'stability', type: 'compound',  favorite: false },
  { id: 'pallof-press',           name: 'Pallof Press',                group: 'stability', type: 'compound',  favorite: false },

  // ── Stability – Core ─────────────────────────────────────────────────
  { id: 'dead-bug',               name: 'Dead Bug',                    group: 'stability', type: 'n/a',       favorite: false },
  { id: 'plank',                  name: 'Plank',                       group: 'stability', type: 'n/a',       favorite: false },
  { id: 'side-plank',             name: 'Side Plank',                  group: 'stability', type: 'n/a',       favorite: false },
  { id: 'ab-wheel-rollout',       name: 'Ab Wheel Rollout',            group: 'stability', type: 'n/a',       favorite: false },
  { id: 'leg-raise-weighted',     name: 'Leg Raise (Weighted)',        group: 'stability', type: 'n/a',       favorite: true  },
  { id: 'russian-twist',          name: 'Russian Twist',               group: 'stability', type: 'n/a',       favorite: false },
];
