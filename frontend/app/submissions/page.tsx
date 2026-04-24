'use client';

import {
  Alert,
  Button,
  Box,
  Chip,
  Card,
  CardContent,
  Container,
  Divider,
  LinearProgress,
  MenuItem,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { useBrokerOptions } from '@/lib/hooks/useBrokerOptions';
import { useSubmissionsList } from '@/lib/hooks/useSubmissions';
import { SubmissionStatus } from '@/lib/types';

const STATUS_OPTIONS: { label: string; value: SubmissionStatus | '' }[] = [
  { label: 'All statuses', value: '' },
  { label: 'New', value: 'new' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Closed', value: 'closed' },
  { label: 'Lost', value: 'lost' },
];

export default function SubmissionsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = (searchParams.get('status') as SubmissionStatus | null) ?? '';
  const brokerId = searchParams.get('brokerId') ?? '';
  const companyQuery = searchParams.get('companySearch') ?? '';
  const page = Number(searchParams.get('page') ?? '1');

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
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
      (updates.companySearch !== undefined && updates.companySearch !== companyQuery)
    ) {
      next.delete('page');
    }

    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const filters = useMemo(
    () => ({
      status: status || undefined,
      brokerId: brokerId || undefined,
      companySearch: companyQuery || undefined,
      page: Number.isNaN(page) || page < 1 ? 1 : page,
    }),
    [status, brokerId, companyQuery, page],
  );

  const submissionsQuery = useSubmissionsList(filters);
  const brokerQuery = useBrokerOptions();
  const totalPages = Math.max(1, Math.ceil((submissionsQuery.data?.count ?? 0) / 10));

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" component="h1">
            Submissions
          </Typography>
          <Typography color="text.secondary">
            Review incoming opportunities and drill into full submission details.
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                select
                label="Status"
                value={status}
                onChange={(event) =>
                  updateSearchParams({ status: event.target.value || undefined })
                }
                fullWidth
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value || 'all'} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Broker"
                value={brokerId}
                onChange={(event) =>
                  updateSearchParams({ brokerId: event.target.value || undefined })
                }
                fullWidth
                helperText={
                  brokerQuery.isError ? 'Unable to load broker options.' : 'Filter by broker'
                }
              >
                <MenuItem value="">All brokers</MenuItem>
                {brokerQuery.data?.map((broker) => (
                  <MenuItem key={broker.id} value={String(broker.id)}>
                    {broker.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Company search"
                value={companyQuery}
                onChange={(event) =>
                  updateSearchParams({ companySearch: event.target.value || undefined })
                }
                fullWidth
                helperText="Matches company name and submission summary"
              />
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                <Typography variant="h6">Submission list</Typography>
                <Chip
                  label={`${submissionsQuery.data?.count ?? 0} results`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
              {submissionsQuery.isFetching && <LinearProgress />}
              {submissionsQuery.isError && (
                <Alert
                  severity="error"
                  action={
                    <Button color="inherit" size="small" onClick={() => submissionsQuery.refetch()}>
                      Retry
                    </Button>
                  }
                >
                  Could not load submissions. Please verify the backend server is running.
                </Alert>
              )}
              {!submissionsQuery.isError && submissionsQuery.data?.results.length === 0 && (
                <Alert severity="info">No submissions match these filters.</Alert>
              )}
              <Divider />
              {!submissionsQuery.isError &&
                submissionsQuery.data &&
                submissionsQuery.data.results.length > 0 && (
                  <>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Company</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Broker</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell>Documents</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell>Last Updated</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {submissionsQuery.data.results.map((submission) => (
                            <TableRow
                              key={submission.id}
                              hover
                              sx={{ '&:last-child td': { borderBottom: 0 } }}
                            >
                              <TableCell>
                                <Stack spacing={0.25}>
                                  <Typography
                                    component={Link}
                                    href={`/submissions/${submission.id}`}
                                    sx={{
                                      color: 'primary.main',
                                      textDecoration: 'none',
                                      fontWeight: 600,
                                    }}
                                  >
                                    {submission.company.legal_name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {submission.summary}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell>
                                <Chip size="small" label={submission.status.replace('_', ' ')} />
                              </TableCell>
                              <TableCell>{submission.broker.name}</TableCell>
                              <TableCell>{submission.owner.full_name}</TableCell>
                              <TableCell>{submission.document_count}</TableCell>
                              <TableCell>{submission.note_count}</TableCell>
                              <TableCell>
                                {new Date(submission.updated_at).toLocaleDateString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box display="flex" justifyContent="flex-end" pt={1}>
                      <Pagination
                        count={totalPages}
                        page={Number.isNaN(page) || page < 1 ? 1 : page}
                        color="primary"
                        onChange={(_, nextPage) =>
                          updateSearchParams({
                            page: nextPage > 1 ? String(nextPage) : undefined,
                          })
                        }
                      />
                    </Box>
                  </>
                )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
