const jwt = require('jsonwebtoken');

// JWT secrets - IMPORTANT: Use environment variables in production!
const jwtConfig = {
  access: process.env.JWT_ACCESS_SECRET || 'reallysecretaccesssecret',
  refresh: process.env.JWT_REFRESH_SECRET || 'reallysecretrefreshsecret',
};

// Refresh tokens storage (REPLACE with a database or Redis in production)
let refreshTokens = []; // Make it a let so it can be reassigned

// Generate Access Token
const generateToken = (id, expiresIn) => {
  return jwt.sign({ id }, jwtConfig.access, { expiresIn });
};

// Generate Refresh Token
const generateRefreshToken = (id, expiresIn) => {
  return jwt.sign({ id }, jwtConfig.refresh, { expiresIn });
};

// Verify Token
const verifyToken = (token, secret, req, res) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error('JWT Verification Error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Store Refresh Token (REPLACE with database or Redis in production)
const storeRefreshToken = (token) => {
  refreshTokens.push(token);
};

// Find Refresh Token (REPLACE with database or Redis in production)
const findRefreshToken = (token) => {
  return refreshTokens.find(t => t === token);
};

// Delete Refresh Token (REPLACE with database or Redis in production)
const deleteRefreshToken = (token) => {
  refreshTokens = refreshTokens.filter(t => t !== token); // Correct filter logic
};

// Refresh Token Endpoint (`/token`)
exports.token = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  const foundToken = findRefreshToken(refreshToken);

  if (!foundToken) {
    return res.status(401).json({ error: 'Invalid Refresh Token' });
  }

  try {
    const decoded = verifyToken(refreshToken, jwtConfig.refresh, req, res);

    if (!decoded) {
      return; // verifyToken will handle the response
    }

    const accessToken = generateToken(decoded.id, { expiresIn: 86400 });

    const newRefreshToken = generateRefreshToken(decoded.id, { expiresIn: '7d' });
    storeRefreshToken(newRefreshToken);

    deleteRefreshToken(refreshToken);

    res.header('access_token', accessToken);
    res.json({
      auth: true,
      msg: 'Access Token Refreshed',
      token_type: 'bearer',
      access_token: accessToken,
      expires_in: 86400,
      refresh_token: newRefreshToken,
    });
  } catch (error) {
    console.error('Token Refresh Error:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
};

// Logout Endpoint (`/logout`)
exports.logout = (req, res) => {
  const token = req.body.token || req.headers.authorization?.split(' ')[1];

  if (token) {
    deleteRefreshToken(token);
  }

  res.json({ message: 'Logout successful' });
};

module.exports = {
  jwtConfig,
  refreshTokens,
  generateToken,
  generateRefreshToken,
  verifyToken,
  storeRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  token: exports.token, // Export the token endpoint handler
  logout: exports.logout, // Export the logout endpoint handler
};