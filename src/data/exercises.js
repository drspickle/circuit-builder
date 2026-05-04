export const GROUPS = {
  arms:      { label: 'Arms',      color: '#FF9800' },
  shoulders: { label: 'Shoulders', color: '#EF5350' },
  chest:     { label: 'Chest',     color: '#FFCA28' },
  core:      { label: 'Core',      color: '#42A5F5' },
  back:      { label: 'Back',      color: '#66BB6A' },
  legs:      { label: 'Legs',      color: '#AB47BC' },
};

// type: 'isolation' | 'compound' | 'n/a' (core exercises)
// favorite: true = weighted more heavily in generation
export const DEFAULT_EXERCISES = [
  // Arms
  { id: 'curl-barbell',        name: 'Curl (Barbell)',               group: 'arms',      type: 'isolation', favorite: true  },
  { id: 'curl-dumbbell',       name: 'Curl (Dumbbell)',              group: 'arms',      type: 'isolation', favorite: false },
  { id: 'curl-incline-db',     name: 'Curl (Incline Dumbbell)',      group: 'arms',      type: 'isolation', favorite: false },
  { id: 'curl-preacher',       name: 'Curl (Preacher)',              group: 'arms',      type: 'isolation', favorite: false },
  { id: 'hammer-curl',         name: 'Hammer Curl',                  group: 'arms',      type: 'isolation', favorite: false },
  { id: 'close-grip-bench',    name: 'Bench Press (Close-Grip)',     group: 'arms',      type: 'compound',  favorite: false },
  { id: 'skull-crushers',      name: 'Skull Crushers',               group: 'arms',      type: 'isolation', favorite: true  },
  { id: 'tricep-ext-overhead', name: 'Tricep Extension (Overhead)',  group: 'arms',      type: 'isolation', favorite: false },
  { id: 'dips-tricep',         name: 'Dips (Tricep)',                group: 'arms',      type: 'compound',  favorite: false },

  // Shoulders
  { id: 'overhead-press',      name: 'Overhead Press',               group: 'shoulders', type: 'compound',  favorite: true  },
  { id: 'arnold-press',        name: 'Arnold Press',                 group: 'shoulders', type: 'compound',  favorite: true  },
  { id: 'lateral-raise',       name: 'Lateral Raise',                group: 'shoulders', type: 'isolation', favorite: false },
  { id: 'front-raise',         name: 'Front Raise',                  group: 'shoulders', type: 'isolation', favorite: false },
  { id: 'face-pull',           name: 'Face Pull',                    group: 'shoulders', type: 'compound',  favorite: false },
  { id: 'upright-row',         name: 'Upright Row',                  group: 'shoulders', type: 'compound',  favorite: false },
  { id: 'landmine-press',      name: 'Landmine Press',               group: 'shoulders', type: 'compound',  favorite: false },

  // Chest
  { id: 'bench-press-barbell', name: 'Bench Press (Barbell)',        group: 'chest',     type: 'compound',  favorite: true  },
  { id: 'bench-press-incline', name: 'Bench Press (Incline)',        group: 'chest',     type: 'compound',  favorite: false },
  { id: 'bench-press-dumbbell',name: 'Bench Press (Dumbbell)',       group: 'chest',     type: 'compound',  favorite: false },
  { id: 'dips-chest',          name: 'Dips (Chest)',                 group: 'chest',     type: 'compound',  favorite: false },
  { id: 'fly-dumbbell',        name: 'Fly (Dumbbell)',               group: 'chest',     type: 'isolation', favorite: true  },
  { id: 'pullover-dumbbell',   name: 'Pullover (Dumbbell)',          group: 'chest',     type: 'compound',  favorite: false },

  // Core (type is always 'n/a')
  { id: 'ab-wheel-rollout',    name: 'Ab Wheel Rollout',             group: 'core',      type: 'n/a',       favorite: false },
  { id: 'dead-bug',            name: 'Dead Bug',                     group: 'core',      type: 'n/a',       favorite: false },
  { id: 'leg-raise-weighted',  name: 'Leg Raise (Weighted)',         group: 'core',      type: 'n/a',       favorite: true  },
  { id: 'pallof-press',        name: 'Pallof Press',                 group: 'core',      type: 'n/a',       favorite: false },
  { id: 'crunches',            name: 'Crunches',                     group: 'core',      type: 'n/a',       favorite: true  },
  { id: 'plank',               name: 'Plank',                        group: 'core',      type: 'n/a',       favorite: false },
  { id: 'russian-twist',       name: 'Russian Twist',                group: 'core',      type: 'n/a',       favorite: false },

  // Back
  { id: 'deadlift',            name: 'Deadlift',                     group: 'back',      type: 'compound',  favorite: true  },
  { id: 'pull-up',             name: 'Pull-Up',                      group: 'back',      type: 'compound',  favorite: true  },
  { id: 'rack-pull',           name: 'Rack Pull',                    group: 'back',      type: 'compound',  favorite: false },
  { id: 'row-barbell',         name: 'Row (Barbell)',                group: 'back',      type: 'compound',  favorite: false },
  { id: 'back-extensions',     name: 'Back Extensions',              group: 'back',      type: 'isolation', favorite: true  },
  { id: 'row-t-bar',           name: 'Row (T-Bar)',                  group: 'back',      type: 'compound',  favorite: false },

  // Legs
  { id: 'calf-raise',          name: 'Calf Raise',                   group: 'legs',      type: 'isolation', favorite: false },
  { id: 'romanian-deadlift',   name: 'Romanian Deadlift',            group: 'legs',      type: 'compound',  favorite: true  },
  { id: 'leg-extension',       name: 'Leg Extension',                group: 'legs',      type: 'isolation', favorite: false },
  { id: 'leg-press',           name: 'Leg Press',                    group: 'legs',      type: 'compound',  favorite: false },
  { id: 'lunge',               name: 'Lunge',                        group: 'legs',      type: 'compound',  favorite: false },
  { id: 'squat-back',          name: 'Squat (Back)',                  group: 'legs',      type: 'compound',  favorite: true  },
  { id: 'split-squat-bulgarian',name: 'Split Squat (Bulgarian)',     group: 'legs',      type: 'compound',  favorite: false },
];
