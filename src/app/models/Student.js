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
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                birth,
                email,
                graduation,
                ch,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        `

        const values = [
            data.avatar_url,
            data.name,
            new Date(data.birth).toISOString(),
            data.email,
            data.graduation,
            Number(data.ch),
            data.teacher
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
            SELECT students.*, teachers.name as teacher_name
            FROM students
            LEFT JOIN teachers
            ON teachers.id = students.teacher_id
            WHERE students.id = $1
        `

        const value = [id]

        db.query(query, value, (err, results) => {
            if(err){
                throw `Database error! ${err}`
            }

            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = ` 
            UPDATE students
            SET  avatar_url = $1,
                 name = $2,
                 birth = $3,
                 email = $4,
                 graduation = $5,
                 ch = $6,
                 teacher_id = $7
            WHERE id = $8
        `

        const values = [
            data.avatar_url,
            data.name,
            new Date(data.birth).toISOString(),
            data.email,
            data.graduation,
            Number(data.ch),
            data.teacher,
            data.id
        ]

        db.query(query, values, (err) => {
            if(err){
                throw `Database error! ${err}`
            }

            callback()
        })
    },

    delete(id, callback){
        const query = `
            DELETE FROM students WHERE id = $1
        `

        const value = [id]

        db.query(query, value, (err) => {
            if(err){
                throw `Database Error! ${err}`
            }

            callback()
        })
    },

    teacherSelectOptions(callback){
        const query = `
            SELECT id, name FROM teachers
        `

        db.query(query, (err, results) => {
            if(err){
                throw `Database Error! ${err}`
            }

            callback(results.rows)
        })
    }
}