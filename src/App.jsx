import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import GroupSelector from './components/GroupSelector';
import WorkoutView from './components/WorkoutView';
import ExerciseListPage from './components/ExerciseListPage';
import { DEFAULT_EXERCISES } from './data/exercises';
import { generateWorkout } from './utils/workout';

function migrate(ex) {
  // Migrate old weight:1|2|3 format to type + favorite
  if ('weight' in ex && !('type' in ex)) {
    return { ...ex, type: ex.weight >= 2 ? 'compound' : 'isolation', favorite: ex.weight >= 3, weight: undefined };
  }
  return ex;
}

function loadExercises() {
  try {
    const saved = localStorage.getItem('circuit-builder-exercises');
    return saved ? JSON.parse(saved).map(migrate) : DEFAULT_EXERCISES;
  } catch {
    return DEFAULT_EXERCISES;
  }
}

function saveExercises(exercises) {
  localStorage.setItem('circuit-builder-exercises', JSON.stringify(exercises));
}

export default function App() {
  const [exercises, setExercises] = useState(loadExercises);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [workout, setWorkout] = useState(null);
  const [view, setView] = useState('home'); // 'home' | 'workout' | 'exercises'

  const updateExercises = (next) => {
    setExercises(next);
    saveExercises(next);
  };

  const handleGenerate = () => {
    setWorkout(generateWorkout(selectedGroups, exercises));
    setView('workout');
  };

  const handleRegenerate = () => {
    setWorkout(generateWorkout(selectedGroups, exercises));
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
          selectedGroups={selectedGroups}
          exercises={exercises}
          onBack={() => setView('home')}
          onRegenerate={handleRegenerate}
          onUpdateWorkout={setWorkout}
          onEditExercise={(updated) => updateExercises(exercises.map(e => e.id === updated.id ? updated : e))}
        />
      )}
      {view === 'home' && (
        <GroupSelector
          selectedGroups={selectedGroups}
          onGroupsChange={setSelectedGroups}
          onGenerate={handleGenerate}
          onViewExercises={() => setView('exercises')}
        />
      )}
    </ThemeProvider>
  );
}
