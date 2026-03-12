import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function loginSuperAdmin(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (email !== env.SUPERADMIN_EMAIL || password !== env.SUPERADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, env.JWT_SECRET, { expiresIn: "8h" });

  return res.status(200).json({ token });
}

