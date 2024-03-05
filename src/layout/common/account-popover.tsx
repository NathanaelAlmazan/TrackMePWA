import React, { useState, lazy, Suspense } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { logout } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Role } from '../../__generated__/graphql';

const ProfileDialog = lazy(() => import('./profile-settings'));

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { firstName, lastName, position, avatar, role } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const [profile, setProfile] = useState<boolean>(false);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleNavHome = () => {
    if (role && [Role.Superuser, Role.Director].includes(role)) navigate('/dashboard');
    else navigate('/calendar');
  }

  const handleLogout = () => {
    dispatch(logout());
    setOpen(null);
    navigate("/login");
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={avatar}
          alt={`${firstName} ${lastName}`}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {position}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleNavHome}>
          Home
        </MenuItem>

        <MenuItem onClick={() => setProfile(true)}>
          Profile
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>

      <Suspense>
        <ProfileDialog open={profile} onClose={() => setProfile(false)} />
      </Suspense>
    </>
  );
}
