'use client';

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Suspense, useCallback } from 'react';

import { SubmissionsFilters } from '@/features/submissions/list/components/SubmissionsFilters';
import { SubmissionsGraphs } from '@/features/submissions/list/components/SubmissionsGraphs';
import { SubmissionsMetrics } from '@/features/submissions/list/components/SubmissionsMetrics';
import { SubmissionsPageHeader } from '@/features/submissions/list/components/SubmissionsPageHeader';
import { SubmissionsResults } from '@/features/submissions/list/components/SubmissionsResults';
import { useSubmissionListFilters } from '@/features/submissions/list/hooks/useSubmissionListFilters';
import { useBrokerOptions } from '@/lib/hooks/useBrokerOptions';
import { useSubmissionsList } from '@/lib/hooks/useSubmissions';

export default function SubmissionsPageWrapper() {
  return (
    <Suspense>
      <SubmissionsPage />
    </Suspense>
  );
}

function SubmissionsPage() {
  const router = useRouter();
  const {
    status,
    brokerId,
    searchInput,
    safePage,
    filters,
    onStatusChange,
    onBrokerChange,
    onSearchInputChange,
    onPageChange,
    onClear,
  } = useSubmissionListFilters();

  const submissionsQuery = useSubmissionsList(filters);
  const brokerQuery = useBrokerOptions();
  const totalPages = Math.max(1, Math.ceil((submissionsQuery.data?.count ?? 0) / 10));
  const total = submissionsQuery.data?.count ?? 0;
  const results = submissionsQuery.data?.results ?? [];
  const openSubmissionDetail = useCallback(
    (id: number) => {
      router.push(`/submissions/${id}`);
    },
    [router],
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
        <SubmissionsPageHeader onRefresh={() => submissionsQuery.refetch()} />
        <SubmissionsFilters
          searchInput={searchInput}
          status={status}
          brokerId={brokerId}
          brokers={brokerQuery.data ?? []}
          onSearchInputChange={onSearchInputChange}
          onStatusChange={onStatusChange}
          onBrokerChange={onBrokerChange}
          onClear={onClear}
        />
        <SubmissionsMetrics total={total} results={results} />
        <SubmissionsGraphs results={results} />
        <SubmissionsResults
          query={submissionsQuery}
          page={safePage}
          totalPages={totalPages}
          onOpenDetail={openSubmissionDetail}
          onPageChange={onPageChange}
        />
      </Box>
    </Box>
  );
}
