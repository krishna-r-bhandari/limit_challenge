'use client';

import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SubmissionDetailSidebar } from '@/components/submissions/SubmissionDetailSidebar';
import { useSubmissionDetail } from '@/lib/hooks/useSubmissions';
import { avatarColorForString, initialsFromName, statusStyles } from '@/lib/submission-ui';
import { SubmissionStatus } from '@/lib/types';

const st = (status: SubmissionStatus) => statusStyles[status];

const priorityChip = (priority: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    high: { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' },
    medium: { bg: 'rgba(217, 119, 6, 0.1)', color: '#d97706' },
    low: { bg: 'rgba(22, 163, 74, 0.1)', color: '#16a34a' },
  };
  return map[priority] ?? { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' };
};

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: 10.5,
        fontWeight: 700,
        color: '#94a3b8',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        mb: 1.5,
      }}
    >
      {children}
    </Typography>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Stack direction="row" alignItems="flex-start" spacing={1.5}>
      <Box sx={{ color: '#94a3b8', mt: 0.2, flexShrink: 0 }}>{icon}</Box>
      <Box>
        <Typography sx={{ fontSize: 11, color: '#94a3b8', mb: 0.15 }}>{label}</Typography>
        <Typography sx={{ fontSize: 13.5, color: '#1e293b', fontWeight: 500 }}>{value}</Typography>
      </Box>
    </Stack>
  );
}

