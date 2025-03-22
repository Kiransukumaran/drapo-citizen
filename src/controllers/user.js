const { getUserProfile, updateUserProfile } = require("../services/firebase");

exports.getProfile = async (req, res) => {
  try {
    const userProfile = await getUserProfile(req.user.uid);
    res.json(userProfile);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    await updateUserProfile(req.user.uid, req.body);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};
