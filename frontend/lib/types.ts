export type SubmissionStatus = 'new' | 'in_review' | 'closed' | 'lost';
export type SubmissionPriority = 'high' | 'medium' | 'low';

export interface Broker {
  id: number;
  name: string;
  primary_contact_email: string | null;
}

export interface Company {
  id: number;
  legal_name: string;
  industry: string;
  headquarters_city: string;
}

export interface TeamMember {
  id: number;
  full_name: string;
  email: string;
}

export interface NoteSummary {
  author_name: string;
  body_preview: string;
  created_at: string;
}

export interface SubmissionListItem {
  id: number;
  status: SubmissionStatus;
  priority: SubmissionPriority;
  summary: string;
  created_at: string;
  updated_at: string;
  broker: Broker;
  company: Company;
  owner: TeamMember;
  document_count: number;
  note_count: number;
  latest_note: NoteSummary | null;
}

export interface Contact {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface Document {
  id: number;
  title: string;
  doc_type: string;
  uploaded_at: string;
  file_url: string;
}

export interface NoteDetail {
  id: number;
  author_name: string;
  body: string;
  created_at: string;
}

export interface SubmissionDetail extends Omit<
  SubmissionListItem,
  'document_count' | 'note_count' | 'latest_note'
> {
  contacts: Contact[];
  documents: Document[];
  notes: NoteDetail[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SubmissionListFilters {
  status?: SubmissionStatus;
  brokerId?: string;
  companySearch?: string;
  page?: number;
}
