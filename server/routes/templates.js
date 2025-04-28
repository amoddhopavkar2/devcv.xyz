const express = require('express');
const router = express.Router();

// Sample templates data (we'll move this to a database later)
const templates = [
  {
    id: 'jakes-resume',
    name: "Jake's Resume",
    description: 'A clean and professional resume template',
    thumbnail: '/templates/jakes-resume/thumbnail.png',
    latexTemplate: '/templates/jakes-resume/template.tex'
  },
  {
    id: 'faangpath',
    name: 'FAANGPath',
    description: 'Optimized for tech industry applications',
    thumbnail: '/templates/faangpath/thumbnail.png',
    latexTemplate: '/templates/faangpath/template.tex'
  }
];

// Get all templates
router.get('/', (req, res) => {
  res.json(templates);
});

// Get a specific template
router.get('/:id', (req, res) => {
  const template = templates.find(t => t.id === req.params.id);
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }
  res.json(template);
});

module.exports = router; 