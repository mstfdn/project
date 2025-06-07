import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Fade,
  useTheme
} from '@mui/material';
import {
  LocalShipping,
  Scale,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';
import { SkipCardProps } from '../types/Skip';

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const theme = useTheme();
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);

  const getSkipColor = (size: number) => {
    if (size <= 6) return theme.palette.success.main;
    if (size <= 12) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Fade in timeout={300}>
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isSelected ? 'scale(1.02)' : 'scale(1)',
          border: isSelected ? `3px solid ${theme.palette.primary.main}` : '1px solid rgba(0,0,0,0.12)',
          boxShadow: isSelected 
            ? `0 8px 32px rgba(${theme.palette.primary.main}20)` 
            : '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          },
          borderRadius: 3,
          overflow: 'hidden'
        }}
        onClick={() => onSelect(skip)}
      >
        <Box
          sx={{
            height: 8,
            background: `linear-gradient(90deg, ${getSkipColor(skip.size)}, ${getSkipColor(skip.size)}99)`
          }}
        />
        
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box>
              <Typography variant="h4" component="h3" fontWeight={700} color="primary">
                {skip.size} Yard
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Skip Container
              </Typography>
            </Box>
            {isSelected && (
              <CheckCircle 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontSize: 32,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }} 
              />
            )}
          </Box>

          <Box mb={3}>
            <Typography variant="h5" component="div" fontWeight={600} color="text.primary">
              £{totalPrice.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total price including VAT
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap={1.5} mb={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2">
                {skip.hire_period_days} days rental period
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" gap={1}>
              <LocalShipping sx={{ fontSize: 18, color: skip.allowed_on_road ? 'success.main' : 'error.main' }} />
              <Typography variant="body2">
                On the road: {skip.allowed_on_road ? 'Permitted' : 'Not Permitted'}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" gap={1}>
              <Scale sx={{ fontSize: 18, color: skip.allows_heavy_waste ? 'success.main' : 'error.main' }} />
              <Typography variant="body2">
                Heavy waste: {skip.allows_heavy_waste ? 'Accepted' : 'Not Accepted'}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" flex-wrap gap={1} mb={3}>
            <Chip
              label={`${skip.size} Yard`}
              size="small"
              sx={{ 
                backgroundColor: `${getSkipColor(skip.size)}20`,
                color: getSkipColor(skip.size),
                fontWeight: 600
              }}
            />
            <Chip
              label={`${skip.hire_period_days} Days`}
              size="small"
              variant="outlined"
            />
            {skip.transport_cost && (
              <Chip
                label="Transport Included"
                size="small"
                color="info"
                variant="outlined"
              />
            )}
          </Box>

          <Button
            variant={isSelected ? "contained" : "outlined"}
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              ...(isSelected && {
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                }
              })
            }}
          >
            {isSelected ? 'Selected' : 'Select This Skip'}
          </Button>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default SkipCard;