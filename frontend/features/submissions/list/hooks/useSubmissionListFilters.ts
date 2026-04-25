'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';
import { SubmissionListFilters, SubmissionStatus } from '@/lib/types';

type FilterUpdates = Record<string, string | undefined>;
type SavedViewPayload = {
  status?: string;
  brokerId?: string;
  companySearch?: string;
  createdFrom?: string;
  createdTo?: string;
  hasDocuments?: string;
  hasNotes?: string;
  sortBy?: string;
};

export function useSubmissionListFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = (searchParams.get('status') as SubmissionStatus | null) ?? '';
  const brokerId = searchParams.get('brokerId') ?? '';
  const companySearch = searchParams.get('companySearch') ?? '';
  const createdFrom = searchParams.get('createdFrom') ?? '';
  const createdTo = searchParams.get('createdTo') ?? '';
  const hasDocuments = searchParams.get('hasDocuments') ?? '';
  const hasNotes = searchParams.get('hasNotes') ?? '';
  const sortBy = searchParams.get('sortBy') ?? 'updated_desc';
  const page = Number(searchParams.get('page') ?? '1');
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;

  const [searchInput, setSearchInput] = useState(companySearch);
  const debouncedSearchInput = useDebouncedValue(searchInput, 350);

  const updateSearchParams = useCallback(
    (updates: FilterUpdates) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          next.delete(key);
          return;
        }
        next.set(key, value);
      });

      if (
        (updates.status !== undefined && updates.status !== status) ||
        (updates.brokerId !== undefined && updates.brokerId !== brokerId) ||
        (updates.companySearch !== undefined && updates.companySearch !== companySearch) ||
        (updates.createdFrom !== undefined && updates.createdFrom !== createdFrom) ||
        (updates.createdTo !== undefined && updates.createdTo !== createdTo) ||
        (updates.hasDocuments !== undefined && updates.hasDocuments !== hasDocuments) ||
        (updates.hasNotes !== undefined && updates.hasNotes !== hasNotes)
      ) {
        next.delete('page');
      }

      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [
      brokerId,
      companySearch,
      createdFrom,
      createdTo,
      hasDocuments,
      hasNotes,
      pathname,
      router,
      searchParams,
      status,
    ],
  );

  useEffect(() => {
    setSearchInput(companySearch);
  }, [companySearch]);

  useEffect(() => {
    if (debouncedSearchInput === companySearch) {
      return;
    }
    updateSearchParams({ companySearch: debouncedSearchInput || undefined });
  }, [companySearch, debouncedSearchInput, updateSearchParams]);

  const filters = useMemo<SubmissionListFilters>(
    () => ({
      status: status || undefined,
      brokerId: brokerId || undefined,
      companySearch: companySearch || undefined,
      createdFrom: createdFrom || undefined,
      createdTo: createdTo || undefined,
      hasDocuments: hasDocuments ? hasDocuments === 'true' : undefined,
      hasNotes: hasNotes ? hasNotes === 'true' : undefined,
      page: safePage,
    }),
    [brokerId, companySearch, createdFrom, createdTo, hasDocuments, hasNotes, safePage, status],
  );

  const handlers = useMemo(
    () => ({
      onStatusChange: (value: string) => updateSearchParams({ status: value || undefined }),
      onBrokerChange: (value: string) => updateSearchParams({ brokerId: value || undefined }),
      onCreatedFromChange: (value: string) =>
        updateSearchParams({ createdFrom: value || undefined }),
      onCreatedToChange: (value: string) => updateSearchParams({ createdTo: value || undefined }),
      onHasDocumentsChange: (value: string) =>
        updateSearchParams({ hasDocuments: value || undefined }),
      onHasNotesChange: (value: string) => updateSearchParams({ hasNotes: value || undefined }),
      onSortByChange: (value: string) => updateSearchParams({ sortBy: value || undefined }),
      onApplySavedView: (view: SavedViewPayload) => {
        const nextSearch = view.companySearch ?? '';
        setSearchInput(nextSearch);
        updateSearchParams({
          status: view.status || undefined,
          brokerId: view.brokerId || undefined,
          companySearch: nextSearch || undefined,
          createdFrom: view.createdFrom || undefined,
          createdTo: view.createdTo || undefined,
          hasDocuments: view.hasDocuments || undefined,
          hasNotes: view.hasNotes || undefined,
          sortBy: view.sortBy || undefined,
          page: undefined,
        });
      },
      onSearchInputChange: setSearchInput,
      onPageChange: (nextPage: number) =>
        updateSearchParams({ page: nextPage > 1 ? String(nextPage) : undefined }),
      onClear: () => {
        setSearchInput('');
        updateSearchParams({
          status: undefined,
          brokerId: undefined,
          companySearch: undefined,
          createdFrom: undefined,
          createdTo: undefined,
          hasDocuments: undefined,
          hasNotes: undefined,
          sortBy: undefined,
          page: undefined,
        });
      },
    }),
    [updateSearchParams],
  );

  return {
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
    ...handlers,
  };
}
