import { verifyToken } from '../utils/auth.utils.js'
import BlacklistedToken from '../models/token.model.js';
import User from '../models/user.model.js'
import { action as a } from '../Enums/permission.enum.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        message: 'Not authorized, no token' 
      });
    }

    // Check if token is blacklisted
    const blacklisted = await BlacklistedToken.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ 
        message: 'Token has been revoked' 
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    req.auth = await User.findById(decoded._id).populate({
      path: 'role',
      populate: { path: 'permissions' }
    });

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ 
      message: 'Not authorized, token failed',
      error: error.message 
    });
  }
};

export const checkPermission = (feature, action) => {
  return async (req, res, next) => {
    const user = req.auth

    const hasPermission = user.role.permissions.some(p => 
      p.feature === feature && p.action === action
    )

    const hasALLAction = user.role.permissions.some(p => 
      p.feature === feature && p.action === a.ALL
    )

    const hasOwnAction = user.role.permissions.some(p => 
      p.feature === feature && p.action === a.OWN
    )

    req.action = action || "undefined"

    if (hasALLAction) return next()
    
    if (req.params.id){
      if (hasOwnAction && req.params.id === user._id.toString()) return next() 
    }

    if (!hasPermission) {
      return res.status(403).json({
        message: 'Forbidden: You do not have permission to perform this action' 
      })
    }

    return next()
  }
}
