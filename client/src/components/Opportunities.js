import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Rating,
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slider,
  FormControlLabel,
  Checkbox,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  School as SchoolIcon,
  LocalHospital as HealthcareIcon,
  Park as EnvironmentIcon,
  Restaurant as FoodIcon,
  Pets as AnimalIcon,
  Code as TechIcon,
  Map as MapIcon,
  ViewList as ListIcon,
} from '@mui/icons-material';
import OpportunitiesMap from './OpportunitiesMap';

const opportunities = [
  {
    id: 1,
    title: 'Teaching Assistant at Rural School',
    organization: 'Education For All NGO',
    location: 'Pune Rural District',
    distance: '15 km',
    category: 'Education',
    commitment: '3 months',
    hoursPerWeek: 10,
    skills: ['Teaching', 'English', 'Mathematics'],
    impact: 'Help educate 50+ underprivileged children',
    description: 'Join us in our mission to provide quality education to rural children. You\'ll assist teachers, create engaging learning materials, and help students with their studies. Make a lasting impact on young minds!',
    requirements: ['Bachelor\'s degree', 'Teaching experience preferred', 'Fluent in English and Hindi'],
    benefits: ['Teaching experience', 'Professional development', 'Transportation provided'],
    rating: 4.8,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
    urgent: true,
    featured: true,
  },
  {
    id: 2,
    title: 'Wildlife Conservation Volunteer',
    organization: 'Wildlife Protection Society',
    location: 'Jim Corbett National Park',
    distance: '25 km',
    category: 'Environment',
    commitment: '6 months',
    hoursPerWeek: 20,
    skills: ['Animal Care', 'Research', 'Documentation'],
    impact: 'Contribute to protecting endangered species',
    description: 'Work alongside wildlife experts to protect and monitor endangered species. Activities include habitat restoration, wildlife monitoring, and community education about conservation.',
    requirements: ['Physical fitness', 'Passion for wildlife', 'Basic photography skills'],
    benefits: ['Field experience', 'Accommodation provided', 'Certificate upon completion'],
    rating: 4.9,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da',
    urgent: false,
    featured: true,
  },
  {
    id: 3,
    title: 'Medical Camp Coordinator',
    organization: 'Health For All Foundation',
    location: 'Mumbai Suburbs',
    distance: '8 km',
    category: 'Healthcare',
    commitment: '1 month',
    hoursPerWeek: 15,
    skills: ['Healthcare', 'Organization', 'Communication'],
    impact: 'Provide medical care to 1000+ people',
    description: 'Coordinate medical camps in underserved communities. Work with healthcare professionals to organize screenings, vaccinations, and health awareness programs.',
    requirements: ['Healthcare background', 'Event management experience', 'Good communication skills'],
    benefits: ['Healthcare experience', 'Networking opportunities', 'Certificate'],
    rating: 4.7,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309',
    urgent: true,
    featured: false,
  },
  {
    id: 4,
    title: 'Coding Mentor for Kids',
    organization: 'Tech4Good',
    location: 'Bangalore',
    distance: '5 km',
    category: 'Technology',
    commitment: '2 months',
    hoursPerWeek: 8,
    skills: ['Programming', 'Teaching', 'Patience'],
    impact: 'Teach coding to 30+ underprivileged children',
    description: 'Mentor kids in coding and help them develop problem-solving skills. Create engaging lesson plans and activities to make learning fun.',
    requirements: ['Programming skills', 'Teaching experience preferred', 'Good communication skills'],
    benefits: ['Teaching experience', 'Networking opportunities', 'Certificate'],
    rating: 4.6,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5',
    urgent: false,
    featured: false,
  },
  {
    id: 5,
    title: 'Food Distribution Manager',
    organization: 'Hunger Relief India',
    location: 'Delhi NCR',
    distance: '12 km',
    category: 'Food Relief',
    commitment: '4 months',
    hoursPerWeek: 12,
    skills: ['Logistics', 'Management', 'Food Safety'],
    impact: 'Distribute food to 500+ families weekly',
    description: 'Manage food distribution programs in underserved communities. Work with local organizations to source food, manage logistics, and ensure safe food handling practices.',
    requirements: ['Logistics experience', 'Management skills', 'Food safety knowledge'],
    benefits: ['Logistics experience', 'Networking opportunities', 'Certificate'],
    rating: 4.9,
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
    urgent: true,
    featured: true,
  },
];

const categories = [
  { name: 'Education', icon: <SchoolIcon /> },
  { name: 'Healthcare', icon: <HealthcareIcon /> },
  { name: 'Environment', icon: <EnvironmentIcon /> },
  { name: 'Food Relief', icon: <FoodIcon /> },
  { name: 'Animal Welfare', icon: <AnimalIcon /> },
  { name: 'Technology', icon: <TechIcon /> },
];

