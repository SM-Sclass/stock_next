import React from 'react'
import { Container, Box } from '@mui/material';
import './globals.css';
import Form from '@/components/ui/form';

type Props = {}

function App({}: Props) {
  return (
    <Container>
      <Box className='appbody' sx={{ mt: 4, mb: 4, p: 2, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Form />
      </Box>
    </Container>
  )
}

export default App
