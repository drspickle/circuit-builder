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

function distributeCount(total, n) {
  const base = Math.floor(total / n);
  const remainder = total % n;
  const dist = Array(n).fill(base);
  for (let i = 0; i < remainder; i++) dist[i]++;
  for (let i = dist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dist[i], dist[j]] = [dist[j], dist[i]];
  }
  return dist;
}

export function generateWorkout(selectedGroups, exercisePool) {
  const total = selectedGroups.length === 1 ? 4 : 5;
  const distribution = distributeCount(total, selectedGroups.length);

  const buckets = selectedGroups
    .map((group, i) => {
      const pool = exercisePool.filter(e => e.group === group);
      return weightedSample(pool, distribution[i]);
    })
    .sort((a, b) => b.length - a.length);

  const result = [];
  const maxLen = Math.max(...buckets.map(b => b.length));
  for (let i = 0; i < maxLen; i++) {
    for (const bucket of buckets) {
      if (i < bucket.length) result.push(bucket[i]);
    }
  }
  return result;
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
