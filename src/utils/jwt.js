import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

function setUserToken(res, user) {
  const token = jwt.sign(user, secretKey);
  res.status(200).json(token);
}

export { secretKey };
export { setUserToken };
