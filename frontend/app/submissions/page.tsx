'use client';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo, useState } from 'react';

import { SubmissionListCard } from '@/components/submissions/SubmissionListCard';
import { SubmissionsSidebar } from '@/components/submissions/SubmissionsSidebar';
import { useBrokerOptions } from '@/lib/hooks/useBrokerOptions';
import { useSubmissionDetail, useSubmissionsList } from '@/lib/hooks/useSubmissions';
import {
  avatarColorForString,
  initialsFromName,
  statusStyles,
  timeAgo,
} from '@/lib/submission-ui';
import { SubmissionListItem, SubmissionStatus } from '@/lib/types';

const STATUS_OPTIONS: { label: string; value: SubmissionStatus | '' }[] = [
  { label: 'All Statuses', value: '' },
  { label: 'New', value: 'new' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Closed', value: 'closed' },
  { label: 'Lost', value: 'lost' },
];

const st = (status: SubmissionStatus) => statusStyles[status];

function MetricCard({
  label,
  value,
  sub,
  subColor,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  subColor?: string;
  accent?: boolean;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: 'white',
        borderRadius: 2,
        p: 2.5,
        border: '1px solid #e8edf3',
        borderLeft: accent ? '3px solid #3b82f6' : '1px solid #e8edf3',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        minWidth: 140,
      }}
    >
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 600,
          color: '#94a3b8',
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          mb: 0.75,
        }}
      >
        {label}
      </Typography>
      <Stack direction="row" alignItems="baseline" spacing={1}>
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#0d1226', lineHeight: 1 }}>
          {value}
        </Typography>
        {sub && (
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: subColor ?? '#64748b' }}>
            {sub}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

