'use client';

import { Paper, Typography } from '@mui/material';

type MetricCardProps = {
  label: string;
  value: number;
  helper: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
      <Typography
        sx={{
          fontSize: 11.5,
          fontWeight: 700,
          color: 'text.secondary',
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          mb: 0.7,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 28, fontWeight: 800, color: 'text.primary', lineHeight: 1 }}>
        {value}
      </Typography>
      <Typography sx={{ mt: 0.75, fontSize: 12.5, color: 'text.secondary' }}>{helper}</Typography>
    </Paper>
  );
}
