import '@app/bootstrap';
import req from 'supertest';
import app from '@app/app';
import { randomHash, btoa, compareBcryptHash } from '@helpers/hash';
import { generateJwtToken } from '@helpers/jwt';

describe('Suit of test auth', () => {
  it('Should be able to register a new user', async () => {
    const email = 'davidfaria89@gmail.com';
    const emailBase64 = btoa(email);

    const payload = {
      name: 'David',
      password: '123456',
      email,
      link: `${process.env.APP_URL_FRONTEND}/confirmActive/${emailBase64}`,
    };

    const res = await req(app)
      .post('/register')
      .send(payload);
    expect(res.status).toBe(201);
    expect(res.body.exists).toBe(false);
    expect(res.body).toHaveProperty('user');
  });
});
