"use client";

import * as React from "react";
import {
  Drawer, IconButton, Stack, Typography, Divider, Box, Button
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTranslations } from "next-intl";

type RightDrawerProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  children: React.ReactNode;
  width?: number | string;
  submitting?: boolean;
};

export default function RightDrawer({
  title, open, onClose, onSubmit, children, width = 420, submitting
}: RightDrawerProps) {
  const t = useTranslations('dashboard');
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width } }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={700}>{title}</Typography>
        <IconButton onClick={onClose}><CloseRoundedIcon /></IconButton>
      </Stack>
      <Divider />
      <Box sx={{ p: 2, overflowY: "auto", flex: 1 }}>{children}</Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button fullWidth variant="contained" onClick={onSubmit}>{submitting ? t('loading') : t('save')}</Button>
      </Box>
    </Drawer>
  );
}
