import { Context, Next } from 'hono';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

export const verifyToken = (token: string, secret: string): JwtPayload => {
    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (error: any) {
        throw new Error("Invalid token");
    }
}

interface JWTPayload {
    id: number;
    email: string;
    role: string;
}

export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const token = c.req.header("Authorization");
    if (!token) return c.json({ error: "Token not provided" }, 401);

    try {
        const decoded = verifyToken(token, process.env.SECRET as string) as JWTPayload;
        if (!decoded) return c.json({ error: "Invalid token" }, 401);

        if (requiredRole === "both" || decoded.role === requiredRole) {
            return next();
        } else {
            return c.json({ error: "Unauthorized" }, 401);
        }
    } catch (err) {
        return c.json({ error: (err as Error).message }, 401);
    }
}

export const adminRoleAuth = async (c: Context, next: Next) => {
    return authMiddleware(c, next, "admin");
}

export const userRoleAuth = async (c: Context, next: Next) => {
    return authMiddleware(c, next, "user");
}

export const userAdminRoleAuth = async (c: Context, next: Next) => {
    return authMiddleware(c, next, "both");
}
