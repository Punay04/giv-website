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
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  LinearProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
  Add as AddIcon,
  Share as ShareIcon,
  Event as EventIcon,
  School as SchoolIcon,
  LocalHospital as HealthcareIcon,
  Park as EnvironmentIcon,
  Restaurant as FoodIcon,
  Pets as AnimalIcon,
  Image as ImageIcon,
} from '@mui/icons-material';

const communities = [
  {
    id: 1,
    name: 'Green Earth Warriors',
    category: 'Environment',
    location: 'Mumbai',
    members: 1250,
    rating: 4.8,
    description: 'A community dedicated to environmental conservation and sustainable living.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
    upcomingEvents: 3,
    activeProjects: 5,
    icon: <EnvironmentIcon />,
    featured: true,
  },
  {
    id: 2,
    name: 'Education for All',
    category: 'Education',
    location: 'Delhi',
    members: 850,
    rating: 4.9,
    description: 'Empowering underprivileged children through quality education.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
    upcomingEvents: 2,
    activeProjects: 4,
    icon: <SchoolIcon />,
    featured: true,
  },
  {
    id: 3,
    name: 'Health Heroes',
    category: 'Healthcare',
    location: 'Bangalore',
    members: 650,
    rating: 4.7,
    description: 'Healthcare professionals and volunteers working for better community health.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309',
    upcomingEvents: 4,
    activeProjects: 3,
    icon: <HealthcareIcon />,
    featured: false,
  },
  {
    id: 4,
    name: 'Food for Life',
    category: 'Food Relief',
    location: 'Chennai',
    members: 920,
    rating: 4.6,
    description: 'Fighting hunger through food distribution and sustainable food practices.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
    upcomingEvents: 5,
    activeProjects: 2,
    icon: <FoodIcon />,
    featured: true,
  },
  {
    id: 5,
    name: 'Animal Welfare Society',
    category: 'Animal Welfare',
    location: 'Pune',
    members: 750,
    rating: 4.8,
    description: 'Dedicated to protecting and caring for animals in need. We provide shelter, medical care, and rehabilitation services for stray and abandoned animals.',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c',
    upcomingEvents: 2,
    activeProjects: 6,
    icon: <AnimalIcon />,
    featured: true,
  },
  {
    id: 6,
    name: 'Senior Care Community',
    category: 'Elderly Care',
    location: 'Hyderabad',
    members: 480,
    rating: 4.7,
    description: 'Supporting and caring for elderly citizens through companionship and assistance programs.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
    upcomingEvents: 3,
    activeProjects: 4,
    icon: <HealthcareIcon />,
    featured: false,
  },
  {
    id: 7,
    name: 'Tech for Good',
    category: 'Technology',
    location: 'Bangalore',
    members: 620,
    rating: 4.9,
    description: 'Using technology to solve social problems and empower communities.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998',
    upcomingEvents: 4,
    activeProjects: 5,
    icon: <SchoolIcon />,
    featured: true,
  }
];

const events = [
  {
    id: 1,
    title: 'Beach Cleanup Drive',
    community: 'Green Earth Warriors',
    date: '2025-03-01',
    time: '07:00 AM',
    location: 'Juhu Beach, Mumbai',
    participants: 45,
    maxParticipants: 100,
    image: 'https://images.unsplash.com/photo-1618477462146-817b6e4d4a8f',
    description: 'Join us for our monthly beach cleanup drive to keep our beaches clean and protect marine life.',
  },
  {
    id: 2,
    title: 'Teaching Workshop',
    community: 'Education for All',
    date: '2025-03-05',
    time: '10:00 AM',
    location: 'Community Center, Delhi',
    participants: 28,
    maxParticipants: 50,
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45',
    description: 'Learn effective teaching methods for underprivileged children.',
  },
  {
    id: 3,
    title: 'Health Camp',
    community: 'Health Heroes',
    date: '2025-03-10',
    time: '09:00 AM',
    location: 'Rural Health Center, Bangalore',
    participants: 15,
    maxParticipants: 40,
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309',
    description: 'Free health checkup camp for rural communities.',
  },
  {
    id: 4,
    title: 'Food Distribution Drive',
    community: 'Food for Life',
    date: '2025-03-15',
    time: '08:00 AM',
    location: 'Slum Areas, Chennai',
    participants: 32,
    maxParticipants: 60,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
    description: 'Monthly food distribution drive for underprivileged communities.',
  },
  {
    id: 5,
    title: 'Animal Vaccination Camp',
    community: 'Animal Welfare Society',
    date: '2025-03-20',
    time: '10:00 AM',
    location: 'City Park, Pune',
    participants: 20,
    maxParticipants: 80,
    image: 'https://images.unsplash.com/photo-1564652518878-669c5d73e417',
    description: 'Free vaccination camp for stray animals.',
  },
  {
    id: 6,
    title: 'Pet Adoption Drive',
    community: 'Animal Welfare Society',
    date: '2025-03-25',
    time: '11:00 AM',
    location: 'City Mall, Pune',
    participants: 25,
    maxParticipants: 50,
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c',
    description: 'Find forever homes for rescued pets. Meet adorable dogs and cats looking for loving families.',
  },
  {
    id: 7,
    title: 'Animal First Aid Workshop',
    community: 'Animal Welfare Society',
    date: '2025-04-01',
    time: '09:00 AM',
    location: 'Community Center, Pune',
    participants: 18,
    maxParticipants: 40,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97',
    description: 'Learn essential first aid skills for helping injured animals.',
  }
];

