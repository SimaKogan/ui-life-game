import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, Outlet } from 'react-router-dom';

export const MobileLayout: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex flex-col bg-slate-600 w-full py-2 fixed top-0 left-0 z-10'> 
        <Button
          style={{ color: 'orange' }}
          id="mobile-button"
          aria-controls={open ? 'mobile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className="text-lightpink"
        >
          Menu
        </Button>
        <Menu
          id="mobile-menu"
          aria-labelledby="mobile-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={handleClose}>
            <NavLink className="text-slate-800" to="/">Home</NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink className="text-slate-800" to="/front-compute">Front-end Calculation</NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink className="text-slate-800" to="/back-compute">Back-end Calculation</NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink className="text-slate-800" to="/details">Project Details</NavLink>
          </MenuItem>
        </Menu>
      </div>
      <div className='flex-1 pt-[60px] pb-[20px] overflow-y-scroll scrollbar-hide'>
        <Outlet></Outlet>
      </div>
      <span className='m-0 w-full bg-slate-600 text-slate-100 flex items-center justify-center py-1 fixed bottom-0 left-0 z-10'>
        0586534332georgy@gmail.com
      </span>
    </div>
  );
}
