import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Paper, Typography, CircularProgress, Grid, Card, CardContent, Button, Divider, Rating } from '@mui/material';
import L from 'leaflet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Enhanced sample data with more details and Delhi-focused locations
const sampleOpportunities = [
  {
    id: 1,
    name: 'Teaching at Rural School',
    organization: 'Education For All',
    location: [28.6139, 77.2090], // Delhi Central
    type: 'Education',
    description: 'Help underprivileged children learn basic subjects and computer skills.',
    requirements: 'Teaching experience preferred, min 2 hours/week',
    rating: 4.5,
    volunteers: 120,
    urgency: 'High',
    timing: '9 AM - 5 PM',
    contact: '+91 98765-43210'
  },
  {
    id: 2,
    name: 'Food Distribution Drive',
    organization: 'Feeding India',
    location: [28.6280, 77.2789], // East Delhi
    type: 'Food Relief',
    description: 'Distribute meals to homeless and underprivileged communities.',
    requirements: 'Valid ID proof, ability to lift 10kg',
    rating: 4.8,
    volunteers: 250,
    urgency: 'Medium',
    timing: '7 AM - 11 AM',
    contact: '+91 98765-43211'
  },
  {
    id: 3,
    name: 'Tree Plantation Drive',
    organization: 'Green Earth',
    location: [28.5355, 77.2410], // South Delhi
    type: 'Environment',
    description: 'Join us in making Delhi greener by planting trees in local parks.',
    requirements: 'No specific requirements',
    rating: 4.2,
    volunteers: 180,
    urgency: 'Medium',
    timing: '8 AM - 12 PM',
    contact: '+91 98765-43212'
  },
  {
    id: 4,
    name: 'Elder Care Program',
    organization: 'Care for Elderly',
    location: [28.7041, 77.1025], // North Delhi
    type: 'Healthcare',
    description: 'Spend time with elderly residents and assist in basic healthcare.',
    requirements: 'Basic healthcare knowledge, 4 hours/week commitment',
    rating: 4.6,
    volunteers: 90,
    urgency: 'High',
    timing: '10 AM - 6 PM',
    contact: '+91 98765-43213'
  },
  {
    id: 5,
    name: 'Skill Development Workshop',
    organization: 'Youth Empowerment Foundation',
    location: [28.6304, 77.2177], // Central Delhi
    type: 'Education',
    description: 'Teach vocational skills to unemployed youth.',
    requirements: 'Expertise in any vocational skill',
    rating: 4.4,
    volunteers: 150,
    urgency: 'Medium',
    timing: '11 AM - 4 PM',
    contact: '+91 98765-43214'
  },
  {
    id: 6,
    name: 'Animal Shelter Support',
    organization: 'Delhi Animal Welfare',
    location: [28.5921, 77.2295], // South Central Delhi
    type: 'Animal Welfare',
    description: 'Help care for rescued animals and assist in shelter maintenance.',
    requirements: 'Love for animals, physical work',
    rating: 4.7,
    volunteers: 200,
    urgency: 'High',
    timing: '7 AM - 7 PM',
    contact: '+91 98765-43215'
  },
  {
    id: 7,
    name: 'Library Program for Kids',
    organization: 'Read & Grow Foundation',
    location: [28.6508, 77.2373], // New Delhi
    type: 'Education',
    description: 'Run reading sessions for underprivileged children.',
    requirements: 'Good communication skills',
    rating: 4.3,
    volunteers: 75,
    urgency: 'Medium',
    timing: '3 PM - 6 PM',
    contact: '+91 98765-43216'
  },
  {
    id: 8,
    name: 'Women Empowerment Initiative',
    organization: 'Shakti Foundation',
    location: [28.6129, 77.2295], // Central Delhi
    type: 'Social Development',
    description: 'Conduct workshops for women entrepreneurship.',
    requirements: 'Business knowledge, bilingual (Hindi/English)',
    rating: 4.9,
    volunteers: 160,
    urgency: 'High',
    timing: '11 AM - 3 PM',
    contact: '+91 98765-43217'
  }
];

// Component to handle map center updates
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

const OpportunitiesMap = () => {
  const [userLocation, setUserLocation] = useState([28.6139, 77.2090]); // Default to Delhi center
  const [loading, setLoading] = useState(true);
  const [selectedNGO, setSelectedNGO] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Still update user location but keep map centered on Delhi
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  const calculateDistance = (point1, point2) => {
    const R = 6371;
    const dLat = (point2[0] - point1[0]) * Math.PI / 180;
    const dLon = (point2[1] - point1[1]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1[0] * Math.PI / 180) * Math.cos(point2[0] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const handleNGOClick = (ngo) => {
    setSelectedNGO(ngo);
  };

  return (
    <Grid container spacing={2} sx={{ height: 'calc(100vh - 100px)' }}>
      {/* Map Section */}
      <Grid item xs={6}>
        <Paper elevation={3} sx={{ position: 'relative', height: '100%', width: '100%' }}>
          {loading && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 999,
            }}>
              <CircularProgress />
            </Box>
          )}
          <MapContainer
            center={[28.6139, 77.2090]} // Center on Delhi
            zoom={12} // Closer zoom for Delhi area
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapUpdater center={[28.6139, 77.2090]} />
            
            <Marker position={userLocation} icon={userIcon}>
              <Popup>
                <Typography variant="subtitle2">Your Location</Typography>
              </Popup>
            </Marker>

            {sampleOpportunities.map((opportunity) => (
              <Marker
                key={opportunity.id}
                position={opportunity.location}
                eventHandlers={{
                  click: () => handleNGOClick(opportunity),
                }}
              >
                <Popup>
                  <Box sx={{ p: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {opportunity.name}
                    </Typography>
                    <Typography variant="body2">
                      {opportunity.organization}
                    </Typography>
                  </Box>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Paper>
      </Grid>

      {/* NGO Information Section */}
      <Grid item xs={6} sx={{ height: '100%', overflowY: 'auto' }}>
        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Nearby NGOs and Opportunities
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          {sampleOpportunities.map((ngo) => (
            <Card 
              key={ngo.id} 
              sx={{ 
                mb: 2, 
                cursor: 'pointer',
                bgcolor: selectedNGO?.id === ngo.id ? 'action.selected' : 'background.paper'
              }}
              onClick={() => handleNGOClick(ngo)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {ngo.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {ngo.organization}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={ngo.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({ngo.rating})
                  </Typography>
                </Box>

                <Typography variant="body2" paragraph>
                  {ngo.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">
                    {calculateDistance(userLocation, ngo.location)}km away
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <VolunteerActivismIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">
                    {ngo.volunteers} volunteers
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">
                    {ngo.timing}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Requirements: {ngo.requirements}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mr: 1 }}
                  >
                    Contact
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary"
                  >
                    Learn More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OpportunitiesMap;
