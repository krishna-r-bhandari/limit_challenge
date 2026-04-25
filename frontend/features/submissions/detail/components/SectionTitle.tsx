'use client';

import { Typography } from '@mui/material';
import { ReactNode } from 'react';

type SectionTitleProps = {
  children: ReactNode;
};

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <Typography sx={{ fontSize: 13, fontWeight: 800, color: 'text.primary', mb: 1.25 }}>
      {children}
    </Typography>
  );
}
