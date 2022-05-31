import passport from 'passport';
import google from './strategies/google';

export default function () {
  passport.use(google);
}
