'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SubmissionContactsSection } from '@/features/submissions/detail/components/SubmissionContactsSection';
import { SubmissionDetailHero } from '@/features/submissions/detail/components/SubmissionDetailHero';
import { SubmissionDocumentsSection } from '@/features/submissions/detail/components/SubmissionDocumentsSection';
import { SubmissionMetadataSection } from '@/features/submissions/detail/components/SubmissionMetadataSection';
import { SubmissionNotesSection } from '@/features/submissions/detail/components/SubmissionNotesSection';
import { SubmissionSummarySection } from '@/features/submissions/detail/components/SubmissionSummarySection';
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
          <Box sx={{ py: 10, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
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
                <SubmissionContactsSection contacts={submission.contacts} />
              </Stack>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
