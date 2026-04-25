'use client';

import { Paper, Typography } from '@mui/material';
import { Skeleton } from '@mui/material';
import { ReactNode } from 'react';

type MetricCardProps = {
  label: string;
  value: number;
  helper: string;
  icon?: ReactNode;
  isLoading?: boolean;
};

export function MetricCard({ label, value, helper, icon, isLoading = false }: MetricCardProps) {
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        {label}
        {isLoading ? <Skeleton variant="circular" width={18} height={18} /> : icon}
      </Typography>
      {isLoading ? (
        <>
          <Skeleton variant="text" width="45%" height={40} />
          <Skeleton variant="text" width="70%" height={18} />
        </>
      ) : (
        <>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: 'text.primary', lineHeight: 1 }}>
            {value}
          </Typography>
          <Typography sx={{ mt: 0.75, fontSize: 12.5, color: 'text.secondary' }}>
            {helper}
          </Typography>
        </>
      )}
    </Paper>
  );
}
