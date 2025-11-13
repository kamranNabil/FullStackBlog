import express from "express"
import { requireAuth } from "@clerk/express";
import { getUserSavedPosts, savePost } from "../controllers/Usercontrollers.js";

const router = express.Router();

router.get("/saved", requireAuth(), getUserSavedPosts);
router.patch("/save", requireAuth(), savePost);
    
export default router;