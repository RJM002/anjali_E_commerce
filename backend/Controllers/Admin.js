const UserModal = require("../Models/User");

const getUser = async (req, res) => {
  try {
    const Users = await UserModal.find();
    res.status(200).json({ users: Users, success: true });
    console.log("ROHIT CHEHCK", req.user.role);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const checkAdmin = await UserModal.findById(userId);

    if (checkAdmin.role == "admin" || checkAdmin.role == "superAdmin") {
      return res
        .status(404)
        .json({
          message: "you can't delete admin or superAdmin",
          success: false,
        });
    }
    console.log("rohit check", userId);
    const user = await UserModal.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).json({ message: "user not foudnd", success: false });
    }
    res
      .status(200)
      .json({ message: "user deleted successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "internal server error", success: false });
  }
};

const changeRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const checkAdmin = await UserModal.findById(userId);

    if (checkAdmin.role != "user") {
      return res
        .status(404)
        .json({
          message: "you can't change role",
          success: false,
        });
    }
    console.log("rohit check", userId);
    const user = await UserModal.findByIdAndUpdate(userId,{role:req.params.role});
    if (!user) {
      res.status(404).json({ message: "user not foudnd", success: false });
    }
    res
      .status(200)
      .json({ message: "user deleted successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "internal server error", success: false });
  }
};

module.exports = {
  getUser,
  deleteUser,
  changeRole,
};
