import { useState } from 'react';
import {
  Box, AppBar, Toolbar, IconButton, Typography, Container,
  List, ListItem, ListItemText, Chip, Tooltip, Fab,
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GROUPS } from '../data/exercises';
import ExerciseFormDialog from './ExerciseFormDialog';

const ALL = 'all';

export default function ExerciseListPage({ exercises, onBack, onAdd, onEdit, onDelete }) {
  const [filter, setFilter] = useState(ALL);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const visible = exercises
    .filter(e => filter === ALL || e.group === filter)
    .sort((a, b) => a.name.localeCompare(b.name));

  const openCreate = () => { setEditTarget(null); setFormOpen(true); };
  const openEdit = (ex) => { setEditTarget(ex); setFormOpen(true); };

  const handleSave = (data) => {
    if (editTarget) {
      onEdit({ ...editTarget, ...data });
    } else {
      onAdd({ id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...data });
    }
    setFormOpen(false);
  };

  const confirmDelete = () => {
    onDelete(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: 10 }}>
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
            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>Exercises</Typography>
            <Typography variant="caption" color="text.secondary">{exercises.length} total</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          px: 2, py: 1.5,
          display: 'flex', gap: 1, overflowX: 'auto',
          borderBottom: '1px solid', borderColor: 'divider',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Chip
          label="All"
          onClick={() => setFilter(ALL)}
          variant={filter === ALL ? 'filled' : 'outlined'}
          sx={{ flexShrink: 0 }}
        />
        {Object.entries(GROUPS).map(([key, { label, color }]) => (
          <Chip
            key={key}
            label={label}
            onClick={() => setFilter(key)}
            variant={filter === key ? 'filled' : 'outlined'}
            sx={{
              flexShrink: 0,
              borderColor: color,
              color: filter === key ? '#000' : color,
              backgroundColor: filter === key ? color : 'transparent',
              '&:hover': { backgroundColor: filter === key ? color : `${color}18` },
            }}
          />
        ))}
      </Box>

      <Container maxWidth="sm" disableGutters>
        <List disablePadding>
          {visible.map((ex) => {
            const group = GROUPS[ex.group];
            return (
              <ListItem
                key={ex.id}
                divider
                secondaryAction={
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => openEdit(ex)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={() => setDeleteTarget(ex)} sx={{ color: 'error.main' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
              >
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <Typography variant="body1" fontWeight={500}>{ex.name}</Typography>
                      {ex.favorite && (
                        <FavoriteIcon sx={{ fontSize: 14, color: '#EF5350' }} />
                      )}
                    </Stack>
                  }
                  secondary={
                    <Stack direction="row" spacing={0.75} alignItems="center" mt={0.25}>
                      <Chip
                        label={group.label}
                        size="small"
                        sx={{
                          height: 18, fontSize: '0.65rem', fontWeight: 600,
                          backgroundColor: `${group.color}22`, color: group.color, borderRadius: '5px',
                        }}
                      />
                      {ex.type !== 'n/a' && (
                        <Typography variant="caption" color="text.disabled">
                          {ex.type === 'compound' ? 'Compound' : 'Isolation'}
                        </Typography>
                      )}
                    </Stack>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Container>

      <Fab color="primary" onClick={openCreate} sx={{ position: 'fixed', bottom: 24, right: 24 }}>
        <AddIcon />
      </Fab>

      <ExerciseFormDialog
        open={formOpen}
        exercise={editTarget}
        onSave={handleSave}
        onClose={() => setFormOpen(false)}
      />

      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>Delete exercise?</DialogTitle>
        <DialogContent>
          <Typography>
            Remove <strong>{deleteTarget?.name}</strong> from the exercise list? This can't be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setDeleteTarget(null)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
