import jwt from 'jsonwebtoken';

const verifyJwt = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Bearer <token>

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  
    
    next();  
  } catch (error) {
    console.error('Invalid token', error);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default verifyJwt;
