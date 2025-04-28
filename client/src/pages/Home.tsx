import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  Create as CreateIcon,
  FormatPaint as FormatPaintIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Create New Resume',
      description: 'Start building your professional resume from scratch',
      icon: <CreateIcon fontSize="large" />,
      action: () => navigate('/templates'),
    },
    {
      title: 'Choose Templates',
      description: 'Select from our collection of professional templates',
      icon: <FormatPaintIcon fontSize="large" />,
      action: () => navigate('/templates'),
    },
    {
      title: 'Manage Resumes',
      description: 'View and edit your existing resumes',
      icon: <DescriptionIcon fontSize="large" />,
      action: () => navigate('/resumes'),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          pt: 8,
          pb: 6,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          color="primary"
          gutterBottom
        >
          Welcome to Resume Builder
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Create professional resumes with our easy-to-use editor and beautiful templates.
          Export to PDF or LaTeX with a single click.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<CreateIcon />}
            onClick={() => navigate('/templates')}
            sx={{ mr: 2 }}
          >
            Create New Resume
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<FormatPaintIcon />}
            onClick={() => navigate('/templates')}
          >
            Browse Templates
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 4,
          mt: 4,
        }}
      >
        {features.map((feature) => (
          <Card
            key={feature.title}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Box sx={{ mb: 2 }}>{feature.icon}</Box>
              <Typography gutterBottom variant="h5" component="h2">
                {feature.title}
              </Typography>
              <Typography>{feature.description}</Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                onClick={feature.action}
              >
                Get Started
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Home; 