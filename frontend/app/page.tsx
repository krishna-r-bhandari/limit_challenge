'use client';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FilterListIcon from '@mui/icons-material/FilterList';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useRouter } from 'next/navigation';

const featureSx = {
  p: 2.5,
  borderRadius: 2.5,
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  backdropFilter: 'blur(8px)',
  boxShadow: (theme: { palette: { mode: string } }) =>
    theme.palette.mode === 'dark'
      ? '0 6px 24px rgba(0, 0, 0, 0.35)'
      : '0 4px 24px rgba(15, 23, 42, 0.06)',
};

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ mb: 1.5 }} direction="row" alignItems="center" flexWrap="wrap">
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              px: 1.5,
              py: 0.4,
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'primary.main',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1F1F1F' : '#DBEAFE'),
              border: '1px solid',
              borderColor: (theme) => (theme.palette.mode === 'dark' ? '#3A3A3A' : '#BFDBFE'),
            }}
          >
            Operations
          </Box>
        </Stack>
        <Typography
          component="h1"
          variant="h3"
          sx={{
            fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.75rem' },
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'text.primary',
            maxWidth: 720,
            mb: 2,
          }}
        >
          A calm workspace for{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(90deg, #3B82F6, #22C55E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            broker opportunities
          </Box>
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 520, lineHeight: 1.7, fontSize: '1.05rem', mb: 4 }}
        >
          Review incoming submissions, filter the pipeline, and open full context—contacts,
          documents, and notes—in one place.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 6 }}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            onClick={() => router.push('/submissions')}
            sx={{ px: 3, py: 1.25, fontSize: '1rem', fontWeight: 600 }}
          >
            Open submission workspace
          </Button>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          <Box sx={featureSx}>
            <FilterListIcon sx={{ color: 'primary.main', mb: 1 }} />
            <Typography fontWeight={700} gutterBottom>
              URL-backed filters
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              Status, broker, and company search map to query parameters you can share or bookmark.
            </Typography>
          </Box>
          <Box sx={featureSx}>
            <HubOutlinedIcon sx={{ color: 'primary.main', mb: 1 }} />
            <Typography fontWeight={700} gutterBottom>
              Full relational detail
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              List rows surface counts and the latest note; detail pages load the rest from the API.
            </Typography>
          </Box>
          <Box sx={featureSx}>
            <TrendingUpIcon sx={{ color: 'primary.main', mb: 1 }} />
            <Typography fontWeight={700} gutterBottom>
              Built for review
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              Fast lists, clear empty states, and a layout tuned for daily operations work.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
