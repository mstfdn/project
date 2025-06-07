import React, { useState, useMemo } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Fade,
  useMediaQuery
} from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import ProgressStepper from './components/ProgressStepper';
import SkipCard from './components/SkipCard';
import FilterSidebar from './components/FilterSidebar';
import { skipData } from './data/skipData';
import { SkipData } from './types/Skip';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      dark: '#4f46e5',
      light: '#8b5cf6',
    },
    secondary: {
      main: '#f59e0b',
      dark: '#d97706',
      light: '#fbbf24',
    },
    background: {
      default: '#fafbfc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  const [selectedSkip, setSelectedSkip] = useState<SkipData | null>(null);
  const [filters, setFilters] = useState({
    allowedOnRoad: false,
    allowsHeavyWaste: false,
    maxPrice: 1500,
    minSize: 4,
    maxSize: 40,
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredSkips = useMemo(() => {
    return skipData.filter(skip => {
      const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);
      
      return (
        (!filters.allowedOnRoad || skip.allowed_on_road) &&
        (!filters.allowsHeavyWaste || skip.allows_heavy_waste) &&
        totalPrice <= filters.maxPrice &&
        skip.size >= filters.minSize &&
        skip.size <= filters.maxSize
      );
    });
  }, [filters]);

  const handleSkipSelect = (skip: SkipData) => {
    setSelectedSkip(selectedSkip?.id === skip.id ? null : skip);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      alert(`${selectedSkip.size} Yard skip selected! Proceeding to next step...`);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      allowedOnRoad: false,
      allowsHeavyWaste: false,
      maxPrice: 1500,
      minSize: 4,
      maxSize: 40,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Header />
          <ProgressStepper activeStep={1} />
          
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <Fade in timeout={600}>
              <Box textAlign="center" mb={5}>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  fontWeight={700}
                  sx={{ 
                    mb: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Choose Your Skip Size
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.secondary"
                  sx={{ maxWidth: 600, mx: 'auto' }}
                >
                  Select the most suitable skip size for your needs and start the rental process immediately
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={4}>
              {!isMobile && (
                <Grid item md={3}>
                  <Fade in timeout={800}>
                    <Box>
                      <FilterSidebar filters={filters} onFiltersChange={setFilters} />
                      <Box mt={2}>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={handleResetFilters}
                          sx={{ textTransform: 'none' }}
                        >
                          Clear Filters
                        </Button>
                      </Box>
                    </Box>
                  </Fade>
                </Grid>
              )}
              
              <Grid item xs={12} md={isMobile ? 12 : 9}>
                <Box mb={3}>
                  <Typography variant="body1" color="text.secondary">
                    {filteredSkips.length} skip found
                    {selectedSkip && (
                      <Typography component="span" color="primary.main" fontWeight={600}>
                        {' • '}{selectedSkip.size} Yard skip selected
                      </Typography>
                    )}
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  {filteredSkips.map((skip, index) => (
                    <Grid item xs={12} sm={6} lg={4} key={skip.id}>
                      <Fade in timeout={400 + index * 100}>
                        <Box>
                          <SkipCard
                            skip={skip}
                            isSelected={selectedSkip?.id === skip.id}
                            onSelect={handleSkipSelect}
                          />
                        </Box>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>

                {filteredSkips.length === 0 && (
                  <Fade in timeout={600}>
                    <Box 
                      textAlign="center" 
                      py={8}
                      sx={{
                        backgroundColor: 'background.paper',
                        borderRadius: 3,
                        border: '1px solid rgba(0,0,0,0.08)'
                      }}
                    >
                      <Typography variant="h6" color="text.secondary" mb={2}>
                        No skips found matching your filter criteria
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={handleResetFilters}
                        sx={{ textTransform: 'none' }}
                      >
                        Clear Filters
                      </Button>
                    </Box>
                  </Fade>
                )}
              </Grid>
            </Grid>

            {selectedSkip && (
              <Fade in timeout={400}>
                <Box
                  sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 1000,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleContinue}
                    sx={{
                      py: 2,
                      px: 4,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Continue →
                  </Button>
                </Box>
              </Fade>
            )}
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
