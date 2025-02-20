import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Tabs,
  Tab,
  LinearProgress,
  IconButton,
  Stack,
  Chip,
  CircularProgress,
  Link
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  LocationOn as LocationIcon,
  EmojiEvents as EmojiEventsIcon,
  Group as GroupIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
  Timeline as TimelineIcon,
  Volunteer as VolunteerIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import CertificateTemplate from './CertificateTemplate';
import { getCurrentUser } from '../services/auth';
import { uploadToPinata, mintNFT } from '../services/nftService';

const userStats = {
  hoursServed: 120,
  eventsAttended: 15,
  communitiesJoined: 5,
  peopleImpacted: 450,
  skillsEndorsed: 8,
  certificatesEarned: 3,
};

const upcomingEvents = [
  {
    id: 1,
    title: 'Food Distribution Drive',
    date: '2025-02-25',
    time: '09:00 AM',
    location: 'Connaught Place, Delhi',
    role: 'Team Leader',
  },
  {
    id: 2,
    title: 'Teaching at Rural School',
    date: '2025-02-28',
    time: '10:00 AM',
    location: 'Pune Rural District',
    role: 'Volunteer Teacher',
  },
];

const achievements = [
  {
    id: 1,
    title: 'Community Champion',
    description: 'Completed 100+ hours of community service',
    date: 'February 2025',
    icon: <EmojiEventsIcon />,
  },
  {
    id: 2,
    title: 'Education Hero',
    description: 'Taught 50+ students in rural areas',
    date: 'January 2025',
    icon: <EmojiEventsIcon />,
  },
];

const skills = [
  { name: 'Teaching', endorsements: 12 },
  { name: 'Event Management', endorsements: 8 },
  { name: 'Team Leadership', endorsements: 15 },
  { name: 'Food Distribution', endorsements: 10 },
];

const certificatesData = [
  {
    id: 1,
    name: 'Bronze Volunteer Certificate',
    hours: 50,
    downloaded: false,
    generating: false
  },
  {
    id: 2,
    name: 'Silver Volunteer Certificate',
    hours: 100,
    downloaded: false,
    generating: false
  },
  {
    id: 3,
    name: 'Gold Volunteer Certificate',
    hours: 150,
    downloaded: false,
    generating: false
  }
];

const impactAreas = [
  { area: 'Education', hours: 45 },
  { area: 'Food Distribution', hours: 35 },
  { area: 'Environmental', hours: 25 },
  { area: 'Healthcare', hours: 15 },
];

const hoursBenchmarks = [
  { hours: 50, name: 'Bronze Volunteer', achieved: true },
  { hours: 100, name: 'Silver Volunteer', achieved: true },
  { hours: 150, name: 'Gold Volunteer', achieved: true },
  { hours: 200, name: 'Platinum Volunteer', achieved: false },
];

