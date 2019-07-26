const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');


module.exports = (req, res, next) => {
  //get the Token from the Authorization header
  const token = req.headers.authorization;

  //verify the token
  if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        //invalid token
        res.status(401).json({ you: "shall not pass" });
      } else {
        req.jwtToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
};
