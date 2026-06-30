const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Third-party middleware: Morgan (HTTP request logger)
app.use(morgan('dev'));

// 2. Inbuilt middleware: express.json() to parse incoming JSON request bodies
app.use(express.json());

// 3. Custom middleware: Log all incoming requests
app.use((req, res, next) => {
  const requestTime = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  // Fallbacks to get the client IP address
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
  
  console.log(`[${requestTime}] ${method} ${url} - Client IP: ${ip}`);
  next();
});

// Mock database for demonstrations
const users = [
  { id: 1, name: 'Mohit Sharma', email: 'mohit.sharma@example.com', role: 'admin' },
  { id: 2, name: 'Mohit Sharma', email: 'mohit.sharma@example.com', role: 'user' },
  { id: 3, name: 'Mohit Sharma', email: 'mohit.sharma@example.com', role: 'user' }
];

// --- ROUTES ---

// Route 1: Welcome Route (GET)
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Express Demo API!',
    documentation: {
      routes: [
        { path: '/', method: 'GET', description: 'API Welcome page' },
        { path: '/users/:id', method: 'GET', description: 'Retrieve a user by ID using path parameters' },
        { path: '/search', method: 'GET', description: 'Search users using query parameters (e.g., /search?role=user)' },
        { path: '/users', method: 'POST', description: 'Create a new user using the request body' }
      ]
    }
  });
});

// Route 2: Route Params (GET /users/:id)
// Retrieves a user by their unique ID passed in the URL path.
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: `User with ID ${req.params.id} not found.` });
  }

  res.json({
    message: 'User retrieved successfully',
    data: user
  });
});

// Route 3: Query Params (GET /search)
// Filters users based on query parameter 'role' or search term 'name'
// E.g., /search?role=user or /search?name=Mohit
app.get('/search', (req, res) => {
  const { role, name } = req.query;
  let results = [...users];

  if (role) {
    results = results.filter(u => u.role.toLowerCase() === role.toLowerCase());
  }

  if (name) {
    results = results.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
  }

  res.json({
    queryReceived: req.query,
    count: results.length,
    data: results
  });
});

// Route 4: Request Body (POST /users)
// Expects a JSON object with 'name', 'email', and 'role' in the body to create a new user.
app.post('/users', (req, res) => {
  const { name, email, role } = req.body;

  // Simple validation
  if (!name || !email) {
    return res.status(400).json({
      error: 'Missing required fields. Please provide both name and email.'
    });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    role: role || 'user'
  };

  users.push(newUser);

  res.status(201).json({
    message: 'User created successfully',
    data: newUser
  });
});

// Error handling middleware (bonus)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running and listening on http://localhost:${PORT}`);
});
