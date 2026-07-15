import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import GroupSelector from './components/GroupSelector';
import WorkoutView from './components/WorkoutView';
import ExerciseListPage from './components/ExerciseListPage';
import { DEFAULT_EXERCISES, SCHEMA_VERSION } from './data/exercises';
import { generateWorkout } from './utils/workout';
import { supabase } from './utils/fieldlog';

const STORAGE_KEY = 'circuit-builder-exercises';
const VERSION_KEY = 'circuit-builder-schema-version';

function migrateExercise(ex) {
  // v1→v2: weight:1|2|3 → type + favorite
  if ('weight' in ex && !('type' in ex)) {
    return { ...ex, type: ex.weight >= 2 ? 'compound' : 'isolation', favorite: ex.weight >= 3, weight: undefined };
  }
  return ex;
}

function loadExercises() {
  try {
    const storedVersion = parseInt(localStorage.getItem(VERSION_KEY) || '1', 10);
    if (storedVersion < SCHEMA_VERSION) {
      // Groups changed entirely — reset to defaults and bump version
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(VERSION_KEY, String(SCHEMA_VERSION));
      return DEFAULT_EXERCISES;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).map(migrateExercise) : DEFAULT_EXERCISES;
  } catch {
    return DEFAULT_EXERCISES;
  }
}

function saveExercises(exercises) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
  localStorage.setItem(VERSION_KEY, String(SCHEMA_VERSION));
}

export default function App() {
  const [exercises, setExercises] = useState(loadExercises);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [workout, setWorkout] = useState(null);
  const [view, setView] = useState('home'); // 'home' | 'workout' | 'exercises'
  const [fieldLogUser, setFieldLogUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setFieldLogUser(data?.session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setFieldLogUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const updateExercises = (next) => {
    setExercises(next);
    saveExercises(next);
  };

  const handleGenerate = (group) => {
    setSelectedGroup(group);
    setWorkout(generateWorkout(group, exercises));
    setView('workout');
  };

  const handleRegenerate = () => {
    setWorkout(generateWorkout(selectedGroup, exercises));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {view === 'exercises' && (
        <ExerciseListPage
          exercises={exercises}
          onBack={() => setView('home')}
          onAdd={(ex) => updateExercises([...exercises, ex])}
          onEdit={(updated) => updateExercises(exercises.map(e => e.id === updated.id ? updated : e))}
          onDelete={(id) => updateExercises(exercises.filter(e => e.id !== id))}
        />
      )}
      {view === 'workout' && (
        <WorkoutView
          workout={workout}
          selectedGroup={selectedGroup}
          exercises={exercises}
          fieldLogUser={fieldLogUser}
          onBack={() => setView('home')}
          onRegenerate={handleRegenerate}
          onUpdateWorkout={setWorkout}
          onEditExercise={(updated) => updateExercises(exercises.map(e => e.id === updated.id ? updated : e))}
        />
      )}
      {view === 'home' && (
        <GroupSelector
          onGenerate={handleGenerate}
          onViewExercises={() => setView('exercises')}
        />
      )}
    </ThemeProvider>
  );
}
