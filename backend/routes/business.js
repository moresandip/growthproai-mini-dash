const express = require('express');
const router = express.Router();

// Simulated headlines for different business types and locations
const headlineTemplates = [
  "Why {name} is {location}'s Best Kept Secret in 2025",
  "{name}: The Future of Excellence in {location}",
  "Discover Why {name} is Revolutionizing {location}",
  "Local Love: How {name} Became {location}'s Favorite",
  "{name} - Where Quality Meets Community in {location}",
  "The Story Behind {location}'s Most Trusted {name}",
  "From Hidden Gem to {location} Legend: The {name} Journey",
  "Why {name} is Setting New Standards in {location}",
  "{name}: Your {location} Destination for Excellence",
  "Breaking: {name} Transforms the {location} Experience",
  "Unveiling {location}'s Hidden Gem: {name}",
  "How {name} Became {location}'s Talk of the Town",
  "{name}: Redefining Success in {location}",
  "The {name} Experience: {location}'s Premium Choice",
  "Why {location} Residents Choose {name} Every Time"
];

// Helper function to generate headline
const generateHeadline = (name, location) => {
  const template = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
  return template
    .replace(/{name}/g, name)
    .replace(/{location}/g, location);
};

// POST /api/business-data
router.post('/business-data', (req, res) => {
  try {
    const { name, location } = req.body;

    // Validation
    if (!name || !location) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Both name and location are required'
      });
    }

    if (typeof name !== 'string' || typeof location !== 'string') {
      return res.status(400).json({
        error: 'Invalid data types',
        message: 'Name and location must be strings'
      });
    }

    // Generate realistic but varied data
    const rating = Number((3.8 + Math.random() * 1.2).toFixed(1));
    const reviews = Math.floor(50 + Math.random() * 500);
    const headline = generateHeadline(name, location);

    // Simulate network delay (optional, remove for production)
    setTimeout(() => {
      res.json({
        rating,
        reviews,
        headline,
        timestamp: new Date().toISOString()
      });
    }, 800);

  } catch (error) {
    console.error('Error in /business-data:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate business data'
    });
  }
});

// GET /api/regenerate-headline
router.get('/regenerate-headline', (req, res) => {
  try {
    const { name, location } = req.query;

    // Validation
    if (!name || !location) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'Both name and location query parameters are required'
      });
    }

    const headline = generateHeadline(name, location);

    // Simulate shorter delay for regeneration
    setTimeout(() => {
      res.json({
        headline,
        timestamp: new Date().toISOString()
      });
    }, 500);

  } catch (error) {
    console.error('Error in /regenerate-headline:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to regenerate headline'
    });
  }
});

module.exports = router;