import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import apiClient from '../api/client';

const templatePreviews: Record<string, string> = {
  'faangpath': '/faangpath-preview.jpg',
  'jakes-resume': '/jakes-resume-preview.jpg',
};

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
}

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await apiClient.get('/api/templates');
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Choose a Template
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 4 }}
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 4,
          }}
        >
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="350"
                image={templatePreviews[template.id] || '/logo192.png'}
                alt={template.name}
                sx={{ objectFit: 'contain', background: '#fafafa' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {template.name}
                </Typography>
                <Typography>{template.description}</Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/editor/${template.id}`)}
                >
                  Use This Template
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Templates; 