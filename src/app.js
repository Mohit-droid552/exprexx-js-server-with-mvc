const express = require('express');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');
const requestLogger = require('./middleware/requestLogger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Express MVC CRUD API',
    endpoints: {
      users: {
        list: 'GET /api/users',
        getOne: 'GET /api/users/:id',
        create: 'POST /api/users',
        replace: 'PUT /api/users/:id',
        update: 'PATCH /api/users/:id',
        delete: 'DELETE /api/users/:id'
      }
    }
  });
});

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
