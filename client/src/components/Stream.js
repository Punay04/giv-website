import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Button,
  Divider,
  IconButton,
  Pagination,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalOffer as TagIcon,
  DateRange as DateIcon,
  TrendingUp as TrendingIcon,
  NewReleases as NewestIcon,
  Favorite as PopularIcon,
  FilterList as FilterIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
} from '@mui/icons-material';

// Mock data for demonstration
const blogPosts = [
  {
    id: 1,
    title: "Transforming Education in Rural Maharashtra",
    category: "Education",
    author: "Priya Sharma",
    authorRole: "Education Lead",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    date: "February 15, 2025",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    summary: "Our team of volunteers has been working with rural schools to implement innovative teaching methods and improve learning outcomes. See how we're making a difference in children's lives.",
    tags: ["Education", "Rural Development", "Teaching"],
    readTime: "5 min read",
    views: 1250,
    likes: 328,
    location: "Maharashtra, India"
  },
  {
    id: 2,
    title: "Food Distribution Drive Reaches 10,000 Families",
    category: "Food Relief",
    author: "Rahul Verma",
    authorRole: "Food Relief Coordinator",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    date: "February 12, 2025",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
    summary: "A successful collaboration between Giv volunteers and local NGOs helped us reach families affected by food insecurity. Learn about our distribution strategy and impact.",
    tags: ["Food Relief", "Community Service", "NGO Collaboration"],
    readTime: "4 min read",
    views: 980,
    likes: 245,
    location: "Delhi, India"
  },
  {
    id: 3,
    title: "Green Warriors: Bangalore's Urban Forest Initiative",
    category: "Environment",
    author: "Anjali Desai",
    authorRole: "Environmental Lead",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    date: "February 10, 2025",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    summary: "Our environmental volunteers have transformed vacant urban lots into mini forests. Discover the technique we used and how you can replicate it in your city.",
    tags: ["Environment", "Urban Planning", "Sustainability"],
    readTime: "6 min read",
    views: 1560,
    likes: 412,
    location: "Bangalore, India"
  },
  {
    id: 4,
    title: "Healthcare Camp Success in Delhi Slums",
    category: "Healthcare",
    author: "Dr. Amit Kumar",
    authorRole: "Healthcare Coordinator",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    date: "February 8, 2025",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f",
    summary: "Free medical checkups and awareness sessions reached over 500 families. Read about the impact and lessons learned from our recent healthcare initiative.",
    tags: ["Healthcare", "Community Health", "Medical Camp"],
    readTime: "7 min read",
    views: 890,
    likes: 198,
    location: "Delhi, India"
  },
  {
    id: 5,
    title: "Digital Literacy Program for Senior Citizens",
    category: "Education",
    author: "Sneha Patel",
    authorRole: "Tech Education Lead",
    authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    date: "February 7, 2025",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    summary: "Our volunteers are helping senior citizens bridge the digital divide. Learn about our teaching methodology and the impact on elderly communities.",
    tags: ["Digital Literacy", "Senior Care", "Technology"],
    readTime: "5 min read",
    views: 756,
    likes: 189,
    location: "Pune, India"
  },
  {
    id: 6,
    title: "Women's Skill Development Workshop",
    category: "Skill Development",
    author: "Maya Krishnan",
    authorRole: "Skills Program Manager",
    authorAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb",
    date: "February 5, 2025",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    summary: "Empowering women through vocational training and entrepreneurship skills. See how our workshops are creating economic independence.",
    tags: ["Women Empowerment", "Skills Training", "Entrepreneurship"],
    readTime: "6 min read",
    views: 945,
    likes: 276,
    location: "Chennai, India"
  },
  {
    id: 7,
    title: "Beach Cleanup Drive in Mumbai",
    category: "Environment",
    author: "Rohan Shah",
    authorRole: "Environmental Activist",
    authorAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef",
    date: "February 3, 2025",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec",
    summary: "Monthly beach cleanup initiative removes 2 tons of plastic waste. Discover our waste management strategy and community involvement approach.",
    tags: ["Environment", "Waste Management", "Community Action"],
    readTime: "5 min read",
    views: 823,
    likes: 234,
    location: "Mumbai, India"
  },
  {
    id: 8,
    title: "Rural Sports Development Program",
    category: "Youth Development",
    author: "Kiran Singh",
    authorRole: "Sports Coordinator",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    date: "February 1, 2025",
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77",
    summary: "Bringing sports facilities and training to rural youth. Learn about our sports development program and its impact on young athletes.",
    tags: ["Sports", "Youth Development", "Rural India"],
    readTime: "4 min read",
    views: 678,
    likes: 156,
    location: "Punjab, India"
  },
  {
    id: 9,
    title: "Mental Health Awareness Campaign",
    category: "Healthcare",
    author: "Dr. Priya Mehta",
    authorRole: "Mental Health Expert",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    date: "January 30, 2025",
    image: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8",
    summary: "Breaking stigma around mental health through community workshops. See how we're making mental healthcare accessible to all.",
    tags: ["Mental Health", "Healthcare", "Community Welfare"],
    readTime: "7 min read",
    views: 1102,
    likes: 342,
    location: "Hyderabad, India"
  }
];

