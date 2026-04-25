'use client';

import { Box, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

import { SubmissionListItem, SubmissionStatus } from '@/lib/types';

type SubmissionsGraphsProps = {
  results: SubmissionListItem[];
  onStatusClick: (status: SubmissionStatus) => void;
  isLoading?: boolean;
};

type StatusDistributionChartProps = Pick<SubmissionsGraphsProps, 'results' | 'onStatusClick'>;

type IndustryBreakdownChartProps = Pick<SubmissionsGraphsProps, 'results'>;

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: 'New',
  in_review: 'In Review',
  closed: 'Closed Won',
  lost: 'Lost',
};

const STATUS_COLORS: Record<SubmissionStatus, string> = {
  new: '#3B82F6',
  in_review: '#F59E0B',
  closed: '#22C55E',
  lost: '#EF4444',
};

function StatusDistributionChart({ results, onStatusClick }: StatusDistributionChartProps) {
  const data = useMemo(() => {
    const counts: Record<SubmissionStatus, number> = {
      new: 0,
      in_review: 0,
      closed: 0,
      lost: 0,
    };

    for (const item of results) counts[item.status] += 1;
    const total = results.length || 1;

    return (Object.keys(counts) as SubmissionStatus[]).map((status) => ({
      status,
      label: STATUS_LABELS[status],
      count: counts[status],
      percent: Math.round((counts[status] / total) * 100),
      color: STATUS_COLORS[status],
    }));
  }, [results]);

  return (
    <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
      <Typography fontWeight={700} sx={{ mb: 1.5 }}>
        Status distribution (current page)
      </Typography>
      <Stack spacing={1.25}>
        {data.map((item) => (
          <Box
            key={item.status}
            role="button"
            tabIndex={0}
            onClick={() => onStatusClick(item.status)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') onStatusClick(item.status);
            }}
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {item.count} ({item.percent}%)
              </Typography>
            </Stack>
            <Box
              sx={{
                height: 10,
                borderRadius: 999,
                bgcolor: 'action.hover',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${item.percent}%`,
                  minWidth: item.count > 0 ? 8 : 0,
                  height: '100%',
                  bgcolor: item.color,
                  borderRadius: 999,
                  transition: 'width 240ms ease',
                }}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

function IndustryBreakdownChart({ results }: IndustryBreakdownChartProps) {
  const rows = useMemo(() => {
    const counts = new Map<string, number>();

    for (const item of results) {
      const industry = item.company.industry || 'Unknown';
      counts.set(industry, (counts.get(industry) ?? 0) + 1);
    }

    const sorted = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([industry, count]) => ({ industry, count }));
    const max = Math.max(...sorted.map((item) => item.count), 1);

    return sorted.map((item) => ({
      ...item,
      width: Math.round((item.count / max) * 100),
    }));
  }, [results]);

  return (
    <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
      <Typography fontWeight={700} sx={{ mb: 1.5 }}>
        Top industries (current page)
      </Typography>
      {rows.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No records to visualize yet.
        </Typography>
      ) : (
        <Stack spacing={1.25}>
          {rows.map((item) => (
            <Stack key={item.industry} direction="row" spacing={1} alignItems="center">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ minWidth: 96, maxWidth: 96 }}
                noWrap
                title={item.industry}
              >
                {item.industry}
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  bgcolor: 'action.hover',
                  borderRadius: 1.5,
                  overflow: 'hidden',
                  height: 20,
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${item.width}%`,
                    bgcolor: 'primary.main',
                    borderRadius: 1.5,
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                fontWeight={700}
                sx={{ minWidth: 18, textAlign: 'right' }}
              >
                {item.count}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Paper>
  );
}

export function SubmissionsGraphs({
  results,
  onStatusClick,
  isLoading = false,
}: SubmissionsGraphsProps) {
  if (isLoading) {
    return (
      <Box
        sx={{
          mt: 2,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 1.5,
        }}
      >
        {[0, 1].map((index) => (
          <Paper key={index} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
            <Skeleton variant="text" width="50%" height={28} sx={{ mb: 1 }} />
            <Stack spacing={1.25}>
              <Skeleton variant="text" width="95%" />
              <Skeleton variant="rounded" height={10} />
              <Skeleton variant="text" width="92%" />
              <Skeleton variant="rounded" height={10} />
              <Skeleton variant="text" width="88%" />
              <Skeleton variant="rounded" height={10} />
            </Stack>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
        gap: 1.5,
      }}
    >
      <StatusDistributionChart results={results} onStatusClick={onStatusClick} />
      <IndustryBreakdownChart results={results} />
    </Box>
  );
}
