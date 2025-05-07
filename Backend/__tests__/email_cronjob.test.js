// __tests__/email_cronjob.test.js
jest.mock('nodemailer', () => {
  const sendMail = jest.fn().mockResolvedValue(true);
  return {
    createTransport: () => ({ sendMail }),
    __mockedSendMail: sendMail,
  };
});

const nodemailer = require('nodemailer');
const { shareRecentJournals } = require('../cron/emailShareJob');
const Journal = require('../models/journal');
const User = require('../models/user');

const sendMailMock = nodemailer.__mockedSendMail;

describe('Email Sharing Cron Job', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should run without errors when journals and users exist', async () => {
    const userA = { _id: 'userA', email: 'a@test.com' };
    const userB = { _id: 'userB', email: 'b@test.com' };

    jest.spyOn(Journal, 'find').mockResolvedValue([
      {
        title: 'Vibe A',
        description: 'Feeling good',
        create_date: new Date(),
        user_id: { toString: () => 'userA' },
      },
      {
        title: 'Vibe B',
        description: 'Better day',
        create_date: new Date(),
        user_id: { toString: () => 'userB' },
      },
    ]);

    jest.spyOn(User, 'findById').mockImplementation((id) => {
      if (id === 'userA') return Promise.resolve(userA);
      if (id === 'userB') return Promise.resolve(userB);
      return Promise.resolve(null);
    });

    await expect(shareRecentJournals()).resolves.not.toThrow();
    expect(sendMailMock).toHaveBeenCalled();
  });

  it('should skip journal if user_id is missing', async () => {
    const invalidJournal = {
      _id: '3',
      title: 'No user',
      description: 'Missing user_id',
      create_date: new Date(),
    };

    jest.spyOn(Journal, 'find').mockResolvedValue([invalidJournal]);

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    await expect(shareRecentJournals()).resolves.not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Skipped journal without user_id:',
      invalidJournal
    );
    expect(sendMailMock).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should skip if only one user has journals', async () => {
    jest.spyOn(Journal, 'find').mockResolvedValue([
      {
        _id: '1',
        user_id: { toString: () => 'userA' },
        title: 'Only One User',
        description: 'Only one person wrote today',
        create_date: new Date(),
      },
    ]);

    jest.spyOn(User, 'findById').mockResolvedValue({
      _id: 'userA',
      email: 'a@test.com',
    });

    await expect(shareRecentJournals()).resolves.not.toThrow();
    expect(sendMailMock).not.toHaveBeenCalled();
  });
});
