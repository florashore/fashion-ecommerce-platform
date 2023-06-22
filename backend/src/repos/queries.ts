import { Pool } from 'pg';

const pool = new Pool({
  user: 'shanew',
  host: 'localhost',
  database: 'ecommerce',
  password: 'password',
  port: 5432,
});

// pool.query('SELECT NOW()', (err: any, res: any) => {
//   console.log(err, res);
//   pool.end();
// });


const getUsers = (request: any, response: any) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error: any, results: { rows: any; }) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// const postUser = (request: any, response: any) => {
//   pool.query('INSERT INTO USERS (name, email) VALUES ($1, $2) RETURNING *'),
//   [name, email],
//   (error: any, results: any) => {
//     if(error) {
//       throw error
//     }

//     response.status(201).send(`Created user with id: ${results.rows[0].id}`)
//   }
// }

// const updateUser = (request: any, response: any) => {
//   pool.query('UPDATE USER SET name = $1, email = $2 WHERE id')
// }

// const deleteUser = (request: any, response: any) => {
//   pool.query('DELETE FROM USERS WHERE id = $1', [id],
//    (error: any, results: any) => {
//     if(error) {
//       throw error
//     }

//     response.status(201).send(`Deleted user with id: ${results.rows[0].id}`)
//    }
//   )
// }

export {
  getUsers
}