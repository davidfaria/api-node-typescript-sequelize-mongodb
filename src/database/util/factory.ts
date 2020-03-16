import faker from 'faker';
import factory from 'factory-girl';

import User from '@models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
