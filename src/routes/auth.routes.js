import { Router } from "express";
import { loginSuperAdmin } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginSuperAdmin);

export default router;

