import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Select, MenuItem, FormControl,
  InputLabel, ToggleButtonGroup, ToggleButton,
  Typography, Stack, FormControlLabel, Checkbox,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { GROUPS } from '../data/exercises';

const EMPTY = { name: '', group: '', type: 'compound', favorite: false };

export default function ExerciseFormDialog({ open, exercise, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(exercise
      ? { name: exercise.name, group: exercise.group, type: exercise.type, favorite: exercise.favorite }
      : EMPTY
    );
    setErrors({});
  }, [exercise, open]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.group) e.group = 'Group is required';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ name: form.name.trim(), group: form.group, type: form.type, favorite: form.favorite });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle fontWeight={700}>
        {exercise ? 'Edit Exercise' : 'New Exercise'}
      </DialogTitle>

      <DialogContent sx={{ pt: '8px !important' }}>
        <Stack spacing={3}>
          <TextField
            label="Exercise name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            autoFocus
          />

          <FormControl fullWidth error={!!errors.group}>
            <InputLabel>Muscle group</InputLabel>
            <Select
              value={form.group}
              label="Muscle group"
              onChange={e => {
                const g = e.target.value;
                setForm(f => ({
                  ...f,
                  group: g,
                  type: g === 'core' ? 'n/a' : (f.type === 'n/a' ? 'compound' : f.type),
                }));
              }}
            >
              {Object.entries(GROUPS).map(([key, { label }]) => (
                <MenuItem key={key} value={key}>{label}</MenuItem>
              ))}
            </Select>
            {errors.group && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                {errors.group}
              </Typography>
            )}
          </FormControl>

          {form.group !== 'core' && (
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">Type</Typography>
              <ToggleButtonGroup
                value={form.type}
                exclusive
                onChange={(_, v) => { if (v !== null) setForm(f => ({ ...f, type: v })); }}
                fullWidth
                size="small"
              >
                <ToggleButton value="isolation" sx={{ textTransform: 'none' }}>Isolation</ToggleButton>
                <ToggleButton value="compound" sx={{ textTransform: 'none' }}>Compound</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={form.favorite}
                onChange={e => setForm(f => ({ ...f, favorite: e.target.checked }))}
                icon={<FavoriteBorderIcon />}
                checkedIcon={<FavoriteIcon sx={{ color: '#EF5350' }} />}
              />
            }
            label={
              <Stack>
                <Typography variant="body2">Favorite</Typography>
                <Typography variant="caption" color="text.secondary">
                  Favorites appear more often when generating workouts.
                </Typography>
              </Stack>
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
