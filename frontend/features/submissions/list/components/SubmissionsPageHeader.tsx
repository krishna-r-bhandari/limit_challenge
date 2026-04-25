'use client';

import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { Box, Button, MenuItem, Select, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import ThemeModeToggle from '@/components/theme/ThemeModeToggle';

type SubmissionsPageHeaderProps = {
  onApplySavedView: (viewName: string) => void;
  onSaveCurrentView: () => void;
  savedViewNames: string[];
  isLoading?: boolean;
};

export function SubmissionsPageHeader({
  onApplySavedView,
  onSaveCurrentView,
  savedViewNames,
  isLoading = false,
}: SubmissionsPageHeaderProps) {
  const hasSavedViews = savedViewNames.length > 0;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
      <Box>
        {isLoading ? (
          <>
            <Skeleton variant="text" width={300} height={46} />
            <Skeleton variant="text" width={420} height={28} />
          </>
        ) : (
          <>
            <Typography sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 800 }}>
              Submission Tracker
            </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
              Review and prioritize broker opportunities with searchable, shareable filters.
            </Typography>
          </>
        )}
      </Box>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        flexWrap="wrap"
        justifyContent="flex-end"
      >
        <Select
          size="small"
          value=""
          displayEmpty
          sx={{ minWidth: 180 }}
          disabled={!hasSavedViews}
          inputProps={{ 'aria-label': 'Apply saved filter view' }}
          onChange={(event) => onApplySavedView(event.target.value)}
        >
          <MenuItem value="" disabled>
            {hasSavedViews ? 'Apply saved view' : 'No saved views'}
          </MenuItem>
          {savedViewNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Tooltip title="Save current filter combination">
          <Button
            variant="contained"
            startIcon={<BookmarkAddOutlinedIcon />}
            onClick={onSaveCurrentView}
            sx={{
              bgcolor: '#2563EB',
              color: '#FFFFFF',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            Save view
          </Button>
        </Tooltip>
        <ThemeModeToggle />
      </Stack>
    </Stack>
  );
}
