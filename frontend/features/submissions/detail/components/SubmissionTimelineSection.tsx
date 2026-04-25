'use client';

import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import { Paper, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

import { SectionTitle } from '@/features/submissions/detail/components/SectionTitle';
import { SubmissionDetail } from '@/lib/types';

type SubmissionTimelineSectionProps = {
  submission: SubmissionDetail;
};

type TimelineEvent = {
  label: string;
  at: string;
};

export function SubmissionTimelineSection({ submission }: SubmissionTimelineSectionProps) {
  const events = useMemo<TimelineEvent[]>(
    () =>
      [
        { label: 'Submission created', at: submission.createdAt },
        { label: 'Last updated', at: submission.updatedAt },
        submission.notes[0]
          ? { label: 'Most recent note', at: submission.notes[0].createdAt }
          : null,
        submission.documents[0]
          ? { label: 'Most recent document upload', at: submission.documents[0].uploadedAt }
          : null,
      ].filter((event): event is TimelineEvent => Boolean(event)),
    [submission],
  );

  return (
    <Paper sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
      <SectionTitle>Timeline</SectionTitle>
      <Stack spacing={1.25}>
        {events.map((event) => (
          <Stack key={`${event.label}-${event.at}`} direction="row" spacing={1} alignItems="center">
            <ScheduleOutlinedIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ flex: 1 }}>
              {event.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(event.at).toLocaleString()}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
