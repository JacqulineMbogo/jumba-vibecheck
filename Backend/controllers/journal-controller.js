const express = require('express');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');

const Journal = require('../models/journal');
const User = require('../models/user');


  const getJournalById = async (req, res, next) => {
    const journalId = req.params.jid;

    try {
      const journal = await Journal.findById(journalId);
      if (!journal) {
        return next(new HttpError('Could not find a journal for the provided ID.', 404));
      }
      res.json({ journal });
    }
    catch (err) {
      console.error(err);
      return next(new HttpError('Fetching journal failed, please try again later.', 500));
    }
  
    res.json({ journal: journal.toObject({ getters: true }) });
  };
  
  const getJournalsByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    try {
      const journals = await Journal.find({ user_id: userId });
      if (!journals || journals.length === 0) {
        return next(new HttpError('Could not find any journals for the user.', 404));
      }
      res.json({ journals });
    }
    catch (err) {
      console.error(err);
      return next(new HttpError('Fetching journals failed, please try again later.', 500));
    }
  
    res.json({ journals: journals.map(journal => journal.toObject({ getters: true })) });
  };

  const createJournal = async (req, res, next) => {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
      }

    const { title, description, user_id} = req.body;
  
    const timestamp = new Date().toISOString();
  
    const createdJournal = new Journal({
      title,
      description,
      user_id,
      create_date: timestamp,
      update_date: timestamp,
      status: 'active'
    });
    
    let user;

    try {
      user = await User.findById(user_id);
      if (!user) {
        return next(new HttpError('Could not find user for provided id.', 404));
      }
    }
    catch (err) {
      console.error(err);
      return next(new HttpError('Creating journal failed, please try again.', 500));
    }
  
    await createdJournal.save()
      .then(() => {
        res.status(201).json({ journal: createdJournal });
      })
      .catch(err => {
        console.error(err);
        return next(new HttpError('Creating journal failed, please try again.', 500));
      });
    res.status(201).json({ journal: createdJournal });
  };

    const updateJournal = async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
      }
        const journalId = req.params.jid;
        const { title, description, status } = req.body;
        
        let journal;
        try {
            journal = await Journal.findById(journalId);
        } catch (err) {
            const error = new HttpError('Something went wrong, could not update journal.', 500);
            return next(error);
        }
        if (!journal) {
            const error = new HttpError('Could not find journal for the provided id.', 404);
            return next(error);
        }
        journal.title = title;
        journal.description = description;
        journal.update_date = new Date().toISOString();
        
        try {
            await journal.save();
        } catch (err) {
            const error = new HttpError('Something went wrong, could not update journal.', 500);
            return next(error);
        }
        const updatedJournal = journal.toObject({ getters: true });

        res.status(200).json({ journal: updatedJournal });
        };

        const deleteJournal = async (req, res, next) => {
          const journalId = req.params.jid;
        
          try {
            const journal = await Journal.findById(journalId);
            if (!journal) {
              return next(new HttpError('Could not find journal for the provided id.', 404));
            }
        
            await Journal.findByIdAndDelete(journalId);
            res.status(200).json({ message: 'Deleted journal.' });
          } catch (err) {
            return next(new HttpError('Something went wrong, could not delete journal.', 500));
          }
        };        



  exports.getJournalById = getJournalById;
  exports.getJournalsByUserId = getJournalsByUserId;
  exports.createJournal = createJournal;
  exports.updateJournal = updateJournal;
  exports.deleteJournal = deleteJournal;
  