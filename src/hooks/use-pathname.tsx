import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function usePathname() {
  const { pathname } = useLocation();

  return useMemo(() => pathname, [pathname]);
}