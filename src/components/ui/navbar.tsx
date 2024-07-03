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

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: '#333' }}>
      <Toolbar sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NavbarButton>
            <Link href="/" passHref>
              <Typography variant="body1" component="span" sx={{ color: 'inherit', textDecoration: 'none' }}>Home</Typography>
            </Link>
          </NavbarButton>
          <NavbarButton>
            <Link href="/update" passHref>
              <Typography variant="body1" component="span" sx={{ color: 'inherit', textDecoration: 'none' }}>Update</Typography>
            </Link>
          </NavbarButton>
          <NavbarButton>
            <Link href="/bill" passHref>
              <Typography variant="body1" component="span" sx={{ color: 'inherit', textDecoration: 'none' }}>Bill</Typography>
            </Link>
          </NavbarButton>
          <NavbarButton>
            <Link href="/sentbill" passHref>
              <Typography variant="body1" component="span" sx={{ color: 'inherit', textDecoration: 'none' }}>SentBill</Typography>
            </Link>
          </NavbarButton>
          <NavbarButton>
            <Link href="/live" passHref>
              <Typography variant="body1" component="span" sx={{ color: 'inherit', textDecoration: 'none' }}>Live</Typography>
            </Link>
          </NavbarButton>
          <NavbarButton>
            <Link href="/login" passHref>
              <Typography variant="body1" component="span" sx={{ color: 'inherit', textDecoration: 'none' }}>Login</Typography>
            </Link>
          </NavbarButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
