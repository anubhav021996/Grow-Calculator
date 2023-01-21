const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.screat_key, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

module.exports = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(400).send("Authorization is not provided");
  if (!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send("Invalid authorization");

  const token = req.headers.authorization.split(" ")[1];

  let user;
  try {
    user = await verifyToken(token);
  } catch (e) {
    return res.status(400).send("A Invalid authorization");
  }

  req.user = user.user;
  return next();
};
