const restrictToLogin = (req, res, next) => {
  if (!req.session.user) return res.redirect('/user/login');
  req.user = req.session.user;
  next();
};

const authCheck = (req, res, next) => {
  req.user = req.session.user || null;
  next();
};

module.exports = { restrictToLogin, authCheck };
