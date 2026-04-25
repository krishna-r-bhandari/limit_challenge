import { SubmissionStatus } from '@/lib/types';

export const STATUS_OPTIONS: { label: string; value: SubmissionStatus | '' }[] = [
  { label: 'All Statuses', value: '' },
  { label: 'New', value: 'new' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Closed', value: 'closed' },
  { label: 'Lost', value: 'lost' },
];

export const BOOLEAN_FILTER_OPTIONS: { label: string; value: string }[] = [
  { label: 'Any', value: '' },
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
];

export const SORT_OPTIONS: { label: string; value: string }[] = [
  { label: 'Last Updated (Newest)', value: 'updated_desc' },
  { label: 'Last Updated (Oldest)', value: 'updated_asc' },
  { label: 'Created (Newest)', value: 'created_desc' },
  { label: 'Created (Oldest)', value: 'created_asc' },
  { label: 'Docs (High to Low)', value: 'docs_desc' },
  { label: 'Notes (High to Low)', value: 'notes_desc' },
  { label: 'Company (A-Z)', value: 'company_asc' },
];
