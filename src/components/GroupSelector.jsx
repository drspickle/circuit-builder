import { Box, Typography, AppBar, Toolbar, IconButton, Tooltip } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { GROUPS } from '../data/exercises';

export default function GroupSelector({ onGenerate, onViewExercises }) {
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

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2, gap: 1.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          What are you training today?
        </Typography>

        {Object.entries(GROUPS).map(([key, { label, subtitle, color }]) => (
          <Box
            key={key}
            onClick={() => onGenerate(key)}
            sx={{
              borderRadius: 3,
              border: '2px solid',
              borderColor: `${color}60`,
              backgroundColor: 'background.paper',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              px: 2.5,
              py: 2,
              gap: 2,
              transition: 'all 0.12s ease',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
              '&:hover': { borderColor: color, backgroundColor: `${color}10` },
              '&:active': { opacity: 0.75 },
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: color,
                flexShrink: 0,
              }}
            />
            <Box flex={1}>
              <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2} sx={{ color }}>
                {label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
