import { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import Nav from './navigation';
import Main from './main';
import Header from './header';

import { useAppSelector } from '../hooks';
import subscribeUser from '../subscribe';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { uuid } = useAppSelector((state) => state.auth);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    if (uuid) subscribeUser(uuid);
    else navigate('/login');
  }, [uuid, navigate]);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      {uuid && (
        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

          <Main>{children}</Main>
        </Box>
      )}
    </>
  );
}