const categories = [
  { id: "all", label: "All Categories", count: 150 },
  { id: "education", label: "Education", count: 45 },
  { id: "healthcare", label: "Healthcare", count: 38 },
  { id: "environment", label: "Environment", count: 32 },
  { id: "food-relief", label: "Food Relief", count: 28 },
  { id: "skill-development", label: "Skill Development", count: 25 }
];

const sortOptions = [
  { value: 'newest', label: 'Newest First', icon: <NewestIcon /> },
  { value: 'popular', label: 'Most Popular', icon: <PopularIcon /> },
  { value: 'trending', label: 'Trending', icon: <TrendingIcon /> }
];

const Feed = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  
  // Derived values
  const postsPerPage = 5;
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

  // Filter posts based on all criteria
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          post.category.toLowerCase() === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => post.tags.includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });

  // Sort posts based on selected criteria
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'trending':
        return b.views - a.views;
      case 'newest':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const currentPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Handlers
  const handleLikePost = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const handleSavePost = (postId) => {
    setSavedPosts(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(postId)) {
        newSaved.delete(postId);
      } else {
        newSaved.add(postId);
      }
      return newSaved;
    });
  };

  const handleShare = (post) => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      });
    }
  };

  return (
    <Box>
      {/* Hero Section - Updated to match home page style */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          background: 'rgb(241,158,75)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ fontWeight: 'bold', mb: 4 }}
              >
                Impact Stories
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Discover inspiring stories of change and community service from our volunteers across India
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  Share Your Story
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'grey.100',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Explore Categories
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1518674660708-0e2c0473e68e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN0b3J5fGVufDB8fDB8fHww"
                alt="Volunteer Impact"
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

      {/* Filters Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Search Bar */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search stories..."
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

          {/* Sort Dropdown */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                displayEmpty
                startAdornment={
                  <InputAdornment position="start">
                    <FilterIcon />
                  </InputAdornment>
                }
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {option.icon}
                      <Typography>{option.label}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Categories */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Categories
            </Typography>
            <Stack 
              direction="row" 
              spacing={1} 
              sx={{ 
                flexWrap: 'wrap', 
                gap: 1,
                mb: 2 
              }}
            >
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  label={`${category.label} (${category.count})`}
                  onClick={() => setSelectedCategory(category.id)}
                  color={selectedCategory === category.id ? "primary" : "default"}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Grid>

          {/* Tags */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Popular Tags
            </Typography>
            <Stack 
              direction="row" 
              spacing={1} 
              sx={{ 
                flexWrap: 'wrap', 
                gap: 1 
              }}
            >
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => {
                    setSelectedTags(prev => 
                      prev.includes(tag)
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                  color={selectedTags.includes(tag) ? "secondary" : "default"}
                  size="small"
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Blog Posts List */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          {currentPosts.map((post) => (
            <Card 
              key={post.id} 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                }
              }}
            >
              <CardMedia
                component="img"
                sx={{ 
                  width: { xs: '100%', md: 300 }, 
                  height: { xs: 200, md: 'auto' } 
                }}
                image={post.image}
                alt={post.title}
              />
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    size="small"
                    label={post.category}
                    color="primary"
                    icon={<TagIcon />}
                  />
                  <Chip
                    size="small"
                    label={post.readTime}
                    icon={<DateIcon />}
                  />
                  <Chip
                    size="small"
                    label={`${post.views} views`}
                    variant="outlined"
                  />
                </Stack>

                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    color: theme.palette.text.primary 
                  }}
                >
                  {post.title}
                </Typography>

                <Typography 
                  color="text.secondary" 
                  paragraph
                  sx={{ 
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.summary}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                  <Divider sx={{ my: 2 }} />
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm="auto">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={post.authorAvatar} />
                        <Box>
                          <Typography variant="subtitle2">
                            {post.author}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                          >
                            {post.date} · {post.location}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    
                    <Grid item xs />
                    
                    <Grid item>
                      <Stack direction="row" spacing={1}>
                        <IconButton 
                          size="small"
                          onClick={() => handleLikePost(post.id)}
                          color={likedPosts.has(post.id) ? "primary" : "default"}
                        >
                          {likedPosts.has(post.id) ? <LikedIcon /> : <LikeIcon />}
                        </IconButton>
                        <IconButton 
                          size="small"
			onClick={() => handleSavePost(post.id)}
                          color={savedPosts.has(post.id) ? "primary" : "default"}
                        >
                          <BookmarkIcon />
                        </IconButton>
                        <IconButton 
                          size="small"
                          onClick={() => handleShare(post)}
                        >
                          <ShareIcon />
                        </IconButton>
                        <Button 
                          variant="contained" 
                          color="primary"
                          component={RouterLink}
                          to={`/post/${post.id}`}
                          sx={{ ml: 1 }}
                        >
                          Read More
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
            size={isMobile ? "small" : "medium"}
            showFirstButton
            showLastButton
          />
        </Box>
      </Container>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            No stories found
          </Typography>
          <Typography color="text.secondary" paragraph>
            Try adjusting your search or filters to find what you're looking for.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedTags([]);
              setSortBy('newest');
            }}
          >
            Clear all filters
          </Button>
        </Container>
      )}

      {/* Newsletter Subscription */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="md">
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Stay Updated with Impact Stories
            </Typography>
            <Typography color="text.secondary" paragraph>
              Subscribe to our newsletter to receive weekly updates about volunteer stories and opportunities.
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    variant="outlined"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ height: '100%', px: 4 }}
                  >
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Feed;