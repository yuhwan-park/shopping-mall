import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

export { secretKey };

export function setUserToken(res, user) {
  const token = jwt.sign(user, secretKey);
  return token;
}
