'use client';

import { Chip, Paper, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

import { statusStyles } from '@/lib/submission-ui';
import { SubmissionDetail, SubmissionPriority } from '@/lib/types';

type SubmissionDetailHeroProps = {
  submission: SubmissionDetail;
};

function getPriorityChip(priority: SubmissionPriority) {
  if (priority === 'high') {
    return <Chip size="small" label="High priority" color="error" variant="outlined" />;
  }
  if (priority === 'medium') {
    return <Chip size="small" label="Medium priority" color="warning" variant="outlined" />;
  }
  return <Chip size="small" label="Low priority" color="success" variant="outlined" />;
}

export function SubmissionDetailHero({ submission }: SubmissionDetailHeroProps) {
  const statusChip = useMemo(() => {
    const style = statusStyles[submission.status];
    return (
      <Chip
        size="small"
        label={style.label}
        sx={{ bgcolor: style.bg, color: style.color, fontWeight: 700, borderRadius: 1.5 }}
      />
    );
  }, [submission.status]);

  return (
    <Paper sx={{ p: { xs: 2, md: 2.5 }, border: '1px solid', borderColor: 'divider' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        gap={2}
      >
        <Stack>
          <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800 }}>
            {submission.company.legalName}
          </Typography>
          <Typography sx={{ mt: 0.4, color: 'text.secondary' }}>
            {submission.company.industry} · {submission.company.headquartersCity}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {statusChip}
          {getPriorityChip(submission.priority)}
        </Stack>
      </Stack>
    </Paper>
  );
}
