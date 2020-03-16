import '@app/bootstrap';
import { Op } from 'sequelize';
import req from 'supertest';
import app from '@app/app';
import { truncate } from '@database/util/truncate';
import { btoa, randomHash, compareBcryptHash } from '@helpers/hash';
import { generateJwtToken } from '@helpers/jwt';

import User from '@models/User';

describe('Suit of test auth', () => {
  let userAuth: User;
  let token: string;
  let bearerToken: string;

  beforeAll(async () => {
    userAuth = await User.create({
      name: 'User default',
      email: `admin@larawork.com.br`,
      password: '123456',
    });

    const { id } = userAuth;
    token = await generateJwtToken({ id });
    bearerToken = `Bearer ${token}`;
  });

  beforeEach(async () => {
    await truncate();

    // await User.destroy({
    //   where: {
    //     email: {
    //       [Op.ne]: 'admin@larawork.com.br',
    //     },
    //   },
    //   // truncate: true,
    // });
    // userAuth = await User.create({
    //   name: 'User default',
    //   email: `admin@larawork.com.br`,
    //   password: '123456',
    // });
    // const { id } = userAuth;
    // token = await generateJwtToken({ id });
    // bearerToken = `Bearer ${token}`;
  });

  it('Should be able to register a new user', async () => {
    const email = 'davidfaria89@gmail.com';
    const emailBase64 = btoa(email);

    const payload = {
      name: 'David',
      password: '123456',
      email,
      link: `${process.env.APP_URL_FRONTEND}/confirmActive/${emailBase64}`,
    };

    const res = await req(app.server)
      .post('/register')
      .send(payload);
    expect(res.status).toBe(201);
    expect(res.body.exists).toBe(false);
    expect(res.body).toHaveProperty('user');
  });

  it('Should be able to authenticate session', async () => {
    await User.create({
      name: 'David Faria',
      email: 'davidfaria89@gmail.com',
      password: '123456',
    });

    const payload = {
      email: 'davidfaria89@gmail.com',
      password: '123456',
    };

    const res = await req(app.server)
      .post('/sessions')
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body).toHaveProperty('token');
  });

  it('Should be able to update status confirmed after confirm register email', async () => {
    const user = await User.create({
      name: 'David Faria',
      email: 'davidfaria89@gmail.com',
      password: '123456',
      status: 'registred',
    });

    const payload = {
      hash: btoa(user.email),
    };

    const res = await req(app.server)
      .post('/confirmEmail')
      .send(payload);

    const userConfirmed = await User.findByPk(user.id);

    expect(res.status).toBe(200);
    expect(res.body.updated).toBe(true);
    expect(userConfirmed?.status).toBe('confirmed');
    expect(userConfirmed?.confirmedAt).not.toBe(null);
  });

  it('Should be able to change password when reset password', async () => {
    const forget = randomHash();
    const forgetAt = new Date();

    const user = await User.create({
      name: 'David Faria',
      email: 'davidfaria89@gmail.com',
      password: '123456',
      forget,
      forgetAt,
    });

    const payload = {
      forget,
      password: '123456_ALTERADO',
      password_confirmation: '123456_ALTERADO',
    };

    const res = await req(app.server)
      .put('/forgetResetPassword')
      .send(payload);

    expect(res.status).toBe(200);

    const userForgetPassword = await User.findByPk(user.id);

    expect(
      await compareBcryptHash(payload.password, userForgetPassword?.password),
    ).toBe(true);
    expect(userForgetPassword?.forget).toBe(null);
    expect(userForgetPassword?.forgetAt).toBe(null);
  });

  it('Should be able to return 401 with try autenticate user not exists', async () => {
    const payload = {
      email: 'davidfaria89@gmail.com',
      password: '123456',
    };

    const res = await req(app.server)
      .post('/sessions')
      .send(payload);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('User not found');
  });

  it('Should be able to return 401 with password does not match', async () => {
    await User.create({
      name: 'David Faria',
      email: 'davidfaria89@gmail.com',
      password: '123456',
    });

    const payload = {
      email: 'davidfaria89@gmail.com',
      password: 'OUTRA_SENHA',
    };

    const res = await req(app.server)
      .post('/sessions')
      .send(payload);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Password does not match');
  });

  it('Should be able to return 401 when try confirm user not exists', async () => {
    const payload = {
      hash: btoa('davidfaria89@gmail.com'),
    };

    const res = await req(app.server)
      .post('/confirmEmail')
      .send(payload);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('User not found');
  });

  it('Should be able to return 401 when try reset password user not exists', async () => {
    /**
     *  generate a fake token will used for update user
     */
    const forget = randomHash();
    const forgetAt = new Date();
    /**
     *  update user set forget token
     */
    // await User.update(
    //   { _id: userAuth._id },
    //   { $set: { forget, forgetAt: new Date() } },
    // );
    await User.update({ forget, forgetAt }, { where: { id: userAuth.id } });

    const payload = {
      forget: 'USER_PASSOU_UM_TOKE_QUE_NAO_EXISTE',
      password: 'NOVA_SENHA',
      password_confirmation: 'NOVA_SENHA',
    };

    const res = await req(app.server)
      .put('/forgetResetPassword')
      .send(payload)
      .set('Authorization', bearerToken);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Token forget invalid');
  });

  it('Should be able to return 401 when try send mail reset password user not exist', async () => {
    const payload = {
      email: 'emailnotexist@gmail.com',
    };

    const res = await req(app.server)
      .post('/forget')
      .send(payload);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('User not found');
  });
});
