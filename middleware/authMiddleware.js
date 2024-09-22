const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = { authMiddleware };
