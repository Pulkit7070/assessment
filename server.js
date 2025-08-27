const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Simulated database - users table with dummy data
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@company.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@nonprofit.org' },
  { id: 3, name: 'Carol Davis', email: 'carol@university.edu' },
  { id: 4, name: 'David Wilson', email: 'david@charity.org' },
  { id: 5, name: 'Eva Brown', email: 'eva@tech.com' },
  { id: 6, name: 'Frank Miller', email: 'frank@foundation.org' },
  { id: 7, name: 'Grace Lee', email: 'grace@startup.com' }
];

// REST API endpoint to get all users
app.get('/api/users', (req, res) => {
  try {
    // Simulate database query delay
    setTimeout(() => {
      res.json({
        success: true,
        data: users,
        message: 'Users retrieved successfully'
      });
    }, 500);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve users'
    });
  }
});

// REST API endpoint to add a new user
app.post('/api/users', (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required'
      });
    }
    
    // Create new user with auto-increment ID
    const newUser = {
      id: users.length + 1,
      name: name.trim(),
      email: email.trim()
    };
    
    // Add to users array
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Root endpoint for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Assessment Backend API is running',
    endpoints: {
      health: '/api/health',
      users: '/api/users'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment PORT: ${process.env.PORT || 'not set'}`);
});