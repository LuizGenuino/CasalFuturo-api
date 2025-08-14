import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.ts';
import { ENV } from '../utils/env.ts';
import { UnauthorizedError } from '../errors/unauthorized.error.ts';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token || token === "undefined") {
        logger.info('No token provided');
        throw new UnauthorizedError('Acesso não autorizado');
    }
    
    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);


    if (!decoded) {
        logger.info('Invalid token provided');
        throw new UnauthorizedError('Acesso não autorizado');
    }

    req.userId = (decoded as jwt.JwtPayload).userId;

    next();
}