import { ControllerArgs } from '../../types';
import { User } from '../../models';
import { UnAuthorizedError } from '../../errors';
import {
  compareHashedData,
  generateToken,
  computeExpiryDate,
} from '../../helpers';
import { config } from '../../configs';

export const login = async ({ input }: ControllerArgs) => {
  const { email, password } = input;

  const user = (
    await User.scope('withPassword').findOne({ where: { email } })
  )?.toJSON();
  if (!user) throw new UnAuthorizedError('Invalid email or password');

  const isValid = await compareHashedData(password, user.password);
  if (!isValid) throw new UnAuthorizedError('Invalid email or password');

  // generate both the access token and the refresh token
  const accessToken = generateToken(
    { id: user.id },
    config.accessTokenSecret,
    parseInt(config.accessTokenExpiresIn)
  );
  const refreshToken = generateToken(
    { id: user.id },
    config.refreshTokenSecret,
    parseInt(config.refreshTokenExpiresIn)
  );

  // remove password from the response user object
  const { password: extractedPwd, ...remUserInfo } = user;

  return {
    code: 200,
    message: 'You are logged in',
    data: {
      token: {
        accessToken,
        accessTokenExpiresIn: computeExpiryDate(
          parseInt(config.accessTokenExpiresIn)
        ).toISOString(),
        refreshToken,
        refreshTokenExpiresIn: computeExpiryDate(
          parseInt(config.refreshTokenExpiresIn)
        ).toISOString(),
      },
      user : remUserInfo,
    },
  };
};
