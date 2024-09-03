// src/middlewares/authMiddleware.js

// Placeholder for authentication middleware
// Replace with your actual authentication logic

const authMiddleware = (req, res, next) => {
    //check for secret key in the header
    const secretKey = req.header('x-secret');
    if (!secretKey) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (secretKey !== 'mysecretkey')
    {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();

    // Check if user is authenticated
    // If authenticated, call next() to proceed to the next middleware/route handler
    // If not authenticated, send an error response (e.g., 401 Unauthorized)
  };
  
  module.exports = authMiddleware;