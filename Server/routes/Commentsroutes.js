import express from "express";
import { getPostComments, addComment, deleteComment } from "../controllers/Commentscontrollers.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/", requireAuth(), addComment);
router.delete("/:id", requireAuth(), deleteComment);

export default router;