const OpportunityCard = ({ opportunity }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleApplyClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEmail('');
  };

  const handleSubmit = () => {
    // Here you would typically make an API call to submit the application
    setOpenDialog(false);
    setShowSuccessMessage(true);
    setEmail('');
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {opportunity.urgent && (
        <Chip
          label="Urgent"
          color="error"
          size="small"
          sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
        />
      )}
      {opportunity.featured && (
        <Chip
          label="Featured"
          color="primary"
          size="small"
          sx={{ position: 'absolute', top: opportunity.urgent ? 40 : 10, right: 10, zIndex: 1 }}
        />
      )}
      <CardMedia
        component="img"
        height="200"
        image={opportunity.image}
        alt={opportunity.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {opportunity.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {opportunity.organization}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {opportunity.location} • {opportunity.distance}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {opportunity.hoursPerWeek} hrs/week • {opportunity.commitment}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {opportunity.skills.slice(0, 3).map((skill) => (
            <Chip key={skill} label={skill} size="small" variant="outlined" />
          ))}
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {opportunity.description}
        </Typography>

        <Typography variant="subtitle2" color="primary" gutterBottom>
          Requirements:
        </Typography>
        <Box component="ul" sx={{ pl: 2, mb: 2 }}>
          {opportunity.requirements.map((req, index) => (
            <Typography key={index} component="li" variant="body2" color="text.secondary">
              {req}
            </Typography>
          ))}
        </Box>

        <Typography variant="subtitle2" color="primary" gutterBottom>
          Benefits:
        </Typography>
        <Box component="ul" sx={{ pl: 2, mb: 2 }}>
          {opportunity.benefits.map((benefit, index) => (
            <Typography key={index} component="li" variant="body2" color="text.secondary">
              {benefit}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={opportunity.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({opportunity.reviews} reviews)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
          <Button variant="contained" color="primary" onClick={handleApplyClick}>
            Apply Now
          </Button>
          <Box>
            <IconButton size="small">
              <BookmarkIcon />
            </IconButton>
            <IconButton size="small">
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>

      {/* Application Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Apply for {opportunity.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please enter your email address to receive the registration link.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Send Registration Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Message */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSuccessMessage(false)} severity="success">
          Registration link has been sent to your email!
        </Alert>
      </Snackbar>
    </Card>
  );
};

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [distanceRange, setDistanceRange] = useState([0, 50]);
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(opp.category);
    const matchesDistance = parseInt(opp.distance) >= distanceRange[0] && parseInt(opp.distance) <= distanceRange[1];
    const matchesUrgent = !urgentOnly || opp.urgent;
    const matchesFeatured = !featuredOnly || opp.featured;

    return matchesSearch && matchesCategories && matchesDistance && matchesUrgent && matchesFeatured;
  });

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Volunteering Opportunities
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Find meaningful opportunities to make a difference in your community
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Search and Filter Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                aria-label="view mode"
              >
                <ToggleButton value="list" aria-label="list view">
                  <ListIcon />
                </ToggleButton>
                <ToggleButton value="map" aria-label="map view">
                  <MapIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(true)}
              >
                Filters
              </Button>
            </Box>
          </Grid>

          {/* Category Chips */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category) => (
                <Chip
                  key={category.name}
                  label={category.name}
                  icon={category.icon}
                  onClick={() => handleCategoryToggle(category.name)}
                  color={selectedCategories.includes(category.name) ? 'primary' : 'default'}
                  variant={selectedCategories.includes(category.name) ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>
          </Grid>

          {/* Opportunity Cards */}
          {viewMode === 'map' ? (
            <OpportunitiesMap opportunities={filteredOpportunities} />
          ) : (
            filteredOpportunities.map((opportunity) => (
              <Grid item key={opportunity.id} xs={12} md={6} lg={4}>
                <OpportunityCard opportunity={opportunity} />
              </Grid>
            ))
          )}
        </Grid>

        {/* Filter Drawer */}
        <Drawer
          anchor="right"
          open={showFilters}
          onClose={() => setShowFilters(false)}
        >
          <Box sx={{ width: 300, p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Distance (km)
            </Typography>
            <Slider
              value={distanceRange}
              onChange={(e, newValue) => setDistanceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={50}
            />

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
              Additional Filters
            </Typography>
            <List>
              <ListItem disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={urgentOnly}
                      onChange={(e) => setUrgentOnly(e.target.checked)}
                    />
                  }
                  label="Urgent Opportunities"
                />
              </ListItem>
              <ListItem disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={featuredOnly}
                      onChange={(e) => setFeaturedOnly(e.target.checked)}
                    />
                  }
                  label="Featured Opportunities"
                />
              </ListItem>
            </List>

            <Button
              variant="contained"
              fullWidth
              onClick={() => setShowFilters(false)}
              sx={{ mt: 3 }}
            >
              Apply Filters
            </Button>
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
};

export default Opportunities;
