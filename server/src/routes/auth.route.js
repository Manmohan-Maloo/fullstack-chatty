import express from "express";
import { checkAuth, deleteAccount, login, logout, signup, updateBio, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
router.put("/update-bio", protectRoute, updateBio);

router.delete("/delete-account",protectRoute,deleteAccount);

router.get("/check", protectRoute, checkAuth);

export default router;