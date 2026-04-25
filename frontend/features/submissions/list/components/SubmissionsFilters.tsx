'use client';

import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  BOOLEAN_FILTER_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from '@/features/submissions/list/constants';
import { Broker } from '@/lib/types';

type SubmissionsFiltersProps = {
  searchInput: string;
  status: string;
  brokerId: string;
  createdFrom: string;
  createdTo: string;
  hasDocuments: string;
  hasNotes: string;
  sortBy: string;
  brokers: Broker[];
  onSearchInputChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onBrokerChange: (value: string) => void;
  onCreatedFromChange: (value: string) => void;
  onCreatedToChange: (value: string) => void;
  onHasDocumentsChange: (value: string) => void;
  onHasNotesChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
};

export function SubmissionsFilters({
  searchInput,
  status,
  brokerId,
  createdFrom,
  createdTo,
  hasDocuments,
  hasNotes,
  sortBy,
  brokers,
  onSearchInputChange,
  onStatusChange,
  onBrokerChange,
  onCreatedFromChange,
  onCreatedToChange,
  onHasDocumentsChange,
  onHasNotesChange,
  onSortByChange,
  onClear,
  isLoading = false,
}: SubmissionsFiltersProps) {
  const dateFieldSx = (theme: { palette: { mode: string } }) => ({
    '& .MuiInputBase-input[type="date"]': {
      colorScheme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
    '& .MuiInputBase-input[type="date"]::-webkit-calendar-picker-indicator': {
      opacity: 0,
      cursor: 'pointer',
      position: 'absolute',
      right: 8,
      width: 24,
      height: 24,
    },
  });

  return (
    <Paper sx={{ mt: 3, p: 2, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
        spacing={1}
        sx={{ mb: 2 }}
      >
        <Typography variant="body2" color="text.secondary">
          Filters, sorting, and saved views are URL-backed and shareable.
        </Typography>
      </Stack>

      {isLoading ? (
        <Stack spacing={1.5}>
          <Skeleton variant="rounded" height={40} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Skeleton variant="rounded" height={40} sx={{ flex: 1 }} />
            <Skeleton variant="rounded" height={40} sx={{ flex: 1 }} />
            <Skeleton variant="rounded" height={40} sx={{ flex: 1 }} />
          </Stack>
        </Stack>
      ) : (
        <>
          <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search company..."
                value={searchInput}
                onChange={(event) => onSearchInputChange(event.target.value)}
                inputProps={{ 'aria-label': 'Search company or summary' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Select
                fullWidth
                size="small"
                value={status}
                displayEmpty
                inputProps={{ 'aria-label': 'Filter by status' }}
                onChange={(event) => onStatusChange(event.target.value)}
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value || 'all-status'} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Select
                fullWidth
                size="small"
                value={brokerId}
                displayEmpty
                inputProps={{ 'aria-label': 'Filter by broker' }}
                onChange={(event) => onBrokerChange(event.target.value)}
              >
                <MenuItem value="">All Brokers</MenuItem>
                {brokers.map((broker) => (
                  <MenuItem key={broker.id} value={String(broker.id)}>
                    {broker.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Created from"
                InputLabelProps={{ shrink: true }}
                value={createdFrom}
                onChange={(event) => onCreatedFromChange(event.target.value)}
                inputProps={{ 'aria-label': 'Created from date' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ pointerEvents: 'none' }}>
                      <CalendarMonthOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={dateFieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Created to"
                InputLabelProps={{ shrink: true }}
                value={createdTo}
                onChange={(event) => onCreatedToChange(event.target.value)}
                inputProps={{ 'aria-label': 'Created to date' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ pointerEvents: 'none' }}>
                      <CalendarMonthOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={dateFieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Select
                fullWidth
                size="small"
                value={hasDocuments}
                displayEmpty
                inputProps={{ 'aria-label': 'Filter by documents presence' }}
                onChange={(event) => onHasDocumentsChange(event.target.value)}
              >
                {BOOLEAN_FILTER_OPTIONS.map((option) => (
                  <MenuItem key={`docs-${option.value || 'any'}`} value={option.value}>
                    Docs: {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Select
                fullWidth
                size="small"
                value={hasNotes}
                displayEmpty
                inputProps={{ 'aria-label': 'Filter by notes presence' }}
                onChange={(event) => onHasNotesChange(event.target.value)}
              >
                {BOOLEAN_FILTER_OPTIONS.map((option) => (
                  <MenuItem key={`notes-${option.value || 'any'}`} value={option.value}>
                    Notes: {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Select
                fullWidth
                size="small"
                value={sortBy}
                inputProps={{ 'aria-label': 'Sort submissions' }}
                onChange={(event) => onSortByChange(event.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                variant="text"
                color="inherit"
                fullWidth
                sx={{ height: '100%' }}
                onClick={onClear}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Paper>
  );
}
