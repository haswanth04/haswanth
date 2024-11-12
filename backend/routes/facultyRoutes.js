const express = require('express');
const {
  createFaculty,
  getFaculties,
  updateFaculty,
  deleteFaculty,
} = require('../controllers/facultyController');

const router = express.Router();

router.post('/faculties', createFaculty); // Create
router.get('/faculties', getFaculties); // Read
router.put('/faculties/:id', updateFaculty); // Update
router.delete('/faculties/:id', deleteFaculty); // Delete

module.exports = router;
