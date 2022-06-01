import { Router } from 'express';
import passport from 'passport';
import { setUserToken } from '../utils/jwt';

const authRouter = Router();

// 구글 로그인
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// 구글 콜백 처리
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res, next) => {
    try {
      // 토큰 제공
      const token = setUserToken(res, req.user);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  },
);

export { authRouter };
