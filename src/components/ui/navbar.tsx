import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/system';

const NavbarButton = styled(Button)({
  color: '#ffffff',
  textTransform: 'none',
  padding: '0 20px', // Add some padding for spacing
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const NavbarLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  padding: '0 5px', // Increase padding for better spacing
});

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: '#333' }}>
      <Toolbar sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}> {/* Add gap for spacing between buttons */}
          <NavbarButton>
            <NavbarLink href="/Newuser">
              <Typography variant="h6" component="span">New User</Typography> {/* Use variant="h6" for larger text */}
            </NavbarLink>
          </NavbarButton>
          <NavbarButton>
            <NavbarLink href="/">
              <Typography variant="h6" component="span">Bill Detail</Typography>
            </NavbarLink>
          </NavbarButton>
          <NavbarButton>
            <NavbarLink href="/update">
              <Typography variant="h6" component="span">Update</Typography>
            </NavbarLink>
          </NavbarButton>
          <NavbarButton>
            <NavbarLink href="/bill">
              <Typography variant="h6" component="span">Bill</Typography>
            </NavbarLink>
          </NavbarButton>
          <NavbarButton>
            <NavbarLink href="/live">
              <Typography variant="h6" component="span">Live</Typography>
            </NavbarLink>
          </NavbarButton>
          <NavbarButton>
            <NavbarLink href="/login">
              <Typography variant="h6" component="span">Login</Typography>
            </NavbarLink>
          </NavbarButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
