'use client';

import { Box, Paper, Stack, Typography } from '@mui/material';

import { SectionTitle } from '@/features/submissions/detail/components/SectionTitle';
import { NoteDetail } from '@/lib/types';

type SubmissionNotesSectionProps = {
  notes: NoteDetail[];
};

export function SubmissionNotesSection({ notes }: SubmissionNotesSectionProps) {
  return (
    <Paper sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
      <SectionTitle>Activity Notes ({notes.length})</SectionTitle>
      {notes.length === 0 ? (
        <Typography sx={{ color: 'text.secondary' }}>No notes yet.</Typography>
      ) : (
        <Stack spacing={1.5}>
          {notes.map((note) => (
            <Box key={note.id} sx={{ p: 1.25, borderRadius: 1.5, bgcolor: 'action.hover' }}>
              <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
                {note.authorName} ·{' '}
                {new Date(note.createdAt).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
              <Typography sx={{ mt: 0.5, lineHeight: 1.6 }}>{note.body}</Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
