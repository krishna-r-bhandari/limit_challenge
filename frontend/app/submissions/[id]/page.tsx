'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Box, Button, Paper, Skeleton, Stack } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SubmissionContactsSection } from '@/features/submissions/detail/components/SubmissionContactsSection';
import { SubmissionDetailHero } from '@/features/submissions/detail/components/SubmissionDetailHero';
import { SubmissionDocumentsSection } from '@/features/submissions/detail/components/SubmissionDocumentsSection';
import { SubmissionMetadataSection } from '@/features/submissions/detail/components/SubmissionMetadataSection';
import { SubmissionNotesSection } from '@/features/submissions/detail/components/SubmissionNotesSection';
import { SubmissionSummarySection } from '@/features/submissions/detail/components/SubmissionSummarySection';
import { SubmissionTimelineSection } from '@/features/submissions/detail/components/SubmissionTimelineSection';
import { useSubmissionDetail } from '@/lib/hooks/useSubmissions';

export default function SubmissionDetailPage() {
  const params = useParams<{ id: string }>();
  const submissionId = params?.id ?? '';
  const detailQuery = useSubmissionDetail(submissionId);
  const submission = detailQuery.data;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1160, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
        <Button
          component={Link}
          href="/submissions"
          startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
          sx={{ textTransform: 'none', mb: 2 }}
        >
          Back to submissions
        </Button>

        {detailQuery.isLoading ? (
          <>
            <Paper sx={{ p: { xs: 2, md: 2.5 }, border: '1px solid', borderColor: 'divider' }}>
              <Skeleton variant="text" width="42%" height={42} />
              <Skeleton variant="text" width="35%" height={30} />
            </Paper>
            <Box
              sx={{
                mt: 2.5,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' },
                gap: 2.5,
              }}
            >
              <Stack spacing={2.5}>
                <Paper sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
                  <Skeleton variant="text" width="35%" height={28} />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="95%" />
                  <Skeleton variant="text" width="88%" />
                </Paper>
                <Paper sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
                  <Skeleton variant="text" width="30%" height={28} />
                  <Skeleton variant="rounded" height={44} />
                  <Skeleton variant="rounded" height={44} sx={{ mt: 1 }} />
                </Paper>
              </Stack>
              <Stack spacing={2.5}>
                <Paper sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
                  <Skeleton variant="text" width="45%" height={28} />
                  <Skeleton variant="text" width="70%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="66%" />
                </Paper>
                <Paper sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
                  <Skeleton variant="text" width="28%" height={28} />
                  <Skeleton variant="text" width="92%" />
                  <Skeleton variant="text" width="89%" />
                </Paper>
              </Stack>
            </Box>
          </>
        ) : detailQuery.isError ? (
          <Alert severity="error">Unable to load this submission. Please try again.</Alert>
        ) : submission ? (
          <>
            <SubmissionDetailHero submission={submission} />

            <Box
              sx={{
                mt: 2.5,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' },
                gap: 2.5,
                alignItems: 'start',
              }}
            >
              <Stack spacing={2.5}>
                <SubmissionSummarySection summary={submission.summary} />
                <SubmissionDocumentsSection documents={submission.documents} />
                <SubmissionNotesSection notes={submission.notes} />
              </Stack>

              <Stack spacing={2.5}>
                <SubmissionMetadataSection submission={submission} />
                <SubmissionTimelineSection submission={submission} />
                <SubmissionContactsSection contacts={submission.contacts} />
              </Stack>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
