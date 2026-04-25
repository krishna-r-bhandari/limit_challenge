'use client';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { useSubmissionDetail } from '@/lib/hooks/useSubmissions';

type SubmissionPreviewDrawerProps = {
  submissionId: number | null;
  onClose: () => void;
};

export function SubmissionPreviewDrawer({ submissionId, onClose }: SubmissionPreviewDrawerProps) {
  const detailQuery = useSubmissionDetail(submissionId ?? '');
  const submission = detailQuery.data;

  return (
    <Drawer anchor="right" open={Boolean(submissionId)} onClose={onClose}>
      <Box sx={{ width: { xs: 320, sm: 420 }, p: 2, height: '100%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={800}>
            Quick preview
          </Typography>
          <IconButton onClick={onClose} aria-label="Close preview">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        {detailQuery.isLoading ? (
          <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={28} />
          </Box>
        ) : detailQuery.isError ? (
          <Alert severity="error">Unable to load submission preview.</Alert>
        ) : !submission ? (
          <Typography color="text.secondary">Select a submission to preview details.</Typography>
        ) : (
          <Stack spacing={1.5}>
            <Typography variant="h6" fontWeight={700}>
              {submission.company.legalName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {submission.company.industry} · {submission.company.headquartersCity}
            </Typography>
            <Typography variant="body2">{submission.summary}</Typography>
            <Divider />
            <Typography variant="body2">
              <strong>Broker:</strong> {submission.broker.name}
            </Typography>
            <Typography variant="body2">
              <strong>Owner:</strong> {submission.owner.fullName}
            </Typography>
            <Typography variant="body2">
              <strong>Contacts:</strong> {submission.contacts.length}
            </Typography>
            <Typography variant="body2">
              <strong>Documents:</strong> {submission.documents.length}
            </Typography>
            <Typography variant="body2">
              <strong>Notes:</strong> {submission.notes.length}
            </Typography>
            <MuiLink
              component={Link}
              href={`/submissions/${submission.id}`}
              underline="none"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 1 }}
            >
              Open full details <ArrowOutwardIcon sx={{ fontSize: 16 }} />
            </MuiLink>
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}
