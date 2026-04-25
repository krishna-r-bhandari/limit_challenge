'use client';

import { Avatar, Box, Link as MuiLink, Paper, Stack, Typography } from '@mui/material';

import { SectionTitle } from '@/features/submissions/detail/components/SectionTitle';
import { avatarColorForString, initialsFromName } from '@/lib/submission-ui';
import { Contact } from '@/lib/types';

type SubmissionContactsSectionProps = {
  contacts: Contact[];
};

export function SubmissionContactsSection({ contacts }: SubmissionContactsSectionProps) {
  return (
    <Paper sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
      <SectionTitle>Key Contacts ({contacts.length})</SectionTitle>
      {contacts.length === 0 ? (
        <Typography sx={{ color: 'text.secondary' }}>No contacts available.</Typography>
      ) : (
        <Stack spacing={1.25}>
          {contacts.map((contact) => (
            <Stack
              key={contact.id}
              direction="row"
              alignItems="flex-start"
              spacing={1.2}
              sx={{ p: 1, borderRadius: 1.5, bgcolor: 'action.hover' }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  fontSize: 12,
                  fontWeight: 700,
                  bgcolor: avatarColorForString(contact.name),
                }}
              >
                {initialsFromName(contact.name)}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>{contact.name}</Typography>
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 0.4 }}>
                  {contact.role}
                </Typography>
                <MuiLink
                  href={`mailto:${contact.email}`}
                  underline="hover"
                  sx={{ fontSize: 12.5, display: 'block' }}
                >
                  {contact.email}
                </MuiLink>
                {contact.phone ? (
                  <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                    {contact.phone}
                  </Typography>
                ) : null}
              </Box>
            </Stack>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
