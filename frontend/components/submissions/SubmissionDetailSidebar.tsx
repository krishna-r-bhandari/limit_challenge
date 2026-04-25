'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export function SubmissionDetailSidebar() {
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
        component={Link}
        href="/submissions"
        startIcon={<ArrowBackIcon />}
        sx={{
          color: 'rgba(255,255,255,0.6)',
          textTransform: 'none',
          justifyContent: 'flex-start',
          px: 1.5,
          borderRadius: 1.5,
          '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: 'white' },
        }}
      >
        All Submissions
      </Button>
    </Box>
  );
}
