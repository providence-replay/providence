import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/environment.js';

interface JWTPayload {
  projectID: string;
  projectName: string;
}

export interface AuthRequest extends Request {
  project?: {
    id: string;
    name: string;
  }
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies[config.COOKIE.NAME];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT.SECRET!) as JWTPayload;

    req.project = {
      id: decoded.projectID,
      name: decoded.projectName
    };

    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}