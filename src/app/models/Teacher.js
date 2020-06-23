const db = require('../../config/db')

module.exports = {
    all(callback){
        db.query(`SELECT * FROM teachers`, function(err, results){
            if(err){
                return res.send(`Database error!`)
            }
            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO teachers (
                avatar_url,
                name,
                birth,
                graduation,
                type,
                courses,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.birth,
            data.graduation,
            data.type,
            data.courses,
            new Date().toISOString(),
        ]

        db.query(query, values, function(err, results){
            if(err){
                return res.send('Databse not conected')
            }

            callback(results.rows[0])
        })
    },

    find(id, callback){
        const query = `SELECT * FROM teachers WHERE teachers.id = $1`

        const value = [id]

        db.query(query, value, function(err, results){
            if(err){
                return res.send('Database not conected')
            }

            callback(results.rows[0])
        })
    }
}