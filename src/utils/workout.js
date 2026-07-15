function exerciseWeight(e) {
  const base = e.type === 'compound' ? 2 : 1;
  return e.favorite ? base + 1 : base;
}

function weightedSample(pool, count) {
  const result = [];
  const remaining = [...pool];

  for (let i = 0; i < Math.min(count, remaining.length); i++) {
    const totalWeight = remaining.reduce((sum, e) => sum + exerciseWeight(e), 0);
    let rand = Math.random() * totalWeight;

    let picked = remaining.length - 1;
    for (let j = 0; j < remaining.length; j++) {
      rand -= exerciseWeight(remaining[j]);
      if (rand <= 0) { picked = j; break; }
    }

    result.push(remaining[picked]);
    remaining.splice(picked, 1);
  }

  return result;
}

export function generateWorkout(group, exercisePool) {
  const pool = (g) => exercisePool.filter(e => e.group === g);

  if (group === 'full') {
    const upper = weightedSample(pool('upper'), 2);
    const lower = weightedSample(pool('lower'), 2);
    const stability = weightedSample(pool('stability'), 1);
    // Interleave: U L U L S
    return [upper[0], lower[0], upper[1], lower[1], stability[0]].filter(Boolean);
  }

  const counts = { upper: 4, lower: 4, stability: 6 };
  return weightedSample(pool(group), counts[group] ?? 6);
}

export function replaceExercise(exercise, currentWorkout, exercisePool) {
  const currentIds = new Set(currentWorkout.map(e => e.id));
  const pool = exercisePool.filter(e => e.group === exercise.group && !currentIds.has(e.id));

  if (pool.length === 0) {
    const fallback = exercisePool.filter(e => e.group === exercise.group && e.id !== exercise.id);
    return fallback.length > 0 ? weightedSample(fallback, 1)[0] : exercise;
  }

  return weightedSample(pool, 1)[0];
}
