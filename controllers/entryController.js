// controllers/entryController.js

const Entry = require('../models/Entry');

// @desc    Add new entry
// @route   POST /api/entries
// @access  Private
const addEntry = async (req, res, next) => {
  try {
    const { date, sleep, calories, steps, mood } = req.body;

    const entry = await Entry.create({
      userId: req.user._id,
      date,
      sleep,
      calories,
      steps,
      mood,
    });

    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all entries for user
// @route   GET /api/entries
// @access  Private
const getEntries = async (req, res, next) => {
  try {
    const entries = await Entry.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

// @desc    Update entry
// @route   PUT /api/entries/:id
// @access  Private
const updateEntry = async (req, res, next) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      res.status(404);
      throw new Error('Entry not found');
    }

    if (entry.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEntry);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete entry
// @route   DELETE /api/entries/:id
// @access  Private
const deleteEntry = async (req, res, next) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      res.status(404);
      throw new Error('Entry not found');
    }

    if (entry.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await entry.deleteOne();
    res.json({ message: 'Entry removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { addEntry, getEntries, updateEntry, deleteEntry };
