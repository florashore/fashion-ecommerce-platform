import { Pool } from 'pg';

const pool = new Pool({
  user: 'yourUserName',
  host: 'yourHost',
  database: 'yourDatabase',
  password: 'yourPassword',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});
