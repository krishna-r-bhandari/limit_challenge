'use client';

import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, InputAdornment, MenuItem, Paper, Select, TextField } from '@mui/material';

import { STATUS_OPTIONS } from '@/features/submissions/list/constants';
import { Broker } from '@/lib/types';

type SubmissionsFiltersProps = {
  searchInput: string;
  status: string;
  brokerId: string;
  brokers: Broker[];
  onSearchInputChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onBrokerChange: (value: string) => void;
  onClear: () => void;
};

export function SubmissionsFilters({
  searchInput,
  status,
  brokerId,
  brokers,
  onSearchInputChange,
  onStatusChange,
  onBrokerChange,
  onClear,
}: SubmissionsFiltersProps) {
  return (
    <Paper sx={{ mt: 3, p: 2, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search company..."
            value={searchInput}
            onChange={(event) => onSearchInputChange(event.target.value)}
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
        <Grid size={{ xs: 12, md: 1 }}>
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
    </Paper>
  );
}
