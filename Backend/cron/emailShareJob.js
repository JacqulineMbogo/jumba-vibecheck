// cron/emailShareJob.js
const cron = require('node-cron');
const Journal = require('../models/journal');
const User = require('../models/user');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jacqulinenyokabi@gmail.com',
    pass: 'eypo xejx fzef hdyk',
  },
});

const sendAnonymizedEmail = async (recipientEmail, journal) => {
  const mailOptions = {
    from: `"VibeCheck" <${process.env.SMTP_EMAIL}>`,
    to: recipientEmail,
    subject: '✨ A vibe from the community',
    text: `Hey there 👋\n\nSomeone shared this vibe in the last 24 hours:\n\n📝 ${journal.title}\n${journal.description}\n\nStay vibing,\n— VibeCheck Team`,
  };

  await transporter.sendMail(mailOptions);
};

const shareRecentJournals = async () => {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentJournals = await Journal.find({ create_date: { $gte: since } });

  // Group journals by userId
  const journalsByUser = recentJournals.reduce((acc, journal) => {
    if (!journal.user_id || typeof journal.user_id.toString !== 'function') {
      console.warn('Skipped journal without user_id:', journal);
      return acc;
    }
    const uid = journal.user_id.toString();

    if (!uid) {
      console.warn('Skipped journal without user_id:', journal);
      return acc;
    }
    acc[uid] = acc[uid] || [];
    acc[uid].push(journal);
    return acc;
  }, {});

  const activeUserIds = Object.keys(journalsByUser);

  for (const userId of activeUserIds) {
    const otherUserIds = activeUserIds.filter((id) => id !== userId);
    if (otherUserIds.length === 0) continue; // No one to match with

    const recipient = await User.findById(userId);
    if (!recipient?.email) continue;

    const randomUserId =
      otherUserIds[Math.floor(Math.random() * otherUserIds.length)];
    const candidateJournals = journalsByUser[randomUserId];
    const journalToSend =
      candidateJournals[Math.floor(Math.random() * candidateJournals.length)];

    await sendAnonymizedEmail(recipient.email, journalToSend);
  }
};

// Schedule to run every day at 12 PM
cron.schedule('0 12 * * *', async () => {
  console.log('Running daily journal share job...');
  try {
    await shareRecentJournals();
    console.log('Journal sharing complete.');
  } catch (err) {
    console.error('Error sharing journals:', err);
  }
});

// //This is for testing every 10seconds
// cron.schedule('*/10 * * * * *', () => {
//   console.log('Running job every 10 seconds');
//   // call your journal sharing function here
//   try {
//     shareRecentJournals();
//     console.log('Journal sharing complete.');
//   } catch (err) {
//     console.error('Error sharing journals:', err);
//   }
// });

module.exports = { shareRecentJournals };
