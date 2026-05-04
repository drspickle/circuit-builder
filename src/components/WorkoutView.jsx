import { useState } from 'react';
import {
  Box, Typography, Container, AppBar, Toolbar, IconButton, Stack,
  Tooltip, Dialog, DialogTitle, DialogContent, List, ListItem,
  ListItemButton, ListItemText, Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
  SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove,
} from '@dnd-kit/sortable';
import ExerciseCard from './ExerciseCard';
import ExerciseFormDialog from './ExerciseFormDialog';
import { replaceExercise } from '../utils/workout';
import { GROUPS } from '../data/exercises';

export default function WorkoutView({ workout, selectedGroups, exercises, onBack, onRegenerate, onUpdateWorkout, onEditExercise }) {
  const [pickerIndex, setPickerIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(workout.map(e => e.name).join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditSave = (data) => {
    const updated = { ...workout[editIndex], ...data };
    onEditExercise(updated);
    const next = [...workout];
    next[editIndex] = updated;
    onUpdateWorkout(next);
    setEditIndex(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = workout.findIndex(e => e.id === active.id);
    const newIndex = workout.findIndex(e => e.id === over.id);
    onUpdateWorkout(arrayMove(workout, oldIndex, newIndex));
  };

  const replace = (i) => {
    const replacement = replaceExercise(workout[i], workout, exercises);
    if (replacement.id === workout[i].id) return;
    const next = [...workout];
    next[i] = replacement;
    onUpdateWorkout(next);
  };

  const pickSpecific = (exercise) => {
    const next = [...workout];
    next[pickerIndex] = exercise;
    onUpdateWorkout(next);
    setPickerIndex(null);
  };

  const groupLabels = selectedGroups.map(g => GROUPS[g].label).join(' · ');
  const estMinutes = Math.round(workout.length * 6 / 5) * 5;

  const pickerGroup = pickerIndex !== null ? workout[pickerIndex].group : null;
  const pickerExercises = pickerGroup
    ? exercises.filter(e => e.group === pickerGroup).sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={onBack} sx={{ mr: 1.5 }}>
            <ArrowBackIcon />
          </IconButton>
          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
              Today's Circuit
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {groupLabels}
            </Typography>
          </Box>
          <IconButton onClick={handleCopy} sx={{ color: copied ? 'success.main' : 'text.secondary', transition: 'color 0.2s' }}>
            {copied ? <CheckIcon /> : <ContentCopyIcon />}
          </IconButton>
          <IconButton onClick={onRegenerate} sx={{ color: 'primary.main' }}>
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ pt: 3, pb: 5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          {workout.length} exercises &nbsp;·&nbsp; ~{estMinutes} min &nbsp;·&nbsp; 3 × 12 each
        </Typography>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={workout.map(e => e.id)} strategy={verticalListSortingStrategy}>
            <Stack spacing={1.5}>
              {workout.map((exercise, i) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onReplace={() => replace(i)}
                  onPickSpecific={() => setPickerIndex(i)}
                  onEdit={() => setEditIndex(i)}
                />
              ))}
            </Stack>
          </SortableContext>
        </DndContext>

      </Container>

      <ExerciseFormDialog
        open={editIndex !== null}
        exercise={editIndex !== null ? workout[editIndex] : null}
        onSave={handleEditSave}
        onClose={() => setEditIndex(null)}
      />

      <Dialog
        open={pickerIndex !== null}
        onClose={() => setPickerIndex(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>Choose an exercise</Typography>
          {pickerGroup && (
            <Typography variant="caption" color="text.secondary">
              {GROUPS[pickerGroup].label} · same group only
            </Typography>
          )}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 0 }}>
          <List disablePadding>
            {pickerExercises.map((e) => {
              const isCurrent = pickerIndex !== null && e.id === workout[pickerIndex]?.id;
              const isUsed = !isCurrent && workout.some(w => w.id === e.id);
              return (
                <ListItem
                  key={e.id}
                  disablePadding
                  secondaryAction={isCurrent ? <CheckIcon fontSize="small" color="primary" /> : null}
                >
                  <ListItemButton
                    disabled={isUsed}
                    onClick={() => pickSpecific(e)}
                    selected={isCurrent}
                    sx={{ pr: isCurrent ? 6 : 2 }}
                  >
                    <ListItemText
                      primary={e.name}
                      primaryTypographyProps={{ fontWeight: isCurrent ? 600 : 400 }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
