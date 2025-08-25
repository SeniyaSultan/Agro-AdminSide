const Admin = require('../models/adminModel');
const User = require('../models/User');

// GET all admins (from users collection)
exports.getAdmins = async (req, res) => {
  try {
    // Fetch from users collection, only roles admin/superadmin, select safe fields
    const admins = await User.find(
      { role: { $in: ['admin', 'superadmin'] } },
      { name: 1, email: 1, role: 1, isActive: 1 }
    ).lean();
    res.json(admins);
  } catch (err) {
    console.error('GET /api/admins failed:', err);
    res.status(500).json({ message: err.message });
  }
};

// GET single admin (from users collection, safe fields)
exports.getAdmin = async (req, res) => {
  try {
    const admin = await User.findById(
      req.params.id,
      { name: 1, email: 1, role: 1, isActive: 1 }
    ).lean();
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    console.error('GET /api/admins/:id failed:', err);
    res.status(500).json({ message: err.message });
  }
};

// CREATE admin (into users collection)
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, role = 'admin', isActive = true, password } = req.body;

    let pwd = password;
    if (!pwd) {
      // Generate a temporary password if not provided
      pwd = Math.random().toString(36).slice(-10) + 'A1!';
    }

    const user = new User({ name, email, role, isActive, password: pwd });
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      // Note: In production, do NOT return passwords. This is for initial provisioning visibility.
      temporaryPassword: password ? undefined : pwd,
    });
  } catch (err) {
    console.error('POST /api/admins failed:', err);
    res.status(400).json({ message: err.message });
  }
};

// UPDATE admin (in users collection)
exports.updateAdmin = async (req, res) => {
  try {
    const { name, email, role, isActive, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Admin not found' });

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;
    if (password) user.password = password; // will be hashed by pre-save hook

    await user.save();

    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, isActive: user.isActive });
  } catch (err) {
    console.error('PUT /api/admins/:id failed:', err);
    res.status(400).json({ message: err.message });
  }
};

// DELETE admin (from users collection)
exports.deleteAdmin = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    console.error('DELETE /api/admins/:id failed:', err);
    res.status(500).json({ message: err.message });
  }
};
