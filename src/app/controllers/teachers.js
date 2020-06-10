const utils = require('../../lib/utils')
const Intl = require('intl')
const db = require('../../config/db')

module.exports = {
    index(req, res) {
        return res.render('teachers/index.njk')
    },
    create(req, res) {
        return res.render('teachers/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fieds')
            }
        }

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
            req.body.avatar_url,
            req.body.name,
            req.body.birth,
            req.body.graduation,
            req.body.type,
            req.body.courses,
            new Date().toISOString(),
        ]

        console.log(new Date().toISOString())
        console.log(req.body.birth)

        db.query(query, values, function(err, results){
            if(err){
                return res.send('Databse not conected')
            }

            return res.redirect(`teachers/${results.rows[0].id}`)
        })
    
        return
    },
    show(req, res) {
        const { id } = req.params

        const foundTeachers = data.teachers.find(function (teachers) {
            return teachers.id == id
        })
    
        if (!foundTeachers) {
            return res.send('Teacher not found!')
        }
    
        const teacher = {
            ...foundTeachers,
            age: utils.age(foundTeachers.birth),
            graduation: utils.graduation(foundTeachers.graduation),
            courses: foundTeachers.courses.split(','),
            created_at: Intl.DateTimeFormat('pt-BR').format(new Date(foundTeachers.created_at))
        }
    
        return res.render('teachers/show', { teacher })
    },
    edit(req, res) {
        const { id } = req.params

        const foundTeachers = data.teachers.find(function (teachers) {
            return teachers.id == id
        })
    
        if (!foundTeachers) {
            return res.send('Teacher not found!')
        }
    
        let { birth } = foundTeachers
        birth = Intl.DateTimeFormat('pt-BR').format(Date.parse(foundTeachers.birth) + 20000000)
    
        const teacher = {
            ...foundTeachers,
            birth: utils.formatDate(birth)
        }
        return res.render('teachers/edit', { teacher })
    },
    put(req, res) {
        const { id } = req.body
        let index = 0
    
        const foundTeachers = data.teachers.find(function (teachers, foundIndex) {
            if (id == teachers.id) {
                index = foundIndex
                return true
            }
        })
    
        if (!foundTeachers) {
            return res.send('Student not found!')
        }
    
        const teacher = {
            id: Number(id),
            ...foundTeachers,
            ...req.body,
            birth: new Date(req.body.birth)
        }
    
        data.teachers[index] = teacher
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
            if (err) {
                return res.send("Write file error!")
            }
    
            return res.redirect(`/teachers/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body
        const filteredTeachers = data.teachers.filter(function (teacher) {
            return teacher.id != id
        })
    
        data.teachers = filteredTeachers
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
            if (err) {
                return res.send("Write file error!")
            }
    
            return res.redirect('/teachers')
        })
    },

}

