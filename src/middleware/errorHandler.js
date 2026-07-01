module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ error: errors.join(' ') });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: `Invalid ${err.path}: ${err.value}` });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: 'A user with this email already exists.' });
  }

  res.status(500).json({ error: 'Something went wrong on the server.' });
};
