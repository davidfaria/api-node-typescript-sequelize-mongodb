import '../bootstrap';
import Knex from 'knex';

export default Knex({
  client: 'pg',
  connection: {
    port: 5432,
    host: '127.0.0.1',
    user: 'postgres',
    password: 'docker',
    database: 'larawork',
  }
})