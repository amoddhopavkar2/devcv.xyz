import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
  }>;
}

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get(`/api/resume/${id}`);
        setResumeData(response.data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchResumeData();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.post(`/api/resume/${id}`, resumeData);
      // Show success message
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  const handleGeneratePdf = async () => {
    try {
      const response = await axios.post(`/api/resume/${id}/generate`, {
        templateId: id,
        resumeData,
      });
      // Handle PDF generation response
      window.open(response.data.pdfUrl, '_blank');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const removeExperience = (expId: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== expId),
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Edit Resume
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ mr: 2 }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PdfIcon />}
              onClick={handleGeneratePdf}
            >
              Generate PDF
            </Button>
          </Box>
        </Box>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={resumeData.personalInfo.name}
              onChange={(e) =>
                setResumeData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, name: e.target.value },
                }))
              }
            />
            <TextField
              fullWidth
              label="Email"
              value={resumeData.personalInfo.email}
              onChange={(e) =>
                setResumeData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, email: e.target.value },
                }))
              }
            />
            <TextField
              fullWidth
              label="Phone"
              value={resumeData.personalInfo.phone}
              onChange={(e) =>
                setResumeData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, phone: e.target.value },
                }))
              }
            />
            <TextField
              fullWidth
              label="Location"
              value={resumeData.personalInfo.location}
              onChange={(e) =>
                setResumeData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, location: e.target.value },
                }))
              }
            />
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Professional Summary
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={resumeData.summary}
            onChange={(e) =>
              setResumeData((prev) => ({ ...prev, summary: e.target.value }))
            }
          />
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Experience</Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addExperience}
            >
              Add Experience
            </Button>
          </Box>
          {resumeData.experience.map((exp) => (
            <Box key={exp.id} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Experience Entry</Typography>
                <IconButton
                  color="error"
                  onClick={() => removeExperience(exp.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={exp.company}
                    onChange={(e) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: prev.experience.map((item) =>
                          item.id === exp.id
                            ? { ...item, company: e.target.value }
                            : item
                        ),
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    value={exp.position}
                    onChange={(e) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: prev.experience.map((item) =>
                          item.id === exp.id
                            ? { ...item, position: e.target.value }
                            : item
                        ),
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    value={exp.startDate}
                    onChange={(e) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: prev.experience.map((item) =>
                          item.id === exp.id
                            ? { ...item, startDate: e.target.value }
                            : item
                        ),
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    value={exp.endDate}
                    onChange={(e) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: prev.experience.map((item) =>
                          item.id === exp.id
                            ? { ...item, endDate: e.target.value }
                            : item
                        ),
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    value={exp.description}
                    onChange={(e) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: prev.experience.map((item) =>
                          item.id === exp.id
                            ? { ...item, description: e.target.value }
                            : item
                        ),
                      }))
                    }
                  />
                </Grid>
              </Grid>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </Paper>
      </Box>
    </Container>
  );
};

export default Editor; 