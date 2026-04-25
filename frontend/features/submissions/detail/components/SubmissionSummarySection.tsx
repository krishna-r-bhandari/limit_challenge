'use client';

import { Paper, Typography } from '@mui/material';

import { SectionTitle } from '@/features/submissions/detail/components/SectionTitle';

type SubmissionSummarySectionProps = {
  summary: string;
};

export function SubmissionSummarySection({ summary }: SubmissionSummarySectionProps) {
  return (
    <Paper sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
      <SectionTitle>Submission Summary</SectionTitle>
      <Typography sx={{ color: 'text.secondary', lineHeight: 1.65 }}>{summary}</Typography>
    </Paper>
  );
}
