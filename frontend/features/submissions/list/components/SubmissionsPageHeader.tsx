'use client';

import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import ThemeModeToggle from '@/components/theme/ThemeModeToggle';

type SubmissionsPageHeaderProps = {
  onRefresh: () => void;
};

export function SubmissionsPageHeader({ onRefresh }: SubmissionsPageHeaderProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
      <Box>
        <Typography sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 800 }}>
          Submission Tracker
        </Typography>
        <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
          Review and prioritize broker opportunities with searchable, shareable filters.
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton onClick={onRefresh} aria-label="refresh submissions">
          <RefreshIcon />
        </IconButton>
        <ThemeModeToggle />
      </Stack>
    </Stack>
  );
}
