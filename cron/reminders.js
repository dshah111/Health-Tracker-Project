module.exports = {
  sendReminder: (user, message) => {
    console.log(`[Reminder] Would send to ${user.email}: ${message}`);
  }
};
