import jwt from 'jsonwebtoken';
import { userModel } from '../db';

function adminRequired(req, res, next) {
  // login-required에서 next로 넘겨준 req.currentUserId를 사용
  const userId = req.currentUserId;

  // user 역할 검색
  const { role } = userModel.findById(userId);

  // role: admin 확인
  if (role !== 'admin') {
    console.log(`사용자의 권한은 ${role}입니다.`);
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '관리자만 사용할 수 있는 서비스입니다.',
    });
  }
  return;
}
export { adminRequired };
