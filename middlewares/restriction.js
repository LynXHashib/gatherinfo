const restrictToLogin = (req, res, next) => {
  if (!req.session.user) return res.redirect('/user/login');
  req.user = req.session.user;
  console.log(typeof req.session.user._id);

  next();
};

const authCheck = (req, res, next) => {
  res.locals.isLoggedIn = !!req.session.user;
  next();
};

module.exports = { restrictToLogin, authCheck };
