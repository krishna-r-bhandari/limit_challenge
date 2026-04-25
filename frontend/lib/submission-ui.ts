import { SubmissionStatus } from '@/lib/types';

export const statusStyles: Record<
  SubmissionStatus,
  { label: string; bg: string; color: string }
> = {
  new: { label: 'New', bg: 'rgba(124, 58, 237, 0.12)', color: '#5b21b6' },
  in_review: { label: 'In Review', bg: 'rgba(37, 99, 235, 0.12)', color: '#1d4ed8' },
  closed: { label: 'Closed Won', bg: 'rgba(22, 163, 74, 0.12)', color: '#15803d' },
  lost: { label: 'Lost', bg: 'rgba(100, 116, 139, 0.12)', color: '#64748b' },
};

export function initialsFromName(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function avatarColorForString(seed: string) {
  const colors = ['#6366f1', '#3b82f6', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function timeAgo(dateStr: string, now: number) {
  const diff = now - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (h < 1) return 'just now';
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}
