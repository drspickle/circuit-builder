import { useState } from 'react';
import {
  Box, Typography, Container, AppBar, Toolbar, IconButton, Stack,
  Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  List, ListItem, ListItemButton, ListItemText, Divider,
  Button, TextField, CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IosShareIcon from '@mui/icons-material/IosShare';
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
import { supabase, logWorkout, deriveFocus } from '../utils/fieldlog';

function localDateStr(d = new Date()) {
  const y = d.getFullYear(), m = d.getMonth() + 1, day = d.getDate();
  return `${y}-${m < 10 ? '0' : ''}${m}-${day < 10 ? '0' : ''}${day}`;
}

export default function WorkoutView({
  workout, selectedGroup, exercises, fieldLogUser,
  onBack, onRegenerate, onUpdateWorkout, onEditExercise,
}) {
  const [pickerIndex, setPickerIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [copied, setCopied] = useState(false);

  // Field Log log dialog
  const [logOpen, setLogOpen] = useState(false);
  const [logDuration, setLogDuration] = useState('');
  const [logFocus, setLogFocus] = useState('');
  const [logSaving, setLogSaving] = useState(false);
  const [logResult, setLogResult] = useState(null); // 'success' | 'error'

  // Field Log sign-in dialog
  const [authOpen, setAuthOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

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

  const openLogDialog = () => {
    if (!fieldLogUser) {
      setAuthError('');
      setAuthOpen(true);
      return;
    }
    setLogFocus(deriveFocus(selectedGroup));
    setLogDuration('');
    setLogResult(null);
    setLogOpen(true);
  };

  const handleSignIn = async () => {
    if (!authEmail || !authPassword) return;
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    setAuthLoading(false);
    if (error) {
      setAuthError(error.message || 'Sign-in failed.');
      return;
    }
    setAuthOpen(false);
    setAuthEmail('');
    setAuthPassword('');
    setTimeout(() => {
      setLogFocus(deriveFocus(selectedGroup));
      setLogDuration('');
      setLogResult(null);
      setLogOpen(true);
    }, 100);
  };

  const handleLog = async () => {
    if (!logDuration) return;
    setLogSaving(true);
    try {
      await logWorkout({
        date: localDateStr(),
        duration: logDuration,
        focus: logFocus,
        notes: workout.map(e => e.name).join(', '),
      });
      setLogResult('success');
    } catch {
      setLogResult('error');
    }
    setLogSaving(false);
  };

  const groupLabels = GROUPS[selectedGroup]?.label ?? '';
  const estMinutes = Math.round(workout.length * 6 / 5) * 5;

  const pickerGroup = pickerIndex !== null ? workout[pickerIndex].group : null;
  const pickerExercises = pickerGroup
    ? exercises.filter(e => e.group === pickerGroup).sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return (
    <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}
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
          <Tooltip title={fieldLogUser ? 'Log to Field Log' : 'Connect to Field Log'}>
            <IconButton onClick={openLogDialog} sx={{ color: fieldLogUser ? 'primary.main' : 'text.secondary' }}>
              <IosShareIcon />
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleCopy} sx={{ color: copied ? 'success.main' : 'text.secondary', transition: 'color 0.2s' }}>
            {copied ? <CheckIcon /> : <ContentCopyIcon />}
          </IconButton>
          <IconButton onClick={onRegenerate} sx={{ color: 'primary.main' }}>
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Container maxWidth="sm" sx={{ pt: 1.5, pb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {workout.length} exercises &nbsp;·&nbsp; ~{estMinutes} min &nbsp;·&nbsp; 3 × 12 each
          </Typography>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={workout.map(e => e.id)} strategy={verticalListSortingStrategy}>
              <Stack spacing={1}>
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
      </Box>

      {/* ── Field Log sign-in ─────────────────────────────────────────── */}
      <Dialog
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>Connect to Field Log</DialogTitle>
        <DialogContent sx={{ pt: '8px !important' }}>
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Sign in with your Field Log credentials to enable workout logging.
            </Typography>
            <TextField
              label="Email"
              type="email"
              value={authEmail}
              onChange={e => setAuthEmail(e.target.value)}
              fullWidth
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleSignIn()}
            />
            <TextField
              label="Password"
              type="password"
              value={authPassword}
              onChange={e => setAuthPassword(e.target.value)}
              fullWidth
              onKeyDown={e => e.key === 'Enter' && handleSignIn()}
              error={!!authError}
              helperText={authError || ' '}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setAuthOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleSignIn} variant="contained" disabled={authLoading || !authEmail || !authPassword}>
            {authLoading ? <CircularProgress size={20} /> : 'Sign In'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Log workout ───────────────────────────────────────────────── */}
      <Dialog
        open={logOpen}
        onClose={() => { if (!logSaving) setLogOpen(false); }}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>Log to Field Log</DialogTitle>
        <DialogContent sx={{ pt: '8px !important' }}>
          {logResult === 'success' ? (
            <Stack spacing={1} alignItems="center" py={2}>
              <CheckIcon sx={{ fontSize: 48, color: 'success.main' }} />
              <Typography fontWeight={600}>Logged!</Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Strength session saved to Field Log.
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={2.5}>
              <TextField
                label="Duration (minutes)"
                type="number"
                value={logDuration}
                onChange={e => setLogDuration(e.target.value)}
                inputProps={{ min: 1 }}
                fullWidth
                autoFocus
              />
              <TextField
                label="Focus"
                value={logFocus}
                onChange={e => setLogFocus(e.target.value)}
                fullWidth
                select
                SelectProps={{ native: true }}
              >
                <option value="Upper Body">Upper Body</option>
                <option value="Lower Body">Lower Body</option>
                <option value="Full Body">Full Body</option>
                <option value="Stability">Stability</option>
              </TextField>
              <TextField
                label="Exercises"
                value={workout.map(e => e.name).join(', ')}
                fullWidth
                multiline
                minRows={3}
                inputProps={{ readOnly: true }}
                sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem', color: 'text.secondary' } }}
              />
              {logResult === 'error' && (
                <Typography variant="body2" color="error.main">
                  Save failed — check your connection and try again.
                </Typography>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setLogOpen(false)} sx={{ color: 'text.secondary' }}>
            {logResult === 'success' ? 'Close' : 'Cancel'}
          </Button>
          {logResult !== 'success' && (
            <Button onClick={handleLog} variant="contained" disabled={!logDuration || logSaving}>
              {logSaving ? <CircularProgress size={20} /> : 'Log Session'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* ── Exercise edit dialog ──────────────────────────────────────── */}
      <ExerciseFormDialog
        open={editIndex !== null}
        exercise={editIndex !== null ? workout[editIndex] : null}
        onSave={handleEditSave}
        onClose={() => setEditIndex(null)}
      />

      {/* ── Exercise picker dialog ────────────────────────────────────── */}
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
