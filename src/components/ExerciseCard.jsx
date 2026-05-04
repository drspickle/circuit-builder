import { Card, CardContent, Box, Typography, IconButton, Chip } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EditIcon from '@mui/icons-material/Edit';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GROUPS } from '../data/exercises';

export default function ExerciseCard({ exercise, onReplace, onPickSpecific, onEdit }) {
  const group = GROUPS[exercise.group];
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: exercise.id,
  });

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 10 : 'auto',
        position: 'relative',
      }}
      sx={{
        borderLeft: `4px solid ${group.color}`,
        backgroundColor: 'background.paper',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: 2,
          '&:last-child': { pb: 2 },
        }}
      >
        <Box
          {...attributes}
          {...listeners}
          sx={{
            cursor: isDragging ? 'grabbing' : 'grab',
            color: 'text.disabled',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            touchAction: 'none',
          }}
        >
          <DragIndicatorIcon fontSize="small" />
        </Box>

        <Box flex={1} minWidth={0}>
          <Typography variant="h6" fontWeight={600} lineHeight={1.2} noWrap>
            {exercise.name}
          </Typography>
          <Chip
            label={group.label}
            size="small"
            sx={{
              mt: 0.75,
              height: 20,
              fontSize: '0.68rem',
              fontWeight: 600,
              backgroundColor: `${group.color}22`,
              color: group.color,
              borderRadius: '6px',
            }}
          />
        </Box>

        {onEdit && (
          <IconButton onClick={onEdit} sx={{ color: 'text.secondary' }}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}

        <IconButton onClick={onReplace} sx={{ color: 'primary.main' }}>
          <SwapHorizIcon />
        </IconButton>

        <IconButton onClick={onPickSpecific} sx={{ color: 'text.secondary' }}>
          <FormatListBulletedIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
