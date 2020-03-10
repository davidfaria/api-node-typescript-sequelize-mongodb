import '@app/bootstrap';

describe('Suit test user', () => {
  it('Should be able to register a new user', async () => {
    console.log('NODE_ENV', process.env.NODE_ENV);
    console.log('DATABASE', process.env.DB_NAME);

    expect(2 + 2).toBe(4);
  });
});
