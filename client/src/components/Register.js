import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/auth';
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
import GivLogo from './GivLogo';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
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

  const togglePasswordVisibility = (field) => {
    setFormData({
      ...formData,
      [field]: !formData[field],
    });
  };

  const validateForm = () => {
    if (!formData.username) {
      setError('Username is required');
      return false;
    }
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await register(formData.username, formData.email, formData.password);
      setUser(response.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
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
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <GivLogo sx={{ height: '40px', width: 'auto' }} />
          <Typography variant="h4" sx={{ ml: 2, color: 'primary.main' }}>
            Giv
          </Typography>
        </Box>

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
            Create Account
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            color="textSecondary" 
            sx={{ mb: 3 }}
          >
            Join our community of volunteers
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
              label="Username"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              error={!!error && error.includes('Username')}
              disabled={loading}
            />
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
              value={formData.password}
              onChange={handleChange}
              error={!!error && error.includes('Password')}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('showPassword')}
                      edge="end"
                    >
                      {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={formData.showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!error && error.includes('Passwords do not match')}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('showConfirmPassword')}
                      edge="end"
                    >
                      {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <MuiLink component={Link} to="/login" color="primary">
              Login here
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
