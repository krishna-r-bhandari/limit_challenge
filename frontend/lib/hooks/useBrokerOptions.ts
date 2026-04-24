'use client';

import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { Broker } from '@/lib/types';

type BrokerResponse = Broker[] | { results: Broker[] };

async function fetchBrokers() {
  const response = await apiClient.get<BrokerResponse>('/brokers/');
  return Array.isArray(response.data) ? response.data : (response.data.results ?? []);
}

export function useBrokerOptions() {
  return useQuery({
    queryKey: ['brokers'],
    queryFn: fetchBrokers,
    staleTime: 5 * 60_000,
  });
}
