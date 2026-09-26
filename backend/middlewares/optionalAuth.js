import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (!err) {
      req.user = user;
    }
    next();
  });
};

export default optionalAuth;