import { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { useUser } from './useUser';
import { useLogin } from './useLogin';

interface UserLoginData {
  email: string;
  password: string;
}

const Login = () => {
  const { user, isLoading: loadingUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserLoginData>({
    email: '',
    password: '',
  });
  const { login, isLoading } = useLogin();

  useEffect(() => {
    if (!loadingUser && user) {
      navigate('/contacts');
    }
  }, [loadingUser, user, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [id]: value }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Typography align="center">
            Don't have an account?{' '}
            <Link
              onClick={() => navigate('/signup')}
              sx={{ cursor: 'pointer' }}
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
