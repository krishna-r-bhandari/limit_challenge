'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';
import { SubmissionListFilters, SubmissionStatus } from '@/lib/types';

type FilterUpdates = Record<string, string | undefined>;

export function useSubmissionListFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = (searchParams.get('status') as SubmissionStatus | null) ?? '';
  const brokerId = searchParams.get('brokerId') ?? '';
  const companySearch = searchParams.get('companySearch') ?? '';
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
        (updates.companySearch !== undefined && updates.companySearch !== companySearch)
      ) {
        next.delete('page');
      }

      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [brokerId, companySearch, pathname, router, searchParams, status],
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
      page: safePage,
    }),
    [brokerId, companySearch, safePage, status],
  );

  const handlers = useMemo(
    () => ({
      onStatusChange: (value: string) => updateSearchParams({ status: value || undefined }),
      onBrokerChange: (value: string) => updateSearchParams({ brokerId: value || undefined }),
      onSearchInputChange: setSearchInput,
      onPageChange: (nextPage: number) =>
        updateSearchParams({ page: nextPage > 1 ? String(nextPage) : undefined }),
      onClear: () => {
        setSearchInput('');
        updateSearchParams({
          status: undefined,
          brokerId: undefined,
          companySearch: undefined,
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
    safePage,
    filters,
    ...handlers,
  };
}
