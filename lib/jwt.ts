/**
 * JWT Utility Functions
 * Handles token generation, verification, and payload extraction
 */

import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'default-access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret';
const ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '15m';
const REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate access token (short-lived, stored in Redux)
 */
export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRATION,
  });
}

/**
 * Generate refresh token (long-lived, stored in HttpOnly cookie)
 */
export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRATION,
  });
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Decode token without verification (useful for debugging)
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Get token expiration time in seconds
 */
export function getTokenExpiration(token: string): number | null {
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    return decoded.exp || null;
  } catch (error) {
    return null;
  }
}
