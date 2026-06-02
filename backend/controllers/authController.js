const User =
  require("../models/User");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

// ✅ Generate Token
const generateToken = (id) => {

  return jwt.sign(

    { id },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d"
    }

  );

};

// ✅ Register
const registerUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;

      console.log(req.body);

      const userExists =
        await User.findOne({
          email
        });

      if (userExists) {

        return res.status(400).json({
          message:
             "Email already registered ❌"
        });

      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword

        });

      res.status(201).json({

        token:
          generateToken(
            user._id
          ),

        user

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

};

// ✅ Login
const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res.status(400).json({
          message:
            "Invalid Email or Password ❌"
        });

      }

      const isMatch =
        await bcrypt.compare(

          password,

          user.password

        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid Email or Password ❌"
        });

      }

      res.json({

        token:
          generateToken(
            user._id
          ),

        user

      });

    } catch (error) {

      res.status(500).json({
        message:
            "Server Error ❌"
      });

    }

};

// GET PROFILE
const getProfile = async (req, res) => {

  try {

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ✅ Premium Update
const updateProfile = async (req, res) => {

  try {

    const user =
      await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    user.name =
      req.body.name || user.name;

    user.bio =
      req.body.bio || user.bio;

    user.profileImage =
      req.body.profileImage ||
      user.profileImage;

    const updatedUser =
      await user.save();

    res.json(updatedUser);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Profile Update Failed"
    });

  }

};

const updatePremium = async (req, res) => {

  try {

    const user =
      await User.findByIdAndUpdate(

        req.user.id,

        {
          isPremium: true
        },

        {
          new: true
        }

      );

    res.json({
      success: true,
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Premium Update Failed"
    });

  }

};
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  updatePremium
};