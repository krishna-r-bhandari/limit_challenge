import { SubmissionStatus } from '@/lib/types';

export const STATUS_OPTIONS: { label: string; value: SubmissionStatus | '' }[] = [
  { label: 'All Statuses', value: '' },
  { label: 'New', value: 'new' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Closed', value: 'closed' },
  { label: 'Lost', value: 'lost' },
];
