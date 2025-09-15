const Entry = require('../models/Entry');

const getTrends = async (req, res) => {
  const entries = await Entry.find({ userId: req.user._id });
  if (!entries.length) return res.status(404).json({ message: 'No entries found' });

  const avgSleep = entries.reduce((sum,e) => sum + e.sleep, 0) / entries.length;
  const avgCalories = entries.reduce((sum,e) => sum + e.calories, 0) / entries.length;

  res.json({ avgSleep, avgCalories });
};

module.exports = { getTrends };
