import { Router } from 'express';
import is from '@sindresorhus/is';

import { adminRequired } from '../middlewares';

const adminRouter = Router();

adminRouter.get('/', adminRequired, (req, res) => {
  res.status(200).json({
    result: 'approach-success'
  })
});

// 전체 유저 목록을 가져옴 (배열 형태임) -> admin으로 빼기
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.get('/userlist', loginRequired, async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});


adminRouter.post('/')

export { adminRouter };
