'use client';

import { UseQueryResult } from '@tanstack/react-query';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import { Alert, Box, Button, Pagination, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { ChangeEvent, useCallback, useMemo } from 'react';

import { SubmissionListCard } from '@/components/submissions/SubmissionListCard';
import { PaginatedResponse, SubmissionListItem } from '@/lib/types';

type SubmissionsResultsProps = {
  query: UseQueryResult<PaginatedResponse<SubmissionListItem>, Error>;
  page: number;
  totalPages: number;
  sortBy: string;
  onExportCsv: () => void;
  onOpenDetail: (id: number) => void;
  onPageChange: (nextPage: number) => void;
};

export function SubmissionsResults({
  query,
  page,
  totalPages,
  sortBy,
  onExportCsv,
  onOpenDetail,
  onPageChange,
}: SubmissionsResultsProps) {
  const rawResults = useMemo(() => query.data?.results ?? [], [query.data?.results]);
  const results = useMemo(() => {
    const items = [...rawResults];
    switch (sortBy) {
      case 'updated_asc':
        return items.sort((a, b) => +new Date(a.updatedAt) - +new Date(b.updatedAt));
      case 'created_desc':
        return items.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      case 'created_asc':
        return items.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
      case 'docs_desc':
        return items.sort((a, b) => b.documentCount - a.documentCount);
      case 'notes_desc':
        return items.sort((a, b) => b.noteCount - a.noteCount);
      case 'company_asc':
        return items.sort((a, b) => a.company.legalName.localeCompare(b.company.legalName));
      case 'updated_desc':
      default:
        return items.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
    }
  }, [rawResults, sortBy]);

  const handlePageChange = useCallback(
    (_: ChangeEvent<unknown>, nextPage: number) => {
      onPageChange(nextPage);
    },
    [onPageChange],
  );

  return (
    <Paper sx={{ mt: 2.5, p: { xs: 1.5, md: 2 }, border: '1px solid', borderColor: 'divider' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        sx={{ mb: 1.25 }}
      >
        <Typography variant="body2" color="text.secondary">
          {results.length} records on this page
        </Typography>
        <Button
          size="small"
          variant="outlined"
          color="inherit"
          onClick={onExportCsv}
          startIcon={<TableViewOutlinedIcon sx={{ fontSize: 18 }} />}
          sx={(theme) => ({
            borderColor: theme.palette.mode === 'dark' ? '#3A3A3A' : '#CBD5E1',
            color: 'text.primary',
            '&:hover': {
              borderColor: theme.palette.mode === 'dark' ? '#6B6B6B' : '#94A3B8',
              bgcolor: theme.palette.mode === 'dark' ? '#242424' : '#F8FAFC',
            },
          })}
        >
          Export CSV (current page)
        </Button>
      </Stack>
      {query.isLoading ? (
        <Stack spacing={1.25}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{ p: 1.25, borderColor: 'divider', bgcolor: 'background.paper' }}
            >
              <Skeleton variant="text" width="45%" height={28} />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="rounded" height={48} />
            </Paper>
          ))}
        </Stack>
      ) : query.isError ? (
        <Alert
          severity="error"
          action={
            <Button size="small" onClick={() => query.refetch()}>
              Retry
            </Button>
          }
        >
          Could not load submissions. Ensure backend is running on localhost:8000.
        </Alert>
      ) : results.length === 0 ? (
        <Box sx={{ py: 7, textAlign: 'center' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>No submissions found</Typography>
          <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
            Try broadening your filters or clearing search criteria.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={1.25}>
          {results.map((submission) => (
            <SubmissionListCard
              key={submission.id}
              submission={submission}
              selected={false}
              onClick={() => onOpenDetail(submission.id)}
            />
          ))}
        </Stack>
      )}

      {totalPages > 1 && (
        <Stack direction="row" justifyContent="center" sx={{ pt: 2.25 }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} />
        </Stack>
      )}
    </Paper>
  );
}
