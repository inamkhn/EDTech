import User from "../models/User.js";
import { Course } from "../models/Course.js";
import ErrorHandler from "../utils/errorHandler.js";
import { emailsend } from "../utils/Sendmailer.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncError } from "../middlewares/asyncError.js";

export const getallusers = async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
}

export const createuser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    //|| !file
    return next(new ErrorHandler("Please enter all field", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 409));

  const file = req.file;
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id, 
      url: mycloud.secure_url, 
    },
  });

  sendToken(res, user, "Registered Successfully", 201);
}

// export const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     //|| !file
//     return next(new ErrorHandler("Please enter all field", 400));
//   try {
//     let user = await User.findOne({ email });
//     if (!user)
//       return next(new ErrorHandler("Incorrect Email and Password", 409));

//     const comparePassword =  bcrypt.compare(password, user.password);
//     if (!comparePassword)
//       return next(new ErrorHandler("Incorrect Email and Password", 409));
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     const { password: pass, ...rest } = user._doc;
//     res
//       .cookie("access_token", token, { httpOnly: true })
//       .status(200)
//       .json(rest);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));
  sendToken(res, user, `Welcome back, ${user.name}`, 200);
}

export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
}

export const getMyProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
}


export const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
}

export const updateProfile = async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findById(req.user._id);
  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();
  res
    .status(200)
    .json({ success: true, message: "User profile change successfully" });
};


export const updateprofilepicture = async (req, res, next) => {
  const file = req.file;

  const user = await User.findById(req.user._id);

  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: mycloud.public_id,
    url: mycloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Email is not found", 400));
  }
  const resettoken = await user.getResetToken();

  await user.save();

  const url = `${process.env.FORNTEND_URL}/reset/${resettoken}`;

  const message = `click on the link to reset your password ${url}`;

  await emailsend(user.email, "reset your password", message);

  res
    .status(200)
    .json({ success: true, message: "forget password successfully" });
};

export const resetpassword = async (req, res, next) => {
  const { token } = req.params;
  console.log(token);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user)
    return next(new ErrorHandler("Token is invalid or has been expired", 401));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
};

export const addToPlaylist = async (req, res, next) => {
  const id = req.params.id
  const user = await User.findById(id);

  const course = await Course.findById(req.body.id);
  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  const itemExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) return true;
  });

  if (itemExist) return next(new ErrorHandler("Item Already Exist", 409));

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Added to playlist",
  });
};

export const removeFromPlaylist = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);
  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  user.playlist = newPlaylist;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Removed From Playlist",
  });
};

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    users,
  });
};

export const updateUserRole = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("user not found", 404));

  if (user.role === "user") {
    user.role = "admin";
  } else {
    user.role = "user";
  }
  await user.save();

  res.status(200).json({
    success: true,
    message: "role updated",
  });
};

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("user not found", 404));

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  await user.remove();
  res.status(200).json({
    success: true,
    message: "user deleted",
  });
};
