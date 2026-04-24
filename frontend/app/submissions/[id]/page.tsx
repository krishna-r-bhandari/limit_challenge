'use client';

import {
  Alert,
  Box,
  Chip,
  Card,
  CardContent,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useSubmissionDetail } from '@/lib/hooks/useSubmissions';

export default function SubmissionDetailPage() {
  const params = useParams<{ id: string }>();
  const submissionId = params?.id ?? '';

  const detailQuery = useSubmissionDetail(submissionId);
  const submission = detailQuery.data;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <div>
            <Typography variant="h4">Submission detail</Typography>
            <Typography color="text.secondary">
              Full submission context for review and triage.
            </Typography>
          </div>
          <MuiLink component={Link} href="/submissions" underline="none">
            Back to list
          </MuiLink>
        </Box>
        {detailQuery.isFetching && <LinearProgress />}
        {detailQuery.isError && (
          <Alert severity="error">Unable to load this submission. Please try again.</Alert>
        )}

        {submission && (
          <>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={1.5}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
                    <Typography variant="h6">{submission.company.legal_name}</Typography>
                    <Box display="flex" gap={1}>
                      <Chip size="small" label={submission.status.replace('_', ' ')} />
                      <Chip
                        size="small"
                        label={`${submission.priority} priority`}
                        color="primary"
                      />
                    </Box>
                  </Box>
                  <Typography color="text.secondary">{submission.summary}</Typography>
                  <Divider />
                  <Typography variant="body2">Broker: {submission.broker.name}</Typography>
                  <Typography variant="body2">Owner: {submission.owner.full_name}</Typography>
                  <Typography variant="body2">
                    Created: {new Date(submission.created_at).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Updated: {new Date(submission.updated_at).toLocaleString()}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Contacts</Typography>
                <List dense>
                  {submission.contacts.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No contacts available." />
                    </ListItem>
                  )}
                  {submission.contacts.map((contact) => (
                    <ListItem key={contact.id} divider>
                      <ListItemText
                        primary={`${contact.name} (${contact.role})`}
                        secondary={`${contact.email} • ${contact.phone}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Documents</Typography>
                <List dense>
                  {submission.documents.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No documents attached." />
                    </ListItem>
                  )}
                  {submission.documents.map((document) => (
                    <ListItem
                      key={document.id}
                      divider
                      component="a"
                      href={document.file_url}
                      target="_blank"
                      rel="noreferrer"
                      sx={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      <ListItemText
                        primary={document.title}
                        secondary={`${document.doc_type} • uploaded ${new Date(document.uploaded_at).toLocaleDateString()}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Notes</Typography>
                <List dense>
                  {submission.notes.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No notes yet." />
                    </ListItem>
                  )}
                  {submission.notes.map((note) => (
                    <ListItem key={note.id} divider alignItems="flex-start">
                      <ListItemText
                        primary={`${note.author_name} • ${new Date(note.created_at).toLocaleString()}`}
                        secondary={note.body}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </>
        )}
      </Stack>
    </Container>
  );
}
