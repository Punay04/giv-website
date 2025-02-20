import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link as MuiLink,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await login(formData.email, formData.password);
      setUser(response.user); // Update the user state with the response
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          mt: 8, 
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ color: 'primary.main', fontWeight: 500 }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            color="textSecondary" 
            sx={{ mb: 3 }}
          >
            Sign in to continue to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!error && error.includes('email')}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type={formData.showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!error && error.includes('password')}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Don't have an account?{' '}
                <MuiLink component={Link} to="/register" color="primary">
                  Sign up
                </MuiLink>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
