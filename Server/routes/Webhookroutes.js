import express from "express";
import bodyParser from "body-parser";
import { clerkWebhook } from "../controllers/Webhookcontrollers.js";

const router = express.Router();

// Log incoming requests for debugging
router.use((req, res, next) => {
  console.log("📍 Webhook route hit:", req.method, req.path);
  next();
});

// Clerk webhook endpoint
router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  (req, res, next) => {
    console.log("📦 Webhook raw body received");
    next();
  },
  clerkWebhook
);

export default router;
