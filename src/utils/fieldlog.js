import { createClient } from '@supabase/supabase-js';
import { GROUPS } from '../data/exercises';

const SUPABASE_URL = 'https://nbbooydgsrririeranjh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_j6z9LiQMoTIs62Ry9v6Rpw_zu1NnyEj';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Derive Field Log focus label from a single group key
export function deriveFocus(group) {
  return GROUPS[group]?.label ?? 'Full Body';
}

export async function logWorkout({ date, duration, focus, notes }) {
  const { error } = await supabase.from('entries').insert({
    type: 'strength',
    date,
    payload: { duration: String(duration), focus, notes },
  });
  if (error) throw error;
}
