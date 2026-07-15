import { createClient } from '@supabase/supabase-js';
import { GROUPS } from '../data/exercises';

const SUPABASE_URL = 'https://nbbooydgsrririeranjh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_j6z9LiQMoTIs62Ry9v6Rpw_zu1NnyEj';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Derive Field Log focus label from selected group keys
export function deriveFocus(selectedGroups) {
  if (selectedGroups.length === 1) {
    return GROUPS[selectedGroups[0]].label; // 'Upper Body', 'Lower Body', etc.
  }
  return 'Full Body';
}

export async function logWorkout({ date, duration, focus, notes }) {
  const { error } = await supabase.from('entries').insert({
    type: 'strength',
    date,
    payload: { duration: String(duration), focus, notes },
  });
  if (error) throw error;
}
