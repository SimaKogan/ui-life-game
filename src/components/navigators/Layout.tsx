import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import { site } from '../../config/site';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/front-compute', label: 'Front-end', end: false },
  { to: '/back-compute', label: 'Back-end', end: false },
  { to: '/details', label: 'Details', end: false },
];

export const Layout: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const close = () => setAnchorEl(null);

  return (
    <div className="shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="logo" aria-hidden="true" />
          {site.name}
        </NavLink>

        <nav className="nav nav-desktop" aria-label="Main">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <IconButton
          className="nav-mobile"
          aria-label="Open menu"
          aria-haspopup="true"
          onClick={e => setAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={close}>
          {links.map(l => (
            <MenuItem key={l.to} component={NavLink} to={l.to} onClick={close}>
              {l.label}
            </MenuItem>
          ))}
        </Menu>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={`https://github.com/${site.githubUser}`} target="_blank" rel="noreferrer">
          <GitHubIcon fontSize="small" />
          {site.githubUser}
        </a>
      </footer>
    </div>
  );
};