export default function SubmissionDetailPage() {
  const params = useParams<{ id: string }>();
  const submissionId = params?.id ?? '';

  const detailQuery = useSubmissionDetail(submissionId);
  const submission = detailQuery.data;

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #eef2ff 0%, #f0f4fb 28%, #f0f4fb 100%)',
      }}
    >
      <SubmissionDetailSidebar />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(120deg, #fff 0%, #fafbff 100%)',
            borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
            px: { xs: 2, md: 4 },
            py: 2.5,
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: 0,
              width: '45%',
              height: '100%',
              background:
                'radial-gradient(ellipse 70% 100% at 100% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 60%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Button
            component={Link}
            href="/submissions"
            startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
            sx={{
              color: '#64748b',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 13,
              display: { md: 'none' },
              mb: 1,
              p: 0,
            }}
          >
            Back
          </Button>
          {detailQuery.isFetching && !submission && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={18} />
              <Typography sx={{ color: '#64748b', fontSize: 14 }}>Loading submission…</Typography>
            </Box>
          )}
          {submission && (
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={2}
              sx={{ position: 'relative', zIndex: 1 }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#0d1226',
                    letterSpacing: '-0.02em',
                    mb: 0.75,
                  }}
                >
                  {submission.company.legalName}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 1.25,
                      py: 0.4,
                      borderRadius: 1.5,
                      bgcolor: st(submission.status).bg,
                      color: st(submission.status).color,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {st(submission.status).label}
                  </Box>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 1.25,
                      py: 0.4,
                      borderRadius: 1.5,
                      bgcolor: priorityChip(submission.priority).bg,
                      color: priorityChip(submission.priority).color,
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                  >
                    {submission.priority} priority
                  </Box>
                </Stack>
              </Box>
              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#e2e8f0',
                    color: '#64748b',
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: 13,
                  }}
                >
                  Reject
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#0d1226',
                    '&:hover': { bgcolor: '#1e3a5f' },
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: 13,
                  }}
                >
                  Approve
                </Button>
              </Stack>
            </Stack>
          )}
        </Box>

        {detailQuery.isFetching && submission && <LinearProgress sx={{ height: 2 }} />}

        {detailQuery.isError && (
          <Box sx={{ p: 4 }}>
            <Alert severity="error">Unable to load this submission. Please try again.</Alert>
          </Box>
        )}

        {submission && (
          <Box
            sx={{
              px: { xs: 2, md: 4 },
              py: 3,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 360px' },
              gap: 3,
              alignItems: 'flex-start',
            }}
          >
            <Stack spacing={3}>
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: 2.5,
                  border: '1px solid #e8edf3',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                  p: 3,
                }}
              >
                <SectionHeader>Overview</SectionHeader>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: '#475569',
                    lineHeight: 1.7,
                    mb: 3,
                  }}
                >
                  {submission.summary}
                </Typography>
                <Divider sx={{ mb: 2.5, borderColor: '#f1f5f9' }} />
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2.5,
                  }}
                >
                  <InfoRow
                    icon={<BusinessOutlinedIcon sx={{ fontSize: 18 }} />}
                    label="Broker"
                    value={submission.broker.name}
                  />
                  <InfoRow
                    icon={<PersonOutlineIcon sx={{ fontSize: 18 }} />}
                    label="Owner"
                    value={submission.owner.fullName}
                  />
                  <InfoRow
                    icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} />}
                    label="Created"
                    value={new Date(submission.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  />
                  <InfoRow
                    icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} />}
                    label="Last Updated"
                    value={new Date(submission.updatedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: 2.5,
                  border: '1px solid #e8edf3',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                  p: 3,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <ArticleOutlinedIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                  <SectionHeader>Documents ({submission.documents.length})</SectionHeader>
                </Stack>
                {submission.documents.length === 0 ? (
                  <Typography sx={{ fontSize: 13.5, color: '#94a3b8', py: 1 }}>
                    No documents attached.
                  </Typography>
                ) : (
                  <Stack spacing={0.5}>
                    {submission.documents.map((doc, idx) => (
                      <Box key={doc.id}>
                        <Box
                          component="a"
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            p: 1.5,
                            borderRadius: 1.5,
                            textDecoration: 'none',
                            '&:hover': { bgcolor: '#f8fafc' },
                            cursor: 'pointer',
                          }}
                        >
                          <DescriptionOutlinedIcon
                            sx={{ fontSize: 20, color: '#3b82f6', flexShrink: 0 }}
                          />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontSize: 13.5,
                                fontWeight: 600,
                                color: '#1e293b',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {doc.title}
                            </Typography>
                            <Typography sx={{ fontSize: 11.5, color: '#94a3b8' }}>
                              {doc.docType} &middot; uploaded{' '}
                              {new Date(doc.uploadedAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                        {idx < submission.documents.length - 1 && (
                          <Divider sx={{ borderColor: '#f8fafc' }} />
                        )}
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>
            </Stack>

            <Stack spacing={3}>
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: 2.5,
                  border: '1px solid #e8edf3',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                  p: 3,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <EmailOutlinedIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                  <SectionHeader>Key Contacts</SectionHeader>
                </Stack>
                {submission.contacts.length === 0 ? (
                  <Typography sx={{ fontSize: 13.5, color: '#94a3b8', py: 1 }}>
                    No contacts found.
                  </Typography>
                ) : (
                  <Stack spacing={1.5}>
                    {submission.contacts.map((contact) => (
                      <Stack
                        key={contact.id}
                        direction="row"
                        alignItems="flex-start"
                        spacing={1.5}
                        sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 1.5 }}
                      >
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            fontSize: 13,
                            fontWeight: 700,
                            bgcolor: avatarColorForString(contact.name),
                            flexShrink: 0,
                          }}
                        >
                          {initialsFromName(contact.name)}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: 13.5,
                              fontWeight: 600,
                              color: '#0d1226',
                              lineHeight: 1.3,
                            }}
                          >
                            {contact.name}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: '#64748b', mb: 0.75 }}>
                            {contact.role}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <EmailOutlinedIcon sx={{ fontSize: 12, color: '#94a3b8' }} />
                            <Typography
                              sx={{
                                fontSize: 11.5,
                                color: '#64748b',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {contact.email}
                            </Typography>
                          </Stack>
                          {contact.phone && (
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={0.5}
                              sx={{ mt: 0.25 }}
                            >
                              <PhoneOutlinedIcon sx={{ fontSize: 12, color: '#94a3b8' }} />
                              <Typography sx={{ fontSize: 11.5, color: '#64748b' }}>
                                {contact.phone}
                              </Typography>
                            </Stack>
                          )}
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Box>

              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: 2.5,
                  border: '1px solid #e8edf3',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                  p: 3,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <ChatBubbleOutlineIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                  <SectionHeader>Activity Notes</SectionHeader>
                </Stack>
                {submission.notes.length === 0 ? (
                  <Typography sx={{ fontSize: 13.5, color: '#94a3b8', py: 1 }}>
                    No notes yet.
                  </Typography>
                ) : (
                  <Stack spacing={0}>
                    {submission.notes.map((note, idx) => (
                      <Stack
                        key={note.id}
                        direction="row"
                        spacing={1.5}
                        sx={{
                          position: 'relative',
                          pb: idx < submission.notes.length - 1 ? 2.5 : 0,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: idx === 0 ? '#3b82f6' : '#cbd5e1',
                              mt: 0.6,
                              flexShrink: 0,
                            }}
                          />
                          {idx < submission.notes.length - 1 && (
                            <Box sx={{ width: 1, flex: 1, bgcolor: '#e2e8f0', my: 0.5 }} />
                          )}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0, pb: 0.5 }}>
                          <Typography sx={{ fontSize: 11, color: '#94a3b8', mb: 0.5 }}>
                            {note.authorName} &middot;{' '}
                            {new Date(note.createdAt).toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: '#1e293b', lineHeight: 1.6 }}>
                            {note.body}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Box>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
}
