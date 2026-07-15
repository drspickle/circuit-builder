import { Box, Typography, Button, AppBar, Toolbar, IconButton, Tooltip } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { GROUPS } from '../data/exercises';

export default function GroupSelector({ selectedGroups, onGroupsChange, onGenerate, onViewExercises }) {
  const toggle = (key) => {
    onGroupsChange(
      selectedGroups.includes(key)
        ? selectedGroups.filter(g => g !== key)
        : [...selectedGroups, key]
    );
  };

  return (
    <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: 'transparent', borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}
      >
        <Toolbar>
          <FitnessCenterIcon sx={{ fontSize: 24, color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>Circuit Builder</Typography>
          <Tooltip title="Manage exercises">
            <IconButton onClick={onViewExercises} sx={{ color: 'text.secondary' }}>
              <FormatListBulletedIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', px: 2, py: 2, gap: 1.5, minHeight: 0 }}>
        <Typography variant="body2" color="text.secondary">
          Select one or more training categories
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, flex: 1, minHeight: 0 }}>
          {Object.entries(GROUPS).map(([key, { label, subtitle, color }]) => {
            const selected = selectedGroups.includes(key);
            return (
              <Box
                key={key}
                onClick={() => toggle(key)}
                sx={{
                  borderRadius: 3,
                  border: '2px solid',
                  borderColor: selected ? color : 'divider',
                  backgroundColor: selected ? `${color}18` : 'background.paper',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 2,
                  transition: 'all 0.15s ease',
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  '&:active': { opacity: 0.8 },
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: selected ? color : `${color}50`,
                    mb: 'auto',
                    transition: 'background-color 0.15s ease',
                  }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  lineHeight={1.2}
                  sx={{ color: selected ? color : 'text.primary', mt: 2 }}
                >
                  {label}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
                  {subtitle}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={selectedGroups.length === 0}
          onClick={onGenerate}
          sx={{ py: 1.5, fontSize: '1rem', flexShrink: 0 }}
        >
          Generate Workout
        </Button>
      </Box>
    </Box>
  );
}
