import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcrypt';
import { User } from '../../db';

// 구글 OAuth 설정
const config = {
  clientID:
    '312727609194-3el2crp6j6l9edji1bvnuqh6iq49uab0.apps.googleusercontent.com', // clientId 설정하기
  clientSecret: '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', // clientSecret 설정하기
  callbackURL: '/auth/google/callback',
};

async function findOrCreateUser({ email, fullName }) {
  const user = await User.findOne({
    email,
  });

  // user가 있으면 user 리턴
  if (user) {
    return user;
  }

  // 없으면 user 생성
  const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해쉬화
  const createdNewUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });
  return createdNewUser;
}

export default new GoogleStrategy(config, async (profile, done) => {
  const { email, fullName } = profile._json;

  try {
    const user = await findOrCreateUser({ email, fullName });
    done(null, {
      shortId: user.shortId,
      email: user.email,
      fullName: user.fullName,
    });
  } catch (e) {
    done(e, null);
  }
});
