const User = require('../models/User');

/**
 * @desc    Get All Physicians
 * @route   Get /api/v1/user/all
 * @access  Public
 */
exports.getAllPhysicians = async (req, res, next) => {
  // Retrieve physician
  const users = await User.find({});

  return res.status(200).json({
    success: true,
    data: users,
  });
};

const appointments = [
  [
    {
      name: 'Sterling Archer',
      time: '1609013961764',
      kind: 'New Patient',
    },
    {
      name: 'Cyril Figis',
      time: '1609013961764',
      kind: 'Follow-up',
    },
    {
      name: 'Ray Gilette',
      time: '1609013961764',
      kind: 'Follow-up',
    },
    {
      name: 'Lana Kane',
      time: '1609013961764',
      kind: 'New Patient',
    },
    {
      name: 'Pam Poovey',
      time: '1609013961764',
      kind: 'New Patient',
    },
  ],
  [
    {
      name: 'Chenxi Cheng',
      time: '1609013961764',
      kind: 'New Patient',
    },
    {
      name: 'Amy Wang',
      time: '1609013961764',
      kind: 'Follow-up',
    },
  ],
  [
    {
      name: 'John Smith',
      time: '1609013961764',
      kind: 'New Patient',
    },
    {
      name: 'Herry Jack',
      time: '1609013961764',
      kind: 'Follow-up',
    },
  ],
];

/**
 * @desc    Get Physician Appointments
 * @route   Get /api/v1/user/:id
 * @access  Public
 */
exports.getPhysicianAppointments = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  const data = appointments[Number(id)];

  return res.status(200).json({
    success: true,
    data: data,
  });
};
