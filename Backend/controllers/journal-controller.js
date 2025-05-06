const express = require('express');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const DUMMY_JOURNAL = [
    {
      id: 'j1',
      title: 'Empire State Building',
      description: 'One of the most famous skyscrapers in the world!',
      user_id: 'u1',
      create_date: '2023-10-01',
      update_date: '2023-10-02',
      status: 'active',
    },
    {
      id: 'j2',
      title: 'VibeCheck Launch',
      description: 'Shared my first vibe today 😎',
      user_id: 'u1',
      create_date: '2023-10-01',
      update_date: '2023-10-02',
      status: 'active',
    },
    {
        id: 'j3',
        title: 'Empire State Building2',
        description: 'One of the most famous skyscrapers in the world!',
        user_id: 'u2',
        create_date: '2023-10-01',
        update_date: '2023-10-02',
        status: 'active',
      },
      {
        id: 'j4',
        title: 'VibeCheck Launch2',
        description: 'Shared my first vibe today 😎',
        user_id: 'u2',
        create_date: '2023-10-01',
        update_date: '2023-10-02',
        status: 'active',
      }
  ];

  const getJournalById = (req, res, next) => {
    const journalId = req.params.jid;
    const journal = DUMMY_JOURNAL.find(j => j.id === journalId);
  
    if (!journal) {
      return next(new HttpError('Could not find a journal for the provided ID.', 404));
    }
  
    res.json({ journal });
  };
  
  const getJournalsByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const journals = DUMMY_JOURNAL.filter(j => j.user_id === userId);
  
    if (!journals || journals.length === 0) {
      return next(new HttpError('Could not find any journals for the provided user.', 404));
    }
  
    res.json({ journals });
  };

  const createJournal = (req, res, next) => {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
      }

    const { title, description, user_id} = req.body;
  
    const timestamp = new Date().toISOString();
  
    const createdJournal = {
      title,
      description,
      user_id,
      status: "active" //by default status is active
    };
  
    DUMMY_JOURNAL.push(createdJournal);
    res.status(201).json({ journal: createdJournal });
  };

    const updateJournal = (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
      }
        const journalId = req.params.jid;
        const { title, description, status } = req.body;
        
        const journalIndex = DUMMY_JOURNAL.findIndex(j => j.id === journalId);
        
        if (journalIndex === -1) {
            return next(new HttpError('Could not find a journal for the provided ID.', 404));
        }
        
        const updatedJournal = {
            ...DUMMY_JOURNAL[journalIndex],
            title,
            description,
            status,
            update_date: new Date().toISOString()
        };
        
        DUMMY_JOURNAL[journalIndex] = updatedJournal;
        res.status(200).json({ journal: updatedJournal });
        };

        const deleteJournal = (req, res, next) => {
            const journalId = req.params.jid;
            const journalIndex = DUMMY_JOURNAL.findIndex(j => j.id === journalId);
            
            if (journalIndex === -1) {
                return next(new HttpError('Could not find a journal for the provided ID.', 404));
            }
            
            DUMMY_JOURNAL.splice(journalIndex, 1);
            res.status(200).json({ message: 'Journal deleted.' });
        };



  exports.getJournalById = getJournalById;
  exports.getJournalsByUserId = getJournalsByUserId;
  exports.createJournal = createJournal;
  exports.updateJournal = updateJournal;
  exports.deleteJournal = deleteJournal;
  