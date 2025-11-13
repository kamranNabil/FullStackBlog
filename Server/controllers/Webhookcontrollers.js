import Users from "../models/Usermodels.js";
import { Webhook } from "svix";

export const clerkWebhook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return res.status(400).json({ message: "Webhook secret missing" });
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).json({ message: "Webhook verification failed" });
  }

  if (evt.type === "user.created") {
    try {
      // Check if an admin already exists
      const adminExists = await Users.findOne({ role: "admin" });

      const newUser = new Users({
        clerkId: evt.data.id,
        username:
          evt.data.username || evt.data.email_addresses[0].email_address,
        email: evt.data.email_addresses[0].email_address,
        img: evt.data.profile_image_url,
        role: adminExists ? "user" : "admin", // ✅ first user → admin, rest → user
      });

      await newUser.save();
      console.log("✅ User saved successfully:", newUser.role);

      return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error("❌ Error saving user:", err.message);
      return res.status(500).json({ message: err.message });
    }
  }

  return res.status(200).json({ message: "Webhook received" });
};

export default { clerkWebhook };