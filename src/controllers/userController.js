const User = require('../models/userModel');

function pickUserFields(body) {
  const allowedFields = ['name', 'email', 'role'];
  const data = {};

  allowedFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      data[field] = body[field];
    }
  });

  return data;
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const { role, name } = req.query;
    const filter = {};

    if (role) {
      filter.role = role;
    }

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    const users = await User.find(filter).sort({ createdAt: -1 });

    res.json({
      message: 'Users retrieved successfully',
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: `User with ID ${req.params.id} not found.` });
    }

    res.json({
      message: 'User retrieved successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const user = await User.create({ name, email, role });

    res.status(201).json({
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.replaceUser = async (req, res, next) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required for replacement.' });
  }

  try {
    const user = await User.findOneAndReplace(
      { _id: req.params.id },
      { name, email, role: role || 'user' },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: `User with ID ${req.params.id} not found.` });
    }

    res.json({
      message: 'User replaced successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const updates = pickUserFields(req.body);

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'Provide at least one valid field to update.' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({ error: `User with ID ${req.params.id} not found.` });
    }

    res.json({
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: `User with ID ${req.params.id} not found.` });
    }

    res.json({
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};
