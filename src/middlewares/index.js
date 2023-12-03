const jwt = require("jsonwebtoken")

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.sendStatus(403); 
        }
        req.user = decoded; 
        next(); 
      });
    } else {
      res.sendStatus(401); 
    }
  };

module.exports = isAuthenticated;