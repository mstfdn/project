import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LocationOn,
  DeleteOutline,
  DateRange,
  Payment,
  CheckCircle
} from '@mui/icons-material';

interface ProgressStepperProps {
  activeStep: number;
}

const steps = [
  { label: 'Konum', icon: <LocationOn /> },
  { label: 'Skip Seçimi', icon: <DeleteOutline /> },
  { label: 'Tarih Seçimi', icon: <DateRange /> },
  { label: 'Ödeme', icon: <Payment /> },
  { label: 'Tamamlandı', icon: <CheckCircle /> }
];

const ProgressStepper: React.FC<ProgressStepperProps> = ({ activeStep }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        py: 3,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)'
      }}
    >
      <Container maxWidth="lg">
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel={!isMobile}
          orientation={isMobile ? 'vertical' : 'horizontal'}
          sx={{
            '& .MuiStepConnector-root': {
              top: isMobile ? 12 : 22,
              left: isMobile ? -6 : 'calc(-50% + 16px)',
              right: isMobile ? 'calc(50% + 16px)' : 'calc(50% + 16px)',
            },
            '& .MuiStepConnector-line': {
              borderColor: 'rgba(0,0,0,0.15)',
              borderTopWidth: 2,
            },
            '& .Mui-completed .MuiStepConnector-line': {
              borderColor: theme.palette.primary.main,
            },
            '& .Mui-active .MuiStepConnector-line': {
              borderColor: theme.palette.primary.main,
            }
          }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={({ active, completed }) => (
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: completed || active 
                        ? theme.palette.primary.main 
                        : 'rgba(0,0,0,0.1)',
                      color: completed || active ? 'white' : 'rgba(0,0,0,0.4)',
                      transition: 'all 0.3s ease',
                      boxShadow: completed || active 
                        ? `0 4px 12px ${theme.palette.primary.main}40` 
                        : 'none',
                    }}
                  >
                    {React.cloneElement(step.icon, { sx: { fontSize: 20 } })}
                  </Box>
                )}
                sx={{
                  '& .MuiStepLabel-label': {
                    mt: 1,
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    fontWeight: activeStep === index ? 600 : 400,
                    color: activeStep === index 
                      ? theme.palette.primary.main 
                      : 'text.secondary'
                  }
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Box>
  );
};

export default ProgressStepper;