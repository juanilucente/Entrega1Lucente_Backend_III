const jwt = require('jsonwebtoken');

function ensureAuthenticated(req, res, next){
  // allow passport session or JWT in Authorization header
  if(req.isAuthenticated && req.isAuthenticated()) return next();
  const auth = req.headers.authorization;
  if(auth && auth.startsWith('Bearer ')){
    const token = auth.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.user = payload;
      return next();
    } catch(err){
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

function ensureAdminOrSelf(req, res, next){
  const user = req.user || {};
  const targetId = req.params.id;
  if(user.role === 'admin' || user.id === targetId || (user._id && String(user._id) === String(targetId))){
    return next();
  }
  return res.status(403).json({ error: 'Forbidden' });
}

module.exports = { ensureAuthenticated, ensureAdminOrSelf };