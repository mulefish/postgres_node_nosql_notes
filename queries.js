const {Caller} = require('./caller.js');
const caller = new Caller(); 
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const insertJsonObject = (request, response) => {
    caller.showStack()
    pool.query('INSERT INTO validatedTable (data) VALUES($1)', [request.body], (error, results) => {
    if (error) {
      console.log("Error " + error )
      response.status(500).send(`Validation constraint fail ${error}`)
    } else {
      response.status(201).send(`insert into validatedtable ${JSON.stringify(request.body)}`)
    }
  })
}




const getUsers = (request, response) => {
  caller.showStack()
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  caller.showStack()
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  caller.showStack()
  const { name, email } = request.body
  console.log("name ", name , " email ", email )
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    
    if (error) {
      console.log("Error " + error )
      throw error
    }
    response.status(201).send(`User added with ID...`)
  })
}

const updateUser = (request, response) => {
  caller.showStack()
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  caller.showStack()
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  insertJsonObject
}