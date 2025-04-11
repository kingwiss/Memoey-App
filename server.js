// Simple Express server to handle contact form submissions
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure the data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Path to our submissions JSON file
const submissionsFile = path.join(dataDir, 'submissions.json');

// Initialize submissions file if it doesn't exist
if (!fs.existsSync(submissionsFile)) {
  fs.writeFileSync(submissionsFile, JSON.stringify([]), 'utf8');
}

// Helper function to read submissions
const getSubmissions = () => {
  try {
    const data = fs.readFileSync(submissionsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
};

// Helper function to write submissions
const saveSubmission = (submission) => {
  try {
    const submissions = getSubmissions();
    submissions.push({
      ...submission,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving submission:', error);
    return false;
  }
};

// API endpoint to receive webhook from FormSubmit.co
app.post('/api/contact-webhook', (req, res) => {
  const formData = req.body;
  
  if (!formData.name || !formData.email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }
  
  const success = saveSubmission(formData);
  
  if (success) {
    res.status(200).json({ success: true, message: 'Submission saved successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save submission' });
  }
});

// API endpoint to get all submissions
app.get('/api/submissions', (req, res) => {
  const submissions = getSubmissions();
  res.json(submissions);
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});