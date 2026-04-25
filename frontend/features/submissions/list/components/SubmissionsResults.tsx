'use client';

import { UseQueryResult } from '@tanstack/react-query';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { ChangeEvent, useCallback } from 'react';

import { SubmissionListCard } from '@/components/submissions/SubmissionListCard';
import { PaginatedResponse, SubmissionListItem } from '@/lib/types';

type SubmissionsResultsProps = {
  query: UseQueryResult<PaginatedResponse<SubmissionListItem>, Error>;
  page: number;
  totalPages: number;
  onOpenDetail: (id: number) => void;
  onPageChange: (nextPage: number) => void;
};

export function SubmissionsResults({
  query,
  page,
  totalPages,
  onOpenDetail,
  onPageChange,
}: SubmissionsResultsProps) {
  const results = query.data?.results ?? [];

  const handlePageChange = useCallback(
    (_: ChangeEvent<unknown>, nextPage: number) => {
      onPageChange(nextPage);
    },
    [onPageChange],
  );

  return (
    <Paper sx={{ mt: 2.5, p: { xs: 1.5, md: 2 }, border: '1px solid', borderColor: 'divider' }}>
      {query.isLoading ? (
        <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
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
