import Users from "../models/Usermodels.js";

export const getUserSavedPosts = async (req, res) => {
  try {
    const clerkUserId = req.auth().userId;
    
    if (!clerkUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await Users.findOne({ clerkId: clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedPosts);
  } catch (err) {
    console.error("Error fetching saved posts:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const savePost = async (req, res) => {
  try {
    const clerkUserId = req.auth().userId;
    const postId = req.body.postId;

    if (!clerkUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await Users.findOne({ clerkId: clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = user.savedPosts.some((p) => p.toString() === postId);
    
    if (!isSaved) {
      await Users.findByIdAndUpdate(user._id, { $push: { savedPosts: postId } });
    } else {
      await Users.findByIdAndUpdate(user._id, { $pull: { savedPosts: postId } });
    }

    res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
  } catch (err) {
    console.error("Error saving post:", err);
    res.status(500).json({ message: "Server error" });
  }
};