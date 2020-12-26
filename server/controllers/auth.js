const crypto = require('crypto');
const User = require('../models/User');
// const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Register user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
exports.register = async (req, res, next) => {
  const { name, email, password, appointment } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please provide all required fields(name, email, password)',
    });
  }

  // Check for user
  const exsitUser = await User.findOne({ email });

  if (exsitUser) {
    return res.status(400).json({
      success: false,
      error: 'Email already exists',
    });
  }

  // Create user
  const user = await User.create({ name, email, password });

  sendTokenResponse(user, 200, res);
};

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  console.log('user', user);
  sendTokenResponse(user, 200, res);
};

/**
 * @desc    Get current logged in user
 * @route   POST /api/v1/auth/me
 * @access  Private
 */
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

// cookie-parser
// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
