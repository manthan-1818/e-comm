// const tokenService = require("");

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401);

//   const verified = tokenService.verifyToken(token);
//   if (!verified) return res.sendStatus(403);

//   req.userId = verified.userId;
//   next();
// };

// module.exports = authenticateToken;
