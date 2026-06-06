import { createHmac } from "crypto";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "bme-admin-secret-key-change-in-production";

// Simple JWT implementation without external dependency
function base64url(str: string): string {
  return Buffer.from(str).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function signToken(payload: { id: number; email: string }): string {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64url(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 7 * 86400 }));
  const sig = createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return `${header}.${body}.${sig}`;
}

export function verifyToken(token: string): { id: number; email: string; exp: number } {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token");
  const [header, body, sig] = parts;
  const expectedSig = createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  if (sig !== expectedSig) throw new Error("Invalid signature");
  const payload = JSON.parse(Buffer.from(body, "base64").toString());
  if (payload.exp < Math.floor(Date.now() / 1000)) throw new Error("Token expired");
  return payload;
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ message: "No token provided" });
  try {
    (req as any).admin = verifyToken(auth.slice(7));
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
