const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Journal = require('../models/journal');
const User = require('../models/user');

// === Get Journal by ID ===
const getJournalById = async (req, res, next) => {
  const journalId = req.params.jid;

  try {
    const journal = await Journal.findById(journalId);
    if (!journal) {
      return next(
        new HttpError('Could not find a journal for the provided ID.', 404)
      );
    }

    res.json({ journal: journal.toObject({ getters: true }) });
  } catch (err) {
    return next(
      new HttpError('Fetching journal failed, please try again later.', 500)
    );
  }
};

// === Get Journals by User ID ===
const getJournalsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const journals = await Journal.find({ user_id: userId });

    if (!journals || journals.length === 0) {
      return next(
        new HttpError('Could not find any journals for the user.', 404)
      );
    }

    res.json({
      journals: journals.map((journal) => journal.toObject({ getters: true })),
    });
  } catch (err) {
    return next(
      new HttpError('Fetching journals failed, please try again later.', 500)
    );
  }
};

// === Create Journal ===
const createJournal = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, user_id } = req.body;
  const timestamp = new Date().toISOString();

  const createdJournal = new Journal({
    title,
    description,
    user_id,
    create_date: timestamp,
    update_date: timestamp,
    status: 'active',
  });

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return next(new HttpError('Could not find user for provided id.', 404));
    }

    await createdJournal.save();
    res.status(201).json({ journal: createdJournal });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError('Creating journal failed, please try again.', 500)
    );
  }
};

// === Update Journal ===
const updateJournal = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const journalId = req.params.jid;
  const { title, description, status } = req.body;

  try {
    const journal = await Journal.findById(journalId);
    if (!journal) {
      return next(
        new HttpError('Could not find journal for the provided id.', 404)
      );
    }

    journal.title = title;
    journal.description = description;
    journal.update_date = new Date().toISOString();

    await journal.save();

    res.status(200).json({ journal: journal.toObject({ getters: true }) });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update journal.', 500)
    );
  }
};

// === Delete Journal ===
const deleteJournal = async (req, res, next) => {
  const journalId = req.params.jid;

  try {
    const journal = await Journal.findById(journalId);
    if (!journal) {
      return next(
        new HttpError('Could not find journal for the provided id.', 404)
      );
    }

    await Journal.findByIdAndDelete(journalId);
    res.status(200).json({ message: 'Deleted journal.' });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not delete journal.', 500)
    );
  }
};

exports.getJournalById = getJournalById;
exports.getJournalsByUserId = getJournalsByUserId;
exports.createJournal = createJournal;
exports.updateJournal = updateJournal;
exports.deleteJournal = deleteJournal;
