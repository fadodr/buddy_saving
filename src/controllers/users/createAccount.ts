import { ControllerArgs } from '../../types';
import { User } from '../../models';
import { NotFoundError } from '../../errors';
import { hashData } from '../../helpers';

export const createAccount = async ({ input }: ControllerArgs) => {
  const { name, email, username, password } = input;

  const existEmail = await User.findOne({ where: { email } });
  if (existEmail)
    throw new NotFoundError('Email already exist');

  const existUsername = await User.findOne({ where: { username } });
  if (existUsername)
    throw new NotFoundError('Username already exist, please choose another username');

  const hashPwd = await hashData(password);

  const user = await User.create({
    name,
    username,
    email,
    password: hashPwd,
  });

  return {
    code: 201,
    message: 'Your account have successfully been created',
    data: user.toJSON(),
  };
};
