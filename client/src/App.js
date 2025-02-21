import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Community from "./components/Community";
import Stream from "./components/Stream";
import Opportunities from "./components/Opportunities";
import EmergencyDisaster from "./components/EmergencyDisaster";
import Redeem from "./components/Redeem";
import GivLogo from "./components/GivLogo";
import { getCurrentUser, logout } from "./services/auth";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AndroidIcon from '@mui/icons-material/Android';
import WalletButton from "./components/WalletButton";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF9933", // Saffron color from Indian flag
      dark: "#E65100",
      light: "#FFB74D",
    },
    secondary: {
      main: "#138808", // Green color from Indian flag
      dark: "#1B5E20",
      light: "#4CAF50",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    error: {
      main: "#B71C1C",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    handleClose();
    window.location.href = "/";
  };

  const handleLogin = (userData) => {
    setUser(userData);
    handleClose();
  };

  const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate("/");
    }, [navigate]);
    return null;
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!user) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky">
            <Toolbar sx={{ minHeight: { sm: '64px' }, px: { sm: 3 } }}>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  flexGrow: 1,
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <GivLogo />
                Giv
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/"
                  sx={{ 
                    fontSize: '0.9rem',
                    minWidth: 'auto',
                    px: 1.5
                  }}
                >
                  Home
                </Button>

                {user ? (
                  <>
                    <Button 
                      color="inherit" 
                      component={Link} 
                      to="/stream"
                      sx={{ 
                        fontSize: '0.9rem',
                        minWidth: 'auto',
                        px: 1.5
                      }}
                    >
                      Feed
                    </Button>
                    <Button 
                      color="inherit" 
                      component={Link} 
                      to="/opportunities"
                      sx={{ 
                        fontSize: '0.9rem',
                        minWidth: 'auto',
                        px: 1.5
                      }}
                    >
                      Opportunities
                    </Button>
                    <Button 
                      color="inherit" 
                      component={Link} 
                      to="/dashboard"
                      sx={{ 
                        fontSize: '0.9rem',
                        minWidth: 'auto',
                        px: 1.5
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button 
                      color="inherit" 
                      component={Link} 
                      to="/community"
                      sx={{ 
                        fontSize: '0.9rem',
                        minWidth: 'auto',
                        px: 1.5
                      }}
                    >
                      Community
                    </Button>
                    
                    <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
                      <WalletButton />
                    </Stack>

                    <Box sx={{ ml: 1 }}>
                      <IconButton
                        size="small"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        sx={{ ml: 0.5 }}
                      >
                        {user.avatar ? (
                          <Avatar 
                            src={user.avatar} 
                            alt={user.username}
                            sx={{ width: 32, height: 32 }}
                          />
                        ) : (
                          <AccountCircleIcon sx={{ fontSize: '1.8rem' }} />
                        )}
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                          Profile
                        </MenuItem>
                        <MenuItem component={Link} to="/redeem" onClick={handleClose}>
                          Redeem Coins
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </Box>
                  </>
                ) : (
                  <>
                    <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
                      <WalletButton />
                    </Stack>
                    <Button 
                      color="inherit" 
                      component={Link} 
                      to="/login"
                      sx={{ 
                        fontSize: '0.9rem',
                        minWidth: 'auto',
                        px: 1.5
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      color="inherit" 
                      component={Link} 
                      to="/register"
                      sx={{ 
                        fontSize: '0.9rem',
                        minWidth: 'auto',
                        px: 1.5
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Box>
            </Toolbar>
          </AppBar>
          <EmergencyDisaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login setUser={handleLogin} />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Register setUser={handleLogin} />
                )
              } 
            />
            <Route
              path="/stream"
              element={
                <ProtectedRoute>
                  <Stream />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              }
            />
            <Route
              path="/opportunities"
              element={
                <ProtectedRoute>
                  <Opportunities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/emergency-disaster"
              element={
                <ProtectedRoute>
                  <EmergencyDisaster />
                </ProtectedRoute>
              }
            />
            <Route
              path="/redeem"
              element={
                <ProtectedRoute>
                  <Redeem />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