const userData = {
  name: 'Priya Sharma',
  avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3',
};

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const certificateRef = useRef(null);
  const [certificates, setCertificates] = useState(certificatesData);
  const [generating, setGenerating] = useState(false);
  const [nftStatus, setNftStatus] = useState({ loading: false, error: null });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDownloadCertificate = async (certificateId) => {
    const certificate = certificates.find(cert => cert.id === certificateId);
    
    setCertificates(prevCerts =>
      prevCerts.map(cert =>
        cert.id === certificateId ? { ...cert, generating: true } : cert
      )
    );

    setGenerating(true);
    setNftStatus({ loading: true, error: null });

    const certificateElement = document.createElement('div');
    certificateElement.style.position = 'absolute';
    certificateElement.style.left = '-9999px';
    document.body.appendChild(certificateElement);

    const root = ReactDOM.createRoot(certificateElement);
    root.render(
      <CertificateTemplate
        ref={certificateRef}
        username={userData.name}
        certificateType={certificate.name}
        date={new Date().toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      />
    );

    try {
      // Wait for the certificate to render
      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: true,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');

      // Start NFT minting process in parallel
      const nftPromise = (async () => {
        try {
          const metadata = {
            name: `${certificate.name} - ${userData.name}`,
            description: `This certificate recognizes ${userData.name}'s contribution of ${certificate.hours} hours of volunteer service.`,
            certificateType: certificate.name,
            hours: certificate.hours,
            date: new Date().toISOString()
          };

          const { metadataHash } = await uploadToPinata(imgData, metadata);
          
          // Get user's wallet address from MetaMask
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          });
          const userAddress = accounts[0];

          // Mint NFT
          const receipt = await mintNFT(metadataHash, userAddress);
          console.log('NFT minted successfully:', receipt);
          
          setNftStatus({ 
            loading: false, 
            error: null, 
            success: true,
            txHash: receipt.transactionHash 
          });
        } catch (error) {
          console.error('Error in NFT process:', error);
          setNftStatus({ 
            loading: false, 
            error: 'Failed to mint NFT. Please try again.' 
          });
        }
      })();

      // Generate PDF in parallel
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${certificate.name.replace(' ', '_')}_${userData.name}.pdf`);

      // Wait for NFT minting to complete
      await nftPromise;

    } catch (error) {
      console.error('Error generating certificate:', error);
      setNftStatus({ 
        loading: false, 
        error: 'Failed to generate certificate. Please try again.' 
      });
    } finally {
      root.unmount();
      document.body.removeChild(certificateElement);
      setCertificates(prevCerts =>
        prevCerts.map(cert =>
          cert.id === certificateId ? { ...cert, generating: false, downloaded: true } : cert
        )
      );
      setGenerating(false);
    }
  };

  const getNextBenchmark = () => {
    const nextBenchmark = hoursBenchmarks.find(b => b.hours > userStats.hoursServed);
    return nextBenchmark || hoursBenchmarks[hoursBenchmarks.length - 1];
  };

  const calculateProgress = () => {
    const nextBenchmark = getNextBenchmark();
    const prevBenchmark = hoursBenchmarks.find(b => b.hours < nextBenchmark.hours);
    const start = prevBenchmark ? prevBenchmark.hours : 0;
    return ((userStats.hoursServed - start) / (nextBenchmark.hours - start)) * 100;
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Profile Overview */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3, position: 'relative' }}>
              <IconButton
                sx={{ position: 'absolute', top: 8, right: 8 }}
                aria-label="edit profile"
              >
                <EditIcon />
              </IconButton>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  src={userData.avatar}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                  {userData.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Community Leader | Social Worker
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Passionate about making a difference in education and hunger relief
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                  <Chip label="Education" size="small" />
                  <Chip label="Food Relief" size="small" />
                  <Chip label="Environment" size="small" />
                </Stack>
                <Button variant="contained" fullWidth>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Impact Overview
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <AccessTimeIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h4">{userStats.hoursServed}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Hours Served
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <GroupIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h4">{userStats.peopleImpacted}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Live Impacted
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <CalendarIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h4">{userStats.eventsAttended}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Events
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <EmojiEventsIcon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h4">{userStats.certificatesEarned}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Certificates
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Overview" />
                  <Tab label="Skills & Certificates" />
                  <Tab label="Impact Areas" />
                </Tabs>
              </Box>

              {/* Overview Tab */}
              {tabValue === 0 && (
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Upcoming Events
                  </Typography>
                  <List>
                    {upcomingEvents.map((event) => (
                      <React.Fragment key={event.id}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <CalendarIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={event.title}
                            secondary={
                              <React.Fragment>
                                <Typography component="span" variant="body2">
                                  {event.date} at {event.time}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2">
                                  {event.location} • {event.role}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          <Button variant="outlined" size="small">
                            View Details
                          </Button>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Recent Achievements
                  </Typography>
                  <List>
                    {achievements.map((achievement) => (
                      <React.Fragment key={achievement.id}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {achievement.icon}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={achievement.title}
                            secondary={
                              <React.Fragment>
                                <Typography component="span" variant="body2">
                                  {achievement.description}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2" color="text.secondary">
                                  Achieved in {achievement.date}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              )}

              {/* Skills & Certificates Tab */}
              {tabValue === 1 && (
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Skills
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    {skills.map((skill) => (
                      <Grid item xs={12} sm={6} key={skill.name}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle1" gutterBottom>
                              {skill.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ flexGrow: 1, mr: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={(skill.endorsements / 20) * 100}
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                {skill.endorsements} endorsements
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  <Typography variant="h6" gutterBottom>
                    Certificates
                  </Typography>
                  <Grid container spacing={2}>
                    {certificates.map((certificate) => (
                      <Grid item xs={12} sm={6} md={4} key={certificate.id}>
                        <Card 
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            overflow: 'visible'
                          }}
                        >
                          <CardContent sx={{ flexGrow: 1, pb: 2 }}>
                            <Typography variant="h6" component="div" gutterBottom>
                              {certificate.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Required Hours: {certificate.hours}
                            </Typography>
                            <Box sx={{ mt: 2, position: 'relative' }}>
                              <Button
                                variant="contained"
                                color={certificate.downloaded ? "secondary" : "primary"}
                                startIcon={
                                  generating && certificate.generating ? (
                                    <CircularProgress size={20} color="inherit" />
                                  ) : (
                                    <DownloadIcon />
                                  )
                                }
                                fullWidth
                                disabled={userStats.hoursServed < certificate.hours || (generating && certificate.generating)}
                                onClick={() => handleDownloadCertificate(certificate.id)}
                                sx={{
                                  transition: 'all 0.3s ease-in-out',
                                  '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 3
                                  }
                                }}
                              >
                                {generating && certificate.generating 
                                  ? 'Generating...' 
                                  : (certificate.downloaded 
                                    ? 'Generate Again' 
                                    : 'Generate Certificate')}
                              </Button>
                            </Box>
                            {nftStatus.error && certificate.generating && (
                              <Typography 
                                color="error" 
                                variant="caption" 
                                sx={{ 
                                  mt: 1, 
                                  display: 'block',
                                  textAlign: 'center' 
                                }}
                              >
                                {nftStatus.error}
                              </Typography>
                            )}
                            {nftStatus.success && certificate.downloaded && (
                              <Box sx={{ mt: 1, textAlign: 'center' }}>
                                <Typography 
                                  color="success.main" 
                                  variant="caption" 
                                  sx={{ display: 'block' }}
                                >
                                  NFT minted successfully!
                                </Typography>
                                <Link 
                                  href={`https://etherscan.io/tx/${nftStatus.txHash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  sx={{ 
                                    fontSize: '0.75rem',
                                    display: 'inline-block',
                                    mt: 0.5
                                  }}
                                >
                                  View on Etherscan
                                </Link>
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              )}

              {/* Impact Areas Tab */}
              {tabValue === 2 && (
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Hours by Impact Area
                  </Typography>
                  {impactAreas.map((area) => (
                    <Box key={area.area} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">{area.area}</Typography>
                        <Typography variant="body1">{area.hours} hours</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(area.hours / userStats.hoursServed) * 100}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Volunteering Progress
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Progress to {getNextBenchmark().name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {userStats.hoursServed} / {getNextBenchmark().hours} hours
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={calculateProgress()} 
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Grid container spacing={2}>
                    {hoursBenchmarks.map((benchmark) => (
                      <Grid item xs={6} sm={3} key={benchmark.hours}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                          }}
                        >
                          <EmojiEventsIcon
                            sx={{
                              fontSize: 40,
                              color: benchmark.hours <= userStats.hoursServed ? 'primary.main' : 'grey.400',
                              mb: 1,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {benchmark.hours} Hours
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {benchmark.name}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
