const express = require('express');
const {
  getAllPhysicians,
  getPhysicianAppointments,
} = require('../controllers/user');

const router = express.Router();

// const { protect } = require('../middlewares/auth');

router.get('/all', getAllPhysicians);
router.get('/:id', getPhysicianAppointments);

module.exports = router;
