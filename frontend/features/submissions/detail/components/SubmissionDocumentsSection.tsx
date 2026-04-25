'use client';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';

import { SectionTitle } from '@/features/submissions/detail/components/SectionTitle';
import { Document } from '@/lib/types';

type SubmissionDocumentsSectionProps = {
  documents: Document[];
};

export function SubmissionDocumentsSection({ documents }: SubmissionDocumentsSectionProps) {
  return (
    <Paper sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
      <SectionTitle>Documents ({documents.length})</SectionTitle>
      {documents.length === 0 ? (
        <Typography sx={{ color: 'text.secondary' }}>No documents attached.</Typography>
      ) : (
        <Stack spacing={0.25}>
          {documents.map((doc, index) => (
            <Box key={doc.id}>
              <Stack
                component="a"
                href={doc.fileUrl}
                target="_blank"
                rel="noreferrer"
                direction="row"
                alignItems="center"
                spacing={1.25}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  borderRadius: 1.5,
                  p: 1.1,
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <DescriptionOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{doc.title}</Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 12.5 }}>
                    {doc.docType} · uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Stack>
              {index < documents.length - 1 && <Divider />}
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
