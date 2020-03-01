const Pool = require('pg').Pool
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'api',
        password: '1111',
        port: 5432,
    })

    const getPlayers = (request, response) => {
    pool.query('SELECT players."Id", players."Name" FROM "Players".players', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPlayer = (request, response) => {
    const {
        name
    } = request.body

        pool.query('INSERT INTO Players (name) VALUES ($1)', [name], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${result.insertId}`)
        })
}

module.exports = {
    getPlayers,
    createPlayer
}