function RightPanel({ submissionId, onClose }: { submissionId: number; onClose: () => void }) {
  const { data, isLoading } = useSubmissionDetail(submissionId);

  return (
    <Box
      sx={{
        width: 320,
        flexShrink: 0,
        bgcolor: 'white',
        borderLeft: '1px solid #e8edf3',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.06)',
      }}
    >
      {isLoading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <CircularProgress size={28} />
        </Box>
      ) : data ? (
        <>
          <Box sx={{ px: 2.5, pt: 2.5, pb: 2, borderBottom: '1px solid #f1f5f9' }}>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#0d1226', mb: 0.75 }}>
                  {data.company.legalName}
                </Typography>
                <Chip
                  size="small"
                  label={st(data.status).label}
                  sx={{
                    bgcolor: st(data.status).bg,
                    color: st(data.status).color,
                    fontWeight: 600,
                    fontSize: 11,
                    height: 22,
                    borderRadius: 1,
                  }}
                />
              </Box>
              <IconButton size="small" onClick={onClose} sx={{ color: '#94a3b8' }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', px: 2.5, py: 2 }}>
            <Stack spacing={3}>
              {data.contacts.length > 0 && (
                <Box>
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
                    Key Contacts
                  </Typography>
                  <Stack spacing={1}>
                    {data.contacts.slice(0, 3).map((contact) => (
                      <Stack
                        key={contact.id}
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        sx={{ p: 1.25, bgcolor: '#f8fafc', borderRadius: 1.5 }}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            fontSize: 12,
                            bgcolor: avatarColorForString(contact.name),
                            flexShrink: 0,
                          }}
                        >
                          {initialsFromName(contact.name)}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: 12.5,
                              fontWeight: 600,
                              color: '#0d1226',
                              lineHeight: 1.3,
                            }}
                          >
                            {contact.name}
                          </Typography>
                          <Typography sx={{ fontSize: 11, color: '#64748b' }}>
                            {contact.role}
                          </Typography>
                        </Box>
                        <Tooltip title={contact.email}>
                          <IconButton size="small" sx={{ color: '#94a3b8' }}>
                            <EmailOutlinedIcon sx={{ fontSize: 15 }} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              {data.documents.length > 0 && (
                <Box>
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
                    Documents ({data.documents.length})
                  </Typography>
                  <Stack spacing={0.75}>
                    {data.documents.slice(0, 4).map((doc) => (
                      <Stack
                        key={doc.id}
                        direction="row"
                        alignItems="center"
                        spacing={1.25}
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          '&:hover': { bgcolor: '#f8fafc' },
                          cursor: 'pointer',
                        }}
                      >
                        <DescriptionOutlinedIcon
                          sx={{ fontSize: 18, color: '#3b82f6', flexShrink: 0 }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: 12,
                              color: '#0d1226',
                              fontWeight: 500,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {doc.title}
                          </Typography>
                          <Typography sx={{ fontSize: 10.5, color: '#94a3b8' }}>
                            {doc.docType}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              {data.notes.length > 0 && (
                <Box>
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
                    Activity Notes
                  </Typography>
                  <Stack spacing={0}>
                    {data.notes.slice(0, 4).map((note, idx) => (
                      <Stack
                        key={note.id}
                        direction="row"
                        spacing={1.5}
                        sx={{
                          pb: idx < Math.min(data.notes.length, 4) - 1 ? 2 : 0,
                          position: 'relative',
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
                              mt: 0.5,
                              flexShrink: 0,
                            }}
                          />
                          {idx < Math.min(data.notes.length, 4) - 1 && (
                            <Box sx={{ width: 1, flex: 1, bgcolor: '#e2e8f0', my: 0.5 }} />
                          )}
                        </Box>
                        <Box sx={{ pb: 0.5 }}>
                          <Typography sx={{ fontSize: 10.5, color: '#94a3b8', mb: 0.4 }}>
                            {new Date(note.createdAt).toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: '#1e293b', lineHeight: 1.5 }}>
                            <strong>{note.authorName}</strong> {note.body}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </Box>

          <Box sx={{ px: 2.5, py: 2, borderTop: '1px solid #f1f5f9', display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={onClose}
              sx={{
                borderColor: '#e2e8f0',
                color: '#64748b',
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              href={`/submissions/${submissionId}`}
              sx={{
                bgcolor: '#0d1226',
                '&:hover': { bgcolor: '#1e3a5f' },
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Full record
            </Button>
          </Box>
        </>
      ) : null}
    </Box>
  );
}

function SubmissionRow({
  submission,
  selected,
  onClick,
}: {
  submission: SubmissionListItem;
  selected: boolean;
  onClick: () => void;
}) {
  const chip = st(submission.status);
  const now = new Date().getTime();

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'grid',
        gridTemplateColumns: '2fr 120px 180px 70px 70px 90px 36px',
        alignItems: 'center',
        px: 2.5,
        py: 1.75,
        cursor: 'pointer',
        bgcolor: selected ? '#eff6ff' : 'transparent',
        borderLeft: selected ? '3px solid #3b82f6' : '3px solid transparent',
        '&:hover': { bgcolor: selected ? '#eff6ff' : '#f8fafc' },
        transition: 'background 0.1s',
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
        <Avatar
          sx={{
            width: 34,
            height: 34,
            fontSize: 13,
            fontWeight: 700,
            bgcolor: avatarColorForString(submission.company.legalName),
            flexShrink: 0,
          }}
        >
          {initialsFromName(submission.company.legalName)}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 13.5,
              fontWeight: 600,
              color: '#0d1226',
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {submission.company.legalName}
          </Typography>
          <Typography
            sx={{
              fontSize: 11.5,
              color: '#94a3b8',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {submission.company.industry}
          </Typography>
        </Box>
      </Stack>

      <Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.25,
            py: 0.4,
            borderRadius: 1.5,
            bgcolor: chip.bg,
            color: chip.color,
            fontSize: 11.5,
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {chip.label}
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontSize: 12.5, color: '#475569', fontWeight: 500 }}>
          {submission.broker.name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 0.25 }}>
          <Avatar
            sx={{
              width: 18,
              height: 18,
              fontSize: 9,
              bgcolor: avatarColorForString(submission.owner.fullName),
            }}
          >
            {initialsFromName(submission.owner.fullName)}
          </Avatar>
          <Typography sx={{ fontSize: 11.5, color: '#94a3b8' }}>
            {submission.owner.fullName.split(' ')[0]} {submission.owner.fullName.split(' ')[1]?.[0]}
            .
          </Typography>
        </Stack>
      </Box>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <ArticleOutlinedIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
        <Typography sx={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>
          {submission.documentCount}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <ChatBubbleOutlineIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
        <Typography sx={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>
          {submission.noteCount}
        </Typography>
      </Stack>

      <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>
        {timeAgo(submission.updatedAt, now)}
      </Typography>

      <ChevronRightIcon sx={{ fontSize: 18, color: '#cbd5e1' }} />
    </Box>
  );
}

export default function SubmissionsPageWrapper() {
  return (
    <Suspense>
      <SubmissionsPage />
    </Suspense>
  );
}

function SubmissionsPage() {
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = (searchParams.get('status') as SubmissionStatus | null) ?? '';
  const brokerId = searchParams.get('brokerId') ?? '';
  const companyQuery = searchParams.get('companySearch') ?? '';
  const page = Number(searchParams.get('page') ?? '1');

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        next.delete(key);
        return;
      }
      next.set(key, value);
    });
    if (
      (updates.status !== undefined && updates.status !== status) ||
      (updates.brokerId !== undefined && updates.brokerId !== brokerId) ||
      (updates.companySearch !== undefined && updates.companySearch !== companyQuery)
    ) {
      next.delete('page');
    }
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const filters = useMemo(
    () => ({
      status: status || undefined,
      brokerId: brokerId || undefined,
      companySearch: companyQuery || undefined,
      page: Number.isNaN(page) || page < 1 ? 1 : page,
    }),
    [status, brokerId, companyQuery, page],
  );

  const submissionsQuery = useSubmissionsList(filters);
  const brokerQuery = useBrokerOptions();
  const totalPages = Math.max(1, Math.ceil((submissionsQuery.data?.count ?? 0) / 10));
  const total = submissionsQuery.data?.count ?? 0;
  const results = submissionsQuery.data?.results ?? [];

  const inReview = results.filter((s) => s.status === 'in_review').length;
  const closed = results.filter((s) => s.status === 'closed').length;
  const lost = results.filter((s) => s.status === 'lost').length;

  const tabs = ['Overview', 'Analytics', 'Archive'];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f7fb' }}>
      <SubmissionsSidebar />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(120deg, #fff 0%, #f8fafc 100%)',
            borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
            px: 3,
            pt: 2.5,
            pb: 0,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '42%',
              height: '100%',
              background:
                'radial-gradient(ellipse 80% 100% at 100% 0%, rgba(79, 70, 229, 0.09) 0%, transparent 65%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 0.5, position: 'relative', zIndex: 1 }}
          >
            <Box>
            <Typography
              sx={{ fontSize: 22, fontWeight: 800, color: '#0d1226', letterSpacing: '-0.02em' }}
            >
              Submission Tracker
            </Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', fontWeight: 500, mt: 0.25 }}>
              Filter the pipeline, preview context, and open the full record when you need it.
            </Typography>
            </Box>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TextField
                size="small"
                placeholder="Search…"
                value={companyQuery}
                onChange={(e) => updateSearchParams({ companySearch: e.target.value || undefined })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: 200,
                  '& .MuiOutlinedInput-root': {
                    fontSize: 13,
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    '& fieldset': { borderColor: '#e8edf3' },
                    '&:hover fieldset': { borderColor: '#cbd5e1' },
                  },
                }}
              />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={0}>
            {tabs.map((tab, i) => (
              <Box
                key={tab}
                onClick={() => setActiveTab(i)}
                sx={{
                  px: 1.75,
                  py: 1.25,
                  cursor: 'pointer',
                  fontSize: 13.5,
                  fontWeight: activeTab === i ? 700 : 500,
                  color: activeTab === i ? '#1d4ed8' : '#64748b',
                  borderBottom: activeTab === i ? '2.5px solid #3b82f6' : '2.5px solid transparent',
                  '&:hover': { color: '#1d4ed8' },
                  transition: 'all 0.15s',
                }}
              >
                {tab}
              </Box>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            p: { xs: 2, md: 3 },
            display: 'flex',
            gap: 3,
            alignItems: 'flex-start',
            minWidth: 0,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <MetricCard
                label="Total (filtered)"
                value={total.toLocaleString()}
                sub="matches your filters"
                subColor="#64748b"
                accent
              />
              <MetricCard
                label="In review (page)"
                value={inReview}
                sub="this page"
                subColor="#64748b"
              />
              <MetricCard
                label="Closed won (page)"
                value={closed}
                sub="this page"
                subColor="#64748b"
              />
              <MetricCard
                label="Lost (page)"
                value={lost}
                sub="this page"
                subColor="#94a3b8"
              />
            </Stack>

            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: 2.5,
                border: '1px solid #e8edf3',
                overflow: 'hidden',
                boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ px: 2.5, py: 2, borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap', gap: 1 }}
              >
                <Select
                  size="small"
                  value={status}
                  onChange={(e) => updateSearchParams({ status: e.target.value || undefined })}
                  displayEmpty
                  sx={{
                    fontSize: 13,
                    minWidth: 140,
                    bgcolor: '#f8fafc',
                    borderRadius: 1.5,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e8edf3' },
                  }}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value || 'all'} value={opt.value} sx={{ fontSize: 13 }}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>

                <Select
                  size="small"
                  value={brokerId}
                  onChange={(e) => updateSearchParams({ brokerId: e.target.value || undefined })}
                  displayEmpty
                  sx={{
                    fontSize: 13,
                    minWidth: 140,
                    bgcolor: '#f8fafc',
                    borderRadius: 1.5,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e8edf3' },
                  }}
                >
                  <MenuItem value="" sx={{ fontSize: 13 }}>
                    All Brokers
                  </MenuItem>
                  {brokerQuery.data?.map((broker) => (
                    <MenuItem key={broker.id} value={String(broker.id)} sx={{ fontSize: 13 }}>
                      {broker.name}
                    </MenuItem>
                  ))}
                </Select>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1.5,
                    py: 0.75,
                    bgcolor: '#f8fafc',
                    border: '1px solid #e8edf3',
                    borderRadius: 1.5,
                  }}
                >
                  <TuneIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                  <Typography sx={{ fontSize: 13, color: '#475569' }}>S</Typography>
                </Box>

                <Button
                  variant="text"
                  size="small"
                  onClick={() =>
                    updateSearchParams({
                      status: undefined,
                      brokerId: undefined,
                      companySearch: undefined,
                      page: undefined,
                    })
                  }
                  sx={{ fontSize: 13, color: '#64748b', textTransform: 'none', ml: 'auto' }}
                >
                  Clear Filters
                </Button>
              </Stack>

              <Box
                sx={{
                  display: { xs: 'none', md: 'grid' },
                  gridTemplateColumns: '2fr 120px 180px 70px 70px 90px 36px',
                  px: 2.5,
                  py: 1.25,
                  bgcolor: '#f8fafc',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                {['COMPANY', 'STATUS', 'BROKER & OWNER', 'DOCS', 'NOTES', 'UPDATED', ''].map(
                  (col) => (
                    <Typography
                      key={col}
                      sx={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: '#94a3b8',
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {col}
                    </Typography>
                  ),
                )}
              </Box>

              {submissionsQuery.isFetching && <LinearProgress sx={{ height: 2 }} />}

              {submissionsQuery.isError && (
                <Alert
                  severity="error"
                  sx={{ m: 2 }}
                  action={
                    <Button size="small" onClick={() => submissionsQuery.refetch()}>
                      Retry
                    </Button>
                  }
                >
                  Could not load submissions. Verify the backend server is running.
                </Alert>
              )}

              {!submissionsQuery.isError &&
                results.length === 0 &&
                !submissionsQuery.isFetching && (
                  <Box sx={{ py: 6, textAlign: 'center', color: '#94a3b8' }}>
                    <Typography>No submissions match these filters.</Typography>
                  </Box>
                )}

              <Stack
                spacing={1.5}
                sx={{ display: { xs: 'flex', md: 'none' }, p: 2 }}
              >
                {results.map((submission) => (
                  <SubmissionListCard
                    key={submission.id}
                    submission={submission}
                    selected={false}
                    onClick={() => router.push(`/submissions/${submission.id}`)}
                  />
                ))}
              </Stack>

              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {results.map((submission, idx) => (
                  <Box key={submission.id}>
                    <SubmissionRow
                      submission={submission}
                      selected={selectedId === submission.id}
                      onClick={() =>
                        setSelectedId(
                          selectedId === submission.id ? null : submission.id,
                        )
                      }
                    />
                    {idx < results.length - 1 && (
                      <Divider sx={{ mx: 2.5, borderColor: '#f1f5f9' }} />
                    )}
                  </Box>
                ))}
              </Box>

              {totalPages > 1 && (
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  sx={{ px: 2.5, py: 2, borderTop: '1px solid #f1f5f9' }}
                >
                  <Pagination
                    count={totalPages}
                    page={Number.isNaN(page) || page < 1 ? 1 : page}
                    color="primary"
                    size="small"
                    onChange={(_, nextPage) =>
                      updateSearchParams({ page: nextPage > 1 ? String(nextPage) : undefined })
                    }
                  />
                </Stack>
              )}
            </Box>
          </Box>

          {selectedId !== null && !isNarrow && (
            <RightPanel submissionId={selectedId} onClose={() => setSelectedId(null)} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
