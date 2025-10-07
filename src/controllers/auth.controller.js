const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
const crypto = require('crypto');
const { sendResetEmail } = require('../services/mailer.service');

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if(err) return next(err);
    if(!user) return res.status(401).json({ error: info?.message || 'Login failed' });
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  })(req, res, next);
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserRepository.findByEmail(email);
    if(!user) return res.status(200).json({ ok: true }); 
    const token = crypto.randomBytes(32).toString('hex');
    await UserRepository.updateById(user._id, { resetToken: token });
    await sendResetEmail(email, token);
    return res.json({ ok: true });
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await UserRepository.findByResetToken(token);
    if(!user) return res.status(400).json({ error: 'Invalid token' });
    const bcrypt = require('bcrypt');
    const hash = await bcrypt.hash(newPassword, 10);
    await UserRepository.updateById(user._id, { password: hash, resetToken: null });
    return res.json({ ok: true });
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};