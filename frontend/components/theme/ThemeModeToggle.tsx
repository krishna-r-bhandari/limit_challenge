'use client';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton, Tooltip } from '@mui/material';

import { useColorMode } from '@/app/providers';

export default function ThemeModeToggle() {
  const { mode, toggleMode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={toggleMode}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        sx={{
          bgcolor: isDark ? '#1F1F1F' : '#FFFFFF',
          color: 'text.primary',
          border: '1px solid',
          borderColor: isDark ? '#3A3A3A' : '#CBD5E1',
          '&:hover': {
            bgcolor: isDark ? '#242424' : '#F1F5F9',
          },
          '&:active': {
            bgcolor: isDark ? '#2C2C2C' : '#E2E8F0',
          },
        }}
      >
        {isDark ? (
          <LightModeOutlinedIcon fontSize="small" />
        ) : (
          <DarkModeOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
