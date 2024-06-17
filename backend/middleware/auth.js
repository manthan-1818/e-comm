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


const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;
const {
  STATUS_UNAUTHORIZED,
  STATUS_TOKEN_EXPIRED,
  MSG_ACCESS_TOKEN_MISSING,
  MSG_TOKEN_EXPIRED,
  MSG_INVALID_ACCESS_TOKEN
} = require('../constant/errorMessage.constant');

const authentication = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .json({ success: false, message: MSG_ACCESS_TOKEN_MISSING });
    }
    try {
      const decoded = jwt.verify(accessToken, jwtKey);
      req.userData = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res
          .status(STATUS_TOKEN_EXPIRED)
          .json({ success: false, message: MSG_TOKEN_EXPIRED });
      } else {
        return res
          .status(STATUS_UNAUTHORIZED)
          .json({ success: false, message: MSG_INVALID_ACCESS_TOKEN });
      }
    }
  } catch (error) {
    res.status(STATUS_UNAUTHORIZED).json({ success: false, message: MSG_INVALID_ACCESS_TOKEN });
  }
};

module.exports = authentication;