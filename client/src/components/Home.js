import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Handshake as HandshakeIcon,
  Group as GroupIcon,
  LocationOn as LocationIcon,
  EmojiEvents as EmojiEventsIcon,
  School as SchoolIcon,
  LocalHospital as HealthcareIcon,
  Park as EnvironmentIcon,
  Restaurant as FoodIcon,
  Android as AndroidIcon,
  GetApp as GetAppIcon,
} from '@mui/icons-material';
import { getCurrentUser } from '../services/auth';

const impactStats = [
  {
    icon: <GroupIcon fontSize="large" />,
    value: '50,000+',
    label: 'Volunteers',
  },
  {
    icon: <LocationIcon fontSize="large" />,
    value: '100+',
    label: 'Cities',
  },
  {
    icon: <EmojiEventsIcon fontSize="large" />,
    value: '1,000+',
    label: 'Projects Completed',
  },
  {
    icon: <HandshakeIcon fontSize="large" />,
    value: '200,000+',
    label: 'Lives Impacted',
  },
];

const categories = [
  {
    title: 'Education',
    icon: <SchoolIcon fontSize="large" />,
    description: 'Support educational initiatives and help shape future generations.',
  },
  {
    title: 'Healthcare',
    icon: <HealthcareIcon fontSize="large" />,
    description: 'Assist in medical camps and healthcare awareness programs.',
  },
  {
    title: 'Environment',
    icon: <EnvironmentIcon fontSize="large" />,
    description: 'Participate in conservation efforts and sustainability projects.',
  },
  {
    title: 'Food Security',
    icon: <FoodIcon fontSize="large" />,
    description: 'Help distribute food and support nutrition programs.',
  },
];

const Home = () => {
  const user = getCurrentUser();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/giv-platform.apk';
    link.download = 'giv-platform.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          background: 'linear-gradient(45deg, #FF9933 30%, #138808 90%)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
                Giv
              </Typography>
              <Typography variant="h4" gutterBottom>
                Make a Difference in Your Community
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Join India's largest volunteering platform. Connect with NGOs, participate in
                meaningful projects, and create positive change together.
              </Typography>
              {user ? (
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/community"
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'grey.100',
                      },
                    }}
                  >
                    Explore Community
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/opportunities"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'grey.100',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Explore Opportunities
                  </Button>
                </Stack>
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/register"
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'grey.100',
                      },
                    }}
                  >
                    Start Volunteering
                  </Button>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6"
                alt="Community Volunteering in India"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: 3,
                  objectFit: 'cover',
                  maxHeight: '400px',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Impact Stats */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {impactStats.map((stat, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 56,
                    height: 56,
                    mb: 2,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography variant="h4" component="h2" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 6 }}
        >
          Volunteer Categories
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 56,
                      height: 56,
                      mb: 2,
                      mx: 'auto',
                    }}
                  >
                    {category.icon}
                  </Avatar>
                  <Typography gutterBottom variant="h5" component="h3">
                    {category.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mobile App Download Banner */}
      <Box
        sx={{
          py: 6,
          background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                Download the Giv Mobile App
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Make a difference on the go! Get instant access to volunteering opportunities, 
                track your impact, and connect with like-minded volunteers.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleDownload}
                startIcon={<AndroidIcon />}
                sx={{
                  bgcolor: '#FF9933', // Orange color from Indian flag
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: '#E88A2E',
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Download Now
              </Button>
              <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.8 }}>
                Android version 6.0 and above
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                    zIndex: 1,
                  }
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop"
                  alt="Giv Mobile App"
                  sx={{
                    width: '100%',
                    maxWidth: '300px',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto',
                    borderRadius: 2,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
