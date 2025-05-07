const express = require('express');
const { check } = require('express-validator');

const journalControllers = require('../controllers/journal-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// Middleware to authenticate user
router.use(checkAuth);

// GET all journals by UserId
router.get('/user/:uid', journalControllers.getJournalsByUserId);

// GET journal by ID
router.get('/:jid', journalControllers.getJournalById);

// POST create journal
router.post('/',
     [
        check('title')
          .not()
          .isEmpty(),
        check('description').isLength({ min: 5 }),
        check('user_id')
        .not()
        .isEmpty(),
      ],
    
    journalControllers.createJournal);

// PATCH update journal
router.patch('/:jid', journalControllers.updateJournal);

// DELETE journal
router.delete('/:jid', journalControllers.deleteJournal);


module.exports = router;