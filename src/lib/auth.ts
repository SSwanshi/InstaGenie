import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env");
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export function generateToken(payload: { userId: string }): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "2d",
  });
}

export function verifyToken(token: string): JwtPayload & { userId: string } {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
    userId: string;
  };
}

export function getUserFromRequest(req: Request): { userId: string } | null {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    return verifyToken(token);
  } catch (error) {
    return error instanceof Error ? null : null;
  }
}