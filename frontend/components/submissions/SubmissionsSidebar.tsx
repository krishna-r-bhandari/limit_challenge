'use client';

import AddIcon from '@mui/icons-material/Add';
import GridViewIcon from '@mui/icons-material/GridView';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';

export function SubmissionsSidebar() {
  const navItems = [
    { icon: <GridViewIcon fontSize="small" />, label: 'Command Center' },
    { icon: <StorageOutlinedIcon fontSize="small" />, label: 'Submissions', active: true },
    { icon: <HubOutlinedIcon fontSize="small" />, label: 'Broker Network' },
    { icon: <InsightsOutlinedIcon fontSize="small" />, label: 'Intelligence' },
  ];

  return (
    <Box
      sx={{
        width: 220,
        flexShrink: 0,
        bgcolor: '#0b1020',
        background: 'linear-gradient(180deg, #0b1020 0%, #0d1226 45%, #0a0e1a 100%)',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        py: 3,
        px: 2,
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
        boxShadow: '4px 0 32px rgba(0,0,0,0.2)',
        borderRight: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3.5, px: 0.5 }}>
        <Avatar sx={{ bgcolor: '#1e3a5f', width: 38, height: 38, fontSize: 14 }}>EO</Avatar>
        <Box>
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>
            Editorial Ops
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>
            Premium Management
          </Typography>
        </Box>
      </Stack>

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        sx={{
          bgcolor: '#1e3a5f',
          color: 'white',
          mb: 3,
          borderRadius: 2,
          py: 1.2,
          fontWeight: 600,
          '&:hover': { bgcolor: '#2a4f7c' },
          textTransform: 'none',
          justifyContent: 'flex-start',
        }}
      >
        New Submission
      </Button>

      <Stack spacing={0.5} sx={{ flex: 1 }}>
        {navItems.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 1.5,
              py: 1.1,
              borderRadius: 1.5,
              cursor: 'pointer',
              color: item.active ? 'white' : 'rgba(255,255,255,0.5)',
              bgcolor: item.active ? 'rgba(59,130,246,0.15)' : 'transparent',
              borderLeft: item.active ? '3px solid #3b82f6' : '3px solid transparent',
              fontWeight: item.active ? 600 : 400,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.07)', color: 'white' },
              transition: 'all 0.15s',
            }}
          >
            {item.icon}
            <Typography sx={{ fontSize: 13.5, fontWeight: 'inherit', color: 'inherit' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 1.5,
          py: 1.1,
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.45)',
          '&:hover': { color: 'white' },
        }}
      >
        <SettingsOutlinedIcon fontSize="small" />
        <Typography sx={{ fontSize: 13.5 }}>Settings</Typography>
      </Box>
    </Box>
  );
}
