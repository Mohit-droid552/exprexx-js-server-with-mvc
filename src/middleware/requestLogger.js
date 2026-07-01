module.exports = (req, res, next) => {
  const requestTime = new Date().toISOString();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;

  console.log(`[${requestTime}] ${req.method} ${req.originalUrl} - Client IP: ${ip}`);
  next();
};
