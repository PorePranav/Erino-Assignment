import { Box, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import { useEffect } from 'react';

const MainLayout = () => {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/contacts');
    }
  }, [isLoading, user, navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default MainLayout;
