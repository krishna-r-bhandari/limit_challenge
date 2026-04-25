'use client';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { memo } from 'react';

import { avatarColorForString, initialsFromName, statusStyles } from '@/lib/submission-ui';
import { SubmissionListItem, SubmissionStatus } from '@/lib/types';

type Props = {
  submission: SubmissionListItem;
  selected: boolean;
  onClick: () => void;
};

const chip = (status: SubmissionStatus) => statusStyles[status];

function SubmissionListCardComponent({ submission, selected, onClick }: Props) {
  const c = chip(submission.status);

  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      sx={{
        p: 2.25,
        borderRadius: 2.5,
        cursor: 'pointer',
        border: '1px solid',
        borderColor: selected ? 'primary.main' : 'divider',
        bgcolor: selected ? 'action.selected' : 'background.paper',
        boxShadow: (theme) =>
          selected
            ? theme.palette.mode === 'dark'
              ? '0 0 0 1px rgba(59, 130, 246, 0.35), 0 10px 24px rgba(0, 0, 0, 0.45)'
              : '0 0 0 1px rgba(37, 99, 235, 0.25), 0 8px 24px rgba(15, 23, 42, 0.06)'
            : theme.palette.mode === 'dark'
              ? '0 2px 10px rgba(0, 0, 0, 0.35)'
              : '0 2px 8px rgba(15, 23, 42, 0.04)',
        transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'action.hover',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 12px 28px rgba(0, 0, 0, 0.5)'
              : '0 12px 32px rgba(15, 23, 42, 0.08)',
        },
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1.5}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
          <Avatar
            sx={{
              width: 42,
              height: 42,
              fontSize: 15,
              fontWeight: 700,
              bgcolor: avatarColorForString(submission.company.legalName),
            }}
          >
            {initialsFromName(submission.company.legalName)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              fontWeight={700}
              fontSize="0.95rem"
              color="text.primary"
              noWrap
              lineHeight={1.35}
            >
              {submission.company.legalName}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap fontSize="0.8rem">
              {submission.company.industry} · {submission.broker.name}
            </Typography>
          </Box>
        </Stack>
        <Chip
          size="small"
          label={c.label}
          sx={{
            bgcolor: c.bg,
            color: c.color,
            fontWeight: 700,
            fontSize: '0.72rem',
            borderRadius: 2,
            flexShrink: 0,
          }}
        />
      </Stack>

      <Typography
        variant="body2"
        sx={{
          mt: 1.5,
          color: 'text.secondary',
          lineHeight: 1.55,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {submission.summary}
      </Typography>
      <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ mt: 1.25 }}>
        {submission.documentCount === 0 ? (
          <Chip size="small" label="Missing docs" color="warning" variant="outlined" />
        ) : null}
        {submission.noteCount === 0 ? (
          <Chip size="small" label="No notes" color="info" variant="outlined" />
        ) : null}
        {submission.status === 'in_review' && submission.noteCount < 2 ? (
          <Chip size="small" label="Needs follow-up" color="error" variant="outlined" />
        ) : null}
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={2} alignItems="center" sx={{ mt: 1.5 }}>
        <Stack direction="row" alignItems="center" spacing={0.5} color="text.secondary">
          <DescriptionOutlinedIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {submission.documentCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            docs
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5} color="text.secondary">
          <NotesOutlinedIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {submission.noteCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            notes
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.disabled" sx={{ ml: 'auto' }}>
          Updated {new Date(submission.updatedAt).toLocaleDateString()}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1.25 }}>
        <Button
          component={Link}
          href={`/submissions/${submission.id}`}
          size="small"
          endIcon={<ArrowOutwardIcon sx={{ fontSize: 16 }} />}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          Open details
        </Button>
      </Stack>
    </Box>
  );
}

export const SubmissionListCard = memo(SubmissionListCardComponent);
