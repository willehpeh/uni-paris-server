module.exports = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  if (req.headers['authorization']) {
    const token = req.headers['authorization'].substring(7);
    try {
      const decoded = jwt.verify(token, "superSecretKey");
      if (decoded) {
        console.log('Valid token!');
      }
    } catch (err) {
      console.log(token);
      console.log('Invalid token!');
    }
  } else {
    console.log('Non-authorized request.');
  }
  next();
}
