import { Box, Typography, Button, AppBar, Toolbar, IconButton, Tooltip, Chip } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { GROUPS } from '../data/exercises';
import MuscleSvg from './MuscleSvg';

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
          <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
            Circuit Builder
          </Typography>
          <Tooltip title="Manage exercises">
            <IconButton onClick={onViewExercises} sx={{ color: 'text.secondary' }}>
              <FormatListBulletedIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 3,
          py: 1,
          minHeight: 0,
        }}
      >

        {/* SVG figure */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 0,
            width: '100%',
          }}
        >
          <Box
            sx={{
              height: '100%',
              maxHeight: '100%',
              aspectRatio: '47.71 / 241.28',
            }}
          >
            <MuscleSvg selectedGroups={selectedGroups} onToggle={toggle} />
          </Box>
        </Box>

        {/* Selected group labels */}
        <Box
          sx={{
            flexShrink: 0,
            minHeight: 40,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
            py: 1.5,
          }}
        >
          {selectedGroups.length === 0 ? (
            <Typography variant="body2" color="text.disabled">
              No groups selected
            </Typography>
          ) : (
            selectedGroups.map((key) => (
              <Chip
                key={key}
                label={GROUPS[key].label}
                onClick={() => toggle(key)}
                size="small"
                sx={{
                  backgroundColor: GROUPS[key].color + '26',
                  color: GROUPS[key].color,
                  borderColor: GROUPS[key].color,
                  border: '1px solid',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: GROUPS[key].color + '40' },
                }}
              />
            ))
          )}
        </Box>

        {/* Generate button */}
        <Box textAlign="center" sx={{ flexShrink: 0, pb: 2 }}>
          <Button
            variant="contained"
            size="large"
            disabled={selectedGroups.length === 0}
            onClick={onGenerate}
            sx={{ px: 7, py: 1.5, fontSize: '1rem' }}
          >
            Generate Workout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
