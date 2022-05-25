import { Router } from 'express';
import is from '@sindresorhus/is';
import { userModel } from '../db';
import { loginRequired } from '../middlewares';

const adminRouter = Router();

adminRouter.get('/', (req, res) => {
  // login-required에서 next로 넘겨준 req.currentUserId를 사용
  const userId = req.currentUserId;

  // user 역할 검색
  const { fullName, role } = userModel.findById(userId);

  // role: admin 확인
  if (role !== 'admin') {
    console.log(`${role} 권한의 사용자 ${fullName}이 관리자 페이지에 접근했습니다.`);
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '관리자만 사용할 수 있는 서비스입니다.',
    });
    res.redirect('/home')
  }

  res.json
});


export { adminRouter };
