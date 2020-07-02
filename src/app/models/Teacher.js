const db = require('../../config/db')

module.exports = {
    all(callback){
        db.query(`
            SELECT teachers.*, count(students.name) as total_students
            FROM teachers
            LEFT JOIN students
            ON students.teacher_id = teachers.id
            GROUP BY teachers.id
            ORDER BY total_students DESC
        `, function(err, results){
            if(err){
                throw `Database Error! ${err}`
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
                throw `Database Error! ${err}`
            }

            callback(results.rows[0])
        })
    },

    find(id, callback){
        const query = `SELECT * FROM teachers WHERE teachers.id = $1`

        const value = [id]

        db.query(query, value, function(err, results){
            if(err){
                throw `Database Error! ${err}`
            }

            callback(results.rows[0])
        })
    },

    findBy(filter, callback){
        db.query(`
            SELECT teachers.*, count(students.name) as total_students
            FROM teachers
            LEFT JOIN students
            ON students.teacher_id = teachers.id
            WHERE teachers.name ILIKE '%${filter}%'
            GROUP BY teachers.id
            ORDER BY total_students DESC
        `, function(err, results){
            if(err){
                throw `Database Error! ${err}`
            }
            callback(results.rows)
        })
    },

    update(data, callback){

        const query = `UPDATE teachers
                       SET avatar_url = ($1),
                           name = ($2),
                           birth = ($3),
                           graduation = ($4),
                           type = ($5),
                           courses = ($6)
                       WHERE id = $7`

        const values = [
            data.avatar_url,
            data.name,
            data.birth,
            data.graduation,
            data.type,
            data.courses,
            data.id
        ]

        db.query(query, values, (err) =>{
            if(err){
                throw `Database error! ${err}` 
            }

            callback()
        })
    },

    delete(id, callback){
        const query = `
            DELETE FROM teachers
            WHERE teachers.id = $1
        `

        const value = [id]

        db.query(query, value, (err) =>{
            if(err){
                throw `Database Error! ${err}`
            }

            callback()
        })
    },

    paginate(params){
        const {filter, limit, offset, callback} = params

        let query = '',
            filterQuery = '',
            totalQuery = `(SELECT count(*) FROM teachers) as total`

        if(filter){
            filterQuery = `WHERE teachers.name ILIKE '%${filter}%'`

            totalQuery = `(
                SELECT count(*) FROM teachers
                ${filterQuery} as total
            )`
        }

        query = `SELECT teachers.*, ${totalQuery} as total_students
        FROM teachers
        LEFT JOIN students ON teachers.id = students.id
        ${filterQuery}
        GROUP BY teachers.id
        LIMIT ${limit} OFFSET ${offset}`

        db.query(query, (err, results) => {
            if(err){
                throw `Database Error! ${err}`
            }
            callback(results.rows)
        })
    }
}