const projects = [
  {
    id: 1,
    title: 'Rural School Development',
    community: 'Education for All',
    progress: 75,
    volunteers: 35,
    deadline: '2025-04-01',
    description: 'Building and renovating schools in rural areas to provide better educational infrastructure.',
    impact: '500+ students benefited',
    requirements: 'Construction volunteers, teachers, educational materials'
  },
  {
    id: 2,
    title: 'Urban Garden Initiative',
    community: 'Green Earth Warriors',
    progress: 60,
    volunteers: 42,
    deadline: '2025-03-15',
    description: 'Creating sustainable urban gardens in residential areas to promote local food production.',
    impact: '20 gardens established',
    requirements: 'Gardening tools, seeds, volunteers with gardening experience'
  },
  {
    id: 3,
    title: 'Mobile Medical Units',
    community: 'Health Heroes',
    progress: 40,
    volunteers: 25,
    deadline: '2025-05-01',
    description: 'Operating mobile medical units to provide healthcare in remote areas.',
    impact: '1000+ patients treated',
    requirements: 'Medical professionals, medicines, medical equipment'
  },
  {
    id: 4,
    title: 'Community Kitchen',
    community: 'Food for Life',
    progress: 85,
    volunteers: 50,
    deadline: '2025-03-30',
    description: 'Setting up community kitchens to provide nutritious meals to the needy.',
    impact: '2000+ meals served daily',
    requirements: 'Cooking volunteers, food supplies, kitchen equipment'
  },
  {
    id: 5,
    title: 'Animal Shelter Expansion',
    community: 'Animal Welfare Society',
    progress: 30,
    volunteers: 28,
    deadline: '2025-06-01',
    description: 'Expanding our animal shelter to accommodate more rescued animals.',
    impact: 'Space for 100+ additional animals',
    requirements: 'Construction materials, veterinary supplies, volunteer caretakers'
  },
  {
    id: 6,
    title: 'Stray Animal Care Program',
    community: 'Animal Welfare Society',
    progress: 85,
    volunteers: 48,
    deadline: '2025-04-15',
    description: 'Comprehensive care program for stray animals including vaccination, sterilization, and rehabilitation.',
    impact: '200+ animals treated',
    requirements: 'Veterinarians, animal handlers, transport volunteers'
  },
  {
    id: 7,
    title: 'Animal Shelter Expansion',
    community: 'Animal Welfare Society',
    progress: 40,
    volunteers: 30,
    deadline: '2025-05-01',
    description: 'Expanding our shelter facilities to accommodate more rescued animals.',
    impact: 'Capacity for 100 more animals',
    requirements: 'Construction volunteers, donations, supplies'
  }
];

const CommunityCard = ({ community }) => {
  const [imageError, setImageError] = useState(false);
  
  const fallbackImage = 'https://images.unsplash.com/photo-1544027993-37dbfe43562a';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageError ? fallbackImage : community.image}
        alt={community.name}
        onError={() => setImageError(true)}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {community.featured && (
          <Chip
            label="Featured"
            color="primary"
            size="small"
            sx={{ mb: 2 }}
          />
        )}
        <Typography variant="h6" gutterBottom>
          {community.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {community.location}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <GroupIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {community.members.toLocaleString()} members
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {community.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            icon={<EventIcon />}
            label={`${community.upcomingEvents} Events`}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={community.icon}
            label={community.category}
            size="small"
            variant="outlined"
          />
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
          <Button variant="contained" color="primary">
            Join Community
          </Button>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

const EventListItem = ({ event, handleViewDetails }) => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar variant="rounded" src={event.image} />
    </ListItemAvatar>
    <ListItemText
      primary={event.title}
      secondary={
        <>
          <Typography component="span" variant="body2" color="text.primary">
            {event.community}
          </Typography>
          {` — ${event.date} at ${event.time}`}
          <br />
          <Typography component="span" variant="body2">
            {`${event.participants}/${event.maxParticipants} participants`}
          </Typography>
        </>
      }
    />
    <ListItemSecondaryAction>
      <Button variant="outlined" onClick={() => handleViewDetails(event)}>
        View Details
      </Button>
    </ListItemSecondaryAction>
  </ListItem>
);

const ProjectListItem = ({ project, handleViewDetails }) => (
  <ListItem alignItems="flex-start">
    <ListItemText
      primary={project.title}
      secondary={
        <>
          <Typography component="span" variant="body2" color="text.primary">
            {project.community}
          </Typography>
          <br />
          <Typography component="span" variant="body2">
            {`${project.volunteers} volunteers • Deadline: ${project.deadline}`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={project.progress}
            sx={{ mt: 1 }}
          />
        </>
      }
    />
    <ListItemSecondaryAction>
      <Button variant="outlined" onClick={() => handleViewDetails(project)}>
        View Details
      </Button>
    </ListItemSecondaryAction>
  </ListItem>
);

const Community = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const handleCreateCommunity = () => {
    setShowCreateDialog(true);
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsDialog(true);
  };

  const handleCloseDialog = () => {
    setShowCreateDialog(false);
    setShowDetailsDialog(false);
    setSelectedItem(null);
  };

  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Communities
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="environment">Environment</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="healthcare">Healthcare</MenuItem>
              <MenuItem value="food">Food Relief</MenuItem>
              <MenuItem value="animal">Animal Welfare</MenuItem>
              <MenuItem value="elderly">Elderly Care</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateCommunity}
            >
              Create Community
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Communities" />
          <Tab label="Events" />
          <Tab label="Projects" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {filteredCommunities.map((community) => (
            <Grid item key={community.id} xs={12} sm={6} md={4}>
              <CommunityCard community={community} />
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && (
        <Card>
          <List>
            {events.map((event, index) => (
              <React.Fragment key={event.id}>
                <EventListItem event={event} handleViewDetails={handleViewDetails} />
                {index < events.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Card>
      )}

      {tabValue === 2 && (
        <Card>
          <List>
            {projects.map((project, index) => (
              <React.Fragment key={project.id}>
                <ProjectListItem project={project} handleViewDetails={handleViewDetails} />
                {index < projects.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Card>
      )}

      <Dialog open={showCreateDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Community</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField label="Community Name" fullWidth required />
            <TextField label="Category" select fullWidth required>
              <MenuItem value="environment">Environment</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="healthcare">Healthcare</MenuItem>
              <MenuItem value="food">Food Relief</MenuItem>
              <MenuItem value="animal">Animal Welfare</MenuItem>
              <MenuItem value="elderly">Elderly Care</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
            </TextField>
            <TextField label="Location" fullWidth required />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              required
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<ImageIcon />}
            >
              Upload Cover Image
              <input type="file" hidden accept="image/*" />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDetailsDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedItem?.title || selectedItem?.name}
        </DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Stack spacing={2} sx={{ mt: 2 }}>
              {selectedItem.image && (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title || selectedItem.name}
                  style={{ width: '100%', height: 300, objectFit: 'cover' }}
                />
              )}
              <Typography variant="body1">
                {selectedItem.description}
              </Typography>
              {selectedItem.progress !== undefined && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Progress: {selectedItem.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={selectedItem.progress}
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Impact: {selectedItem.impact}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Requirements: {selectedItem.requirements}
                  </Typography>
                </>
              )}
              {selectedItem.date && (
                <>
                  <Typography variant="body2" color="text.secondary">
                    Date: {selectedItem.date} at {selectedItem.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {selectedItem.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Participants: {selectedItem.participants}/{selectedItem.maxParticipants}
                  </Typography>
                </>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
          >
            {selectedItem?.progress !== undefined ? 'Join Project' : 'Join Event'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Community;
