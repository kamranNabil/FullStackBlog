import express from "express";
import { 
  getAllPosts, 
  getPost, 
  createPost, 
  deletePost, 
  uploadAuth, 
  featurePost 
} from "../controllers/Postscontrollers.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/upload-auth", uploadAuth);
router.get("/", getAllPosts);
router.get("/:slug", getPost);
router.post("/", requireAuth(), createPost);
router.delete("/:id", requireAuth(), deletePost);
router.patch("/:id/feature", requireAuth(), featurePost); // ✅ protect this route

export default router;
