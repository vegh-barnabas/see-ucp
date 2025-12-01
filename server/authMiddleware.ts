import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

import type { NextFunction, Request, Response } from "express";

interface UserPayload extends JwtPayload {
  id: number;
  username: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
