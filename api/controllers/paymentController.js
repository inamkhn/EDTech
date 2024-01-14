import User from "../models/User.js";
import { Course } from "../models/Course.js";
import ErrorHandler from "../utils/errorHandler.js";
// const stripe = require('stripe')('sk_test_51KGg2iAmdzaBb8GIX68xTx4O7CNr08IfTylIe8vznXwEYvLyBZpcbEUQJREl4aegyfALHlKgZIBqOXymcIlrEFIV00bpWaLuO2')

export const Subscribe = async (req, res, next) => {
  const user = await User.find();
  
} 