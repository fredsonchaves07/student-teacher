const utils = require('../../lib/utils')
const Intl = require('intl')

const Teacher = require('../models/Teacher')

module.exports = {
    index(req, res) {
        Teacher.all(function(teachers){
            return res.render('teachers/index', {teachers})
        })
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

        Teacher.create(req.body, function(teacher){
            return res.redirect('/teachers')
        })
    },

    show(req, res) {
        
        Teacher.find(req.params.id, function(teacher){
            
            if(!teacher){
                return res.send('Teacher not found!')
            }

            teacher.age = utils.age(teacher.birth),
            teacher.graduation = utils.graduation(teacher.graduation),
            teacher.courses = teacher.courses.split(','),
            teacher.created_at = Intl.DateTimeFormat('pt-BR').format(new Date(teacher.created_at))

            return res.render('teachers/show', { teacher })
        })
    },

    edit(req, res) {
       Teacher.find(req.params.id, function (teacher){

           if(!teacher){
               return res.send('Teacher not fountd!')
           }

           teacher.birth = utils.formatDate(teacher.birth)
           return res.render('teachers/edit', {teacher})

       })
    },

    put(req, res) {
        Teacher.update(req.body, function(){
            return res.redirect(`/teachers`)
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

