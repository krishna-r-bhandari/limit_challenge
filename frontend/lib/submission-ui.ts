import { SubmissionStatus } from '@/lib/types';

export const statusStyles: Record<SubmissionStatus, { label: string; bg: string; color: string }> =
  {
    new: { label: 'New', bg: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' },
    in_review: { label: 'In Review', bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' },
    closed: { label: 'Closed Won', bg: 'rgba(34, 197, 94, 0.15)', color: '#22C55E' },
    lost: { label: 'Lost', bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' },
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
