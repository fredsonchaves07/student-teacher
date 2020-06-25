const db = require('../../config/db')

module.exports = {
    all(callback){
        const query = `
            SELECT * FROM students
        `
        db.query(query, (err, results) =>{
            if(err){
                throw `Database Error! ${err}`
            }

            return callback(results.rows)
        })

    },

    create(data, callback){
        console.log(data)
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                birth,
                email,
                graduation,
                ch
            ) VALUES ($1, $2, $3, $4, $5, $6)
        `

        const values = [
            data.avatar_url,
            data.name,
            new Date(data.birth).toISOString(),
            data.email,
            data.graduation,
            Number(data.ch),
        ]

        db.query(query, values, (err) => {
            if(err){
                throw `Database Error! ${err}`
            }

            callback()
        })
    },

    find(id, callback){
        const query = `
            SELECT * FROM students
            WHERE id = $1
        `

        const value = [id]

        db.query(query, value, (err, results) => {
            if(err){
                throw `Database error! ${err}`
            }

            callback(results.rows[0])
        })
    }
}