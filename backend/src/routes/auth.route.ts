import { Router } from "express";
import { authController } from "../modules/auth/auth.module";

const router = Router();
router.post("/password/reset-with-code", authController.resetPasswordWithCode);
router.post("/verify-reset-code", authController.verifyResetCode);

export default router; 