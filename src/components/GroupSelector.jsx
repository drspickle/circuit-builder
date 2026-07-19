import { useState } from 'react';
import { Box, Typography, Button, AppBar, Toolbar, IconButton, Tooltip } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { GROUPS } from '../data/exercises';

const PRIMARIES = ['upper', 'lower', 'full'];

export default function GroupSelector({ onGenerate, onViewExercises }) {
  const [primary, setPrimary] = useState(null);
  const [addStability, setAddStability] = useState(false);

  const selectPrimary = (key) => {
    if (primary === key) {
      setPrimary(null);
    } else {
      setPrimary(key);
    }
  };

  // When a non-stability primary is active, Stability card acts as an add-on toggle
  const stabilityIsAddon = primary !== null && primary !== 'stability';
  const stabilitySelected = primary === 'stability';
  const stabilityActive = stabilitySelected || (stabilityIsAddon && addStability);
  const canGenerate = primary !== null;

  const { color: stColor, label: stLabel, subtitle: stSubtitle } = GROUPS.stability;

  const handleStabilityClick = () => {
    if (stabilityIsAddon) {
      setAddStability(v => !v);
    } else {
      // Acts as primary toggle
      setPrimary(stabilitySelected ? null : 'stability');
      setAddStability(false);
    }
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

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2, gap: 1.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          What are you training today?
        </Typography>

        {/* Upper / Lower / Full Body — mutually exclusive primaries */}
        {PRIMARIES.map((key) => {
          const { label, subtitle, color } = GROUPS[key];
          const selected = primary === key;
          return (
            <Box
              key={key}
              onClick={() => selectPrimary(key)}
              sx={{
                borderRadius: 3,
                border: '2px solid',
                borderColor: selected ? color : `${color}60`,
                backgroundColor: selected ? `${color}14` : 'background.paper',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                px: 2.5,
                py: 2,
                gap: 2,
                transition: 'all 0.12s ease',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                '&:active': { opacity: 0.75 },
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: selected ? color : `${color}60`,
                  flexShrink: 0,
                  transition: 'background-color 0.12s ease',
                }}
              />
              <Box flex={1}>
                <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}
                  sx={{ color: selected ? color : 'text.primary' }}>
                  {label}
                </Typography>
                <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
              </Box>
            </Box>
          );
        })}

        {/* Stability — primary when alone, add-on toggle when another primary is active */}
        <Box
          onClick={handleStabilityClick}
          sx={{
            borderRadius: 3,
            border: '2px solid',
            borderColor: stabilityActive ? stColor : `${stColor}60`,
            backgroundColor: stabilityActive ? `${stColor}14` : 'background.paper',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            px: 2.5,
            py: 2,
            gap: 2,
            transition: 'all 0.15s ease',
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            '&:active': { opacity: 0.75 },
          }}
        >
          {stabilityIsAddon ? (
            // Add-on mode: checkbox-style indicator
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: '2px solid',
                borderColor: addStability ? stColor : `${stColor}60`,
                backgroundColor: addStability ? stColor : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
            >
              {addStability
                ? <CheckIcon sx={{ fontSize: 12, color: '#000' }} />
                : <AddIcon sx={{ fontSize: 12, color: `${stColor}90` }} />
              }
            </Box>
          ) : (
            // Primary mode: dot indicator matching the other cards
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: stabilitySelected ? stColor : `${stColor}60`,
                flexShrink: 0,
                transition: 'background-color 0.15s ease',
              }}
            />
          )}
          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}
              sx={{ color: stabilityActive ? stColor : 'text.primary' }}>
              {stabilityIsAddon ? `+ ${stLabel}` : stLabel}
            </Typography>
            <Typography variant="caption" color="text.secondary">{stSubtitle}</Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={!canGenerate}
          onClick={() => onGenerate(primary, stabilityIsAddon ? addStability : false)}
          sx={{ py: 1.5, fontSize: '1rem', flexShrink: 0, mt: 0.5 }}
        >
          Generate Circuit
        </Button>
      </Box>
    </Box>
  );
}
