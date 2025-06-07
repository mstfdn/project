import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 2 }}>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                mr: 2
              }}
            >
              <DeleteIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                component="h1"
                sx={{ 
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '-0.02em'
                }}
              >
                Skip Kiralama
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.8)',
                  mt: 0.5
                }}
              >
                En uygun skip'i seçin ve hemen kiralayın
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;