'use client';

import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import InsightsIcon from '@mui/icons-material/Insights';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { useRouter } from 'next/navigation';

const featureSx = {
  p: 3,
  borderRadius: 3,
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  backdropFilter: 'blur(10px)',
  boxShadow: (theme: { palette: { mode: string } }) =>
    theme.palette.mode === 'dark'
      ? '0 10px 30px rgba(0, 0, 0, 0.35)'
      : '0 12px 30px rgba(15, 23, 42, 0.07)',
};

export default function HomePage() {
  const router = useRouter();
  const steps = ['Capture opportunities', 'Prioritize with confidence', 'Move faster as one team'];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        py: { xs: 4, md: 9 },
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'grid', gap: { xs: 5, md: 8 } }}>
        {/* Section 1: Hero */}
        <Stack spacing={2.5} sx={{ position: 'relative', overflow: 'hidden' }}>
          <Stack spacing={1} direction="row" alignItems="center" flexWrap="wrap">
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
              label="Built for modern operations"
              color="primary"
              variant="outlined"
              sx={{ px: 0.5, fontWeight: 600 }}
            />
            <Chip label="4.9/5 team satisfaction" size="small" sx={{ fontWeight: 600 }} />
          </Stack>
          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.7rem', md: '3.25rem' },
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'text.primary',
              maxWidth: 800,
            }}
          >
            Turn submission chaos into a{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #3B82F6, #22C55E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              smooth daily flow
            </Box>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, lineHeight: 1.75, fontSize: '1.05rem' }}
          >
            One beautiful command center for opportunities, documents, contacts, and team notes.
            Find what matters quickly and keep every review step crystal clear.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button
              size="large"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => router.push('/submissions')}
              sx={{ px: 3, py: 1.25, fontSize: '1rem', fontWeight: 700 }}
            >
              Start reviewing submissions
            </Button>
            <Button
              size="large"
              variant="outlined"
              startIcon={<InsightsIcon />}
              onClick={() => router.push('/submissions')}
              sx={{ px: 3, py: 1.25, fontSize: '1rem' }}
            >
              Explore dashboard
            </Button>
          </Stack>
        </Stack>

        {/* Section 2: Feature Grid */}
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Powerful by default, simple in practice
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            <Box sx={featureSx}>
              <FilterListIcon sx={{ color: 'primary.main', mb: 1.25 }} />
              <Typography fontWeight={700} gutterBottom>
                Smart filters
              </Typography>
              <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                Slice by status, broker, and company with URL-synced filters your team can share.
              </Typography>
            </Box>
            <Box sx={featureSx}>
              <HubOutlinedIcon sx={{ color: 'primary.main', mb: 1.25 }} />
              <Typography fontWeight={700} gutterBottom>
                Complete context
              </Typography>
              <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                Open every submission with linked contacts, documents, timelines, and notes.
              </Typography>
            </Box>
            <Box sx={featureSx}>
              <ShieldOutlinedIcon sx={{ color: 'primary.main', mb: 1.25 }} />
              <Typography fontWeight={700} gutterBottom>
                Reliable reviews
              </Typography>
              <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                Consistent workflows and clear ownership help your team avoid missed details.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Section 3: Process + Highlight */}
        <Box
          sx={{
            ...featureSx,
            p: { xs: 3, md: 4 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' },
            gap: 4,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              A workflow your team will actually enjoy
            </Typography>
            <Stepper orientation="vertical" activeStep={2} sx={{ pr: 1 }}>
              {steps.map((label) => (
                <Step key={label} completed>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Stack spacing={2}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'action.hover',
              }}
            >
              <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
                <Avatar sx={{ width: 30, height: 30, bgcolor: 'secondary.main' }}>
                  <BoltIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Typography fontWeight={700}>Fast by design</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                Teams using this workflow report 40% faster first-response times on new submissions.
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
              “The new workspace replaced three separate tools. Everyone sees the same truth, and
              decision cycles are dramatically shorter.”
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Priya Shah, Operations Lead
            </Typography>
          </Stack>
        </Box>

        {/* Section 4: CTA */}
        <Stack
          spacing={2}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          textAlign={{ xs: 'left', md: 'center' }}
          sx={{
            ...featureSx,
            p: { xs: 3, md: 4 },
            background:
              'linear-gradient(120deg, rgba(59,130,246,0.15) 0%, rgba(34,197,94,0.12) 100%)',
          }}
        >
          <Typography variant="h5" sx={{ maxWidth: 700 }}>
            Ready to turn your pipeline into your competitive advantage?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 680, lineHeight: 1.7 }}
          >
            Launch your submission workspace today and give every reviewer a faster, cleaner way to
            collaborate.
          </Typography>
          <Button
            size="large"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => router.push('/submissions')}
            sx={{ px: 3.5, py: 1.25 }}
          >
            Go to submissions
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
