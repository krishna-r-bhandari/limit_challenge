'use client';

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EastIcon from '@mui/icons-material/East';
import { Avatar, Box, Stack, Typography } from '@mui/material';

import { avatarColorForString, initialsFromName, statusStyles, timeAgo } from '@/lib/submission-ui';
import { SubmissionListItem, SubmissionStatus } from '@/lib/types';

type Props = {
  submission: SubmissionListItem;
  selected: boolean;
  onClick: () => void;
};

const chip = (status: SubmissionStatus) => statusStyles[status];

export function SubmissionListCard({ submission, selected, onClick }: Props) {
  const now = Date.now();
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
        borderColor: selected ? 'primary.main' : 'rgba(15, 23, 42, 0.08)',
        bgcolor: selected ? 'rgba(79, 70, 229, 0.06)' : 'background.paper',
        boxShadow: selected
          ? '0 0 0 1px rgba(67, 56, 202, 0.25), 0 8px 24px rgba(15, 23, 42, 0.06)'
          : '0 2px 8px rgba(15, 23, 42, 0.04)',
        transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s',
        '&:hover': {
          borderColor: 'rgba(67, 56, 202, 0.35)',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
        },
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1.5}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
          <Avatar
            sx={{
              width: 44,
              height: 44,
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
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.25,
            py: 0.45,
            borderRadius: 2,
            bgcolor: c.bg,
            color: c.color,
            fontSize: '0.75rem',
            fontWeight: 600,
            flexShrink: 0,
            border: '1px solid',
            borderColor: 'transparent',
          }}
        >
          {c.label}
        </Box>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={2} alignItems="center" sx={{ mt: 1.75 }}>
        <Stack direction="row" alignItems="center" spacing={0.5} color="text.secondary">
          <ArticleOutlinedIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {submission.documentCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            docs
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5} color="text.secondary">
          <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {submission.noteCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            notes
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.disabled" sx={{ ml: 'auto' }}>
          {timeAgo(submission.updatedAt, now)}
        </Typography>
        <EastIcon sx={{ fontSize: 16, color: 'action.active' }} />
      </Stack>
    </Box>
  );
}
