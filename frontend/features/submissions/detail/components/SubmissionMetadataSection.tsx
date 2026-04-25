'use client';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Paper, Stack, Typography } from '@mui/material';

import { SectionTitle } from '@/features/submissions/detail/components/SectionTitle';
import { SubmissionDetail } from '@/lib/types';

type SubmissionMetadataSectionProps = {
  submission: SubmissionDetail;
};

export function SubmissionMetadataSection({ submission }: SubmissionMetadataSectionProps) {
  return (
    <Paper sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
      <SectionTitle>Submission Metadata</SectionTitle>
      <Stack spacing={1.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PersonOutlineIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Box>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Owner</Typography>
            <Typography sx={{ fontWeight: 600 }}>{submission.owner.fullName}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <EmailOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Box>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Broker</Typography>
            <Typography sx={{ fontWeight: 600 }}>{submission.broker.name}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <EventOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Box>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Created</Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {new Date(submission.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <EventOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Box>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Updated</Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {new Date(submission.updatedAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}
