import { forwardRef } from "react";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

const RouterLink = forwardRef<HTMLAnchorElement, { href: string }>(
  ({ href, ...other }, ref) => <Link ref={ref} to={href} {...other} />
);

export default RouterLink;
