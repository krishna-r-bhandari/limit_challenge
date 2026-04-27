'use client';

import { Box } from '@mui/material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Suspense, useCallback, useMemo, useState } from 'react';

import { SubmissionsFilters } from '@/features/submissions/list/components/SubmissionsFilters';
import { SubmissionPreviewDrawer } from '@/features/submissions/list/components/SubmissionPreviewDrawer';
import { SubmissionsGraphs } from '@/features/submissions/list/components/SubmissionsGraphs';
import { SubmissionsMetrics } from '@/features/submissions/list/components/SubmissionsMetrics';
import { SubmissionsPageHeader } from '@/features/submissions/list/components/SubmissionsPageHeader';
import { SubmissionsResults } from '@/features/submissions/list/components/SubmissionsResults';
import { useSubmissionListFilters } from '@/features/submissions/list/hooks/useSubmissionListFilters';
import { useBrokerOptions } from '@/lib/hooks/useBrokerOptions';
import { useSubmissionsList } from '@/lib/hooks/useSubmissions';
import { SubmissionListItem } from '@/lib/types';

const SAVED_VIEWS_KEY = 'submission-saved-views-v1';

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
    createdFrom,
    createdTo,
    hasDocuments,
    hasNotes,
    sortBy,
    safePage,
    filters,
    onStatusChange,
    onBrokerChange,
    onSearchInputChange,
    onCreatedFromChange,
    onCreatedToChange,
    onHasDocumentsChange,
    onHasNotesChange,
    onSortByChange,
    onApplySavedView: applySavedViewFilters,
    onPageChange,
    onClear,
  } = useSubmissionListFilters();

  const submissionsQuery = useSubmissionsList(filters);
  const brokerQuery = useBrokerOptions();
  const isPageLoading = submissionsQuery.isLoading || brokerQuery.isLoading;
  const [previewId, setPreviewId] = useState<number | null>(null);
  const [saveViewOpen, setSaveViewOpen] = useState(false);
  const [saveViewName, setSaveViewName] = useState('');
  const [savedViews, setSavedViews] = useState<Record<string, Record<string, string>>>(() => {
    if (typeof window === 'undefined') return {};
    const raw = window.localStorage.getItem(SAVED_VIEWS_KEY);
    if (!raw) return {};
    try {
      return JSON.parse(raw) as Record<string, Record<string, string>>;
    } catch {
      return {};
    }
  });
  const totalPages = Math.max(1, Math.ceil((submissionsQuery.data?.count ?? 0) / 10));
  const total = submissionsQuery.data?.count ?? 0;
  const results = useMemo(
    () => submissionsQuery.data?.results ?? [],
    [submissionsQuery.data?.results],
  );
  const savedViewNames = useMemo(() => Object.keys(savedViews), [savedViews]);

  const persistSavedViews = useCallback((next: Record<string, Record<string, string>>) => {
    setSavedViews(next);
    window.localStorage.setItem(SAVED_VIEWS_KEY, JSON.stringify(next));
  }, []);

  const applySavedView = useCallback(
    (viewName: string) => {
      const view = savedViews[viewName];
      if (!view) return;
      applySavedViewFilters(view);
    },
    [applySavedViewFilters, savedViews],
  );

  const saveCurrentView = useCallback(() => {
    const viewName = saveViewName.trim();
    if (!viewName) return;
    const next = {
      ...savedViews,
      [viewName]: {
        status,
        brokerId,
        companySearch: searchInput,
        createdFrom,
        createdTo,
        hasDocuments,
        hasNotes,
        sortBy,
      },
    };
    persistSavedViews(next);
    setSaveViewOpen(false);
    setSaveViewName('');
  }, [
    brokerId,
    createdFrom,
    createdTo,
    hasDocuments,
    hasNotes,
    persistSavedViews,
    savedViews,
    searchInput,
    sortBy,
    status,
    saveViewName,
  ]);

  const exportCurrentPageCsv = useCallback(() => {
    const header = [
      'id',
      'company',
      'industry',
      'broker',
      'status',
      'priority',
      'documents',
      'notes',
      'createdAt',
      'updatedAt',
    ];
    const rows = results.map((item: SubmissionListItem) => [
      item.id,
      item.company.legalName,
      item.company.industry,
      item.broker.name,
      item.status,
      item.priority,
      item.documentCount,
      item.noteCount,
      item.createdAt,
      item.updatedAt,
    ]);
    const csv = [header, ...rows]
      .map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-page-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [results]);

  const openSubmissionDetail = useCallback((id: number) => {
    setPreviewId(id);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
        <SubmissionsPageHeader
          onBack={() => router.push('/')}
          onApplySavedView={applySavedView}
          onSaveCurrentView={() => setSaveViewOpen(true)}
          savedViewNames={savedViewNames}
          isLoading={isPageLoading}
        />
        <SubmissionsFilters
          searchInput={searchInput}
          status={status}
          brokerId={brokerId}
          createdFrom={createdFrom}
          createdTo={createdTo}
          hasDocuments={hasDocuments}
          hasNotes={hasNotes}
          sortBy={sortBy}
          brokers={brokerQuery.data ?? []}
          onSearchInputChange={onSearchInputChange}
          onStatusChange={onStatusChange}
          onBrokerChange={onBrokerChange}
          onCreatedFromChange={onCreatedFromChange}
          onCreatedToChange={onCreatedToChange}
          onHasDocumentsChange={onHasDocumentsChange}
          onHasNotesChange={onHasNotesChange}
          onSortByChange={onSortByChange}
          onClear={onClear}
          isLoading={isPageLoading}
        />
        <SubmissionsMetrics total={total} results={results} isLoading={isPageLoading} />
        <SubmissionsGraphs
          results={results}
          onStatusClick={onStatusChange}
          isLoading={isPageLoading}
        />
        <SubmissionsResults
          query={submissionsQuery}
          page={safePage}
          totalPages={totalPages}
          sortBy={sortBy}
          onExportCsv={exportCurrentPageCsv}
          onOpenDetail={openSubmissionDetail}
          onPageChange={onPageChange}
        />
        <SubmissionPreviewDrawer submissionId={previewId} onClose={() => setPreviewId(null)} />
        <Dialog open={saveViewOpen} onClose={() => setSaveViewOpen(false)} fullWidth maxWidth="xs">
          <DialogTitle>Save current view</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="View name"
              fullWidth
              value={saveViewName}
              onChange={(event) => setSaveViewName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') saveCurrentView();
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="inherit"
              onClick={() => {
                setSaveViewOpen(false);
                setSaveViewName('');
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={saveCurrentView} disabled={!saveViewName.trim()}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
