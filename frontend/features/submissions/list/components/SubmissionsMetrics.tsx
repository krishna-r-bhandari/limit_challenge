'use client';

import { Grid } from '@mui/material';
import { useMemo } from 'react';

import { MetricCard } from '@/features/submissions/list/components/MetricCard';
import { SubmissionListItem } from '@/lib/types';

type SubmissionsMetricsProps = {
  total: number;
  results: SubmissionListItem[];
};

export function SubmissionsMetrics({ total, results }: SubmissionsMetricsProps) {
  const { inReview, closed, lost } = useMemo(
    () => ({
      inReview: results.filter((item) => item.status === 'in_review').length,
      closed: results.filter((item) => item.status === 'closed').length,
      lost: results.filter((item) => item.status === 'lost').length,
    }),
    [results],
  );

  return (
    <Grid container spacing={1.5} sx={{ mt: 1 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <MetricCard label="Total" value={total} helper="records match your filters" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <MetricCard label="In Review" value={inReview} helper="on this page" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <MetricCard label="Closed Won" value={closed} helper="on this page" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <MetricCard label="Lost" value={lost} helper="on this page" />
      </Grid>
    </Grid>
  );
}
