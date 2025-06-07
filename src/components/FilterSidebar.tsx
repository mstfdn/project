import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Slider,
  Paper,
  Divider
} from '@mui/material';
import { TuneOutlined } from '@mui/icons-material';

interface FilterSidebarProps {
  filters: {
    allowedOnRoad: boolean;
    allowsHeavyWaste: boolean;
    maxPrice: number;
    minSize: number;
    maxSize: number;
  };
  onFiltersChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: 'fit-content',
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(0,0,0,0.08)'
      }}
    >
      <Box display="flex" alignItems="center" mb={3}>
        <TuneOutlined sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight={600}>
          Filtreler
        </Typography>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle2" fontWeight={600} mb={2}>
          Özellikler
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={filters.allowedOnRoad}
              onChange={(e) => onFiltersChange({ ...filters, allowedOnRoad: e.target.checked })}
              color="primary"
            />
          }
          label="Yol üzerinde kullanılabilir"
          sx={{ mb: 1 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={filters.allowsHeavyWaste}
              onChange={(e) => onFiltersChange({ ...filters, allowsHeavyWaste: e.target.checked })}
              color="primary"
            />
          }
          label="Ağır atık kabul eder"
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box mb={3}>
        <Typography variant="subtitle2" fontWeight={600} mb={2}>
          Fiyat Aralığı (₺)
        </Typography>
        <Box px={1}>
          <Slider
            value={filters.maxPrice}
            onChange={(_, value) => onFiltersChange({ ...filters, maxPrice: value as number })}
            min={200}
            max={1500}
            step={50}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `₺${value}`}
            sx={{ color: 'primary.main' }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
          Maksimum: ₺{filters.maxPrice}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="subtitle2" fontWeight={600} mb={2}>
          Skip Boyutu (Yard)
        </Typography>
        <Box px={1}>
          <Slider
            value={[filters.minSize, filters.maxSize]}
            onChange={(_, value) => {
              const [min, max] = value as number[];
              onFiltersChange({ ...filters, minSize: min, maxSize: max });
            }}
            min={4}
            max={40}
            step={2}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} Yard`}
            sx={{ color: 'primary.main' }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
          {filters.minSize} - {filters.maxSize} Yard
        </Typography>
      </Box>
    </Paper>
  );
};

export default FilterSidebar;