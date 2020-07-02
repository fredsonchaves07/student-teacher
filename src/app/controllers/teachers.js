const utils = require('../../lib/utils')
const Intl = require('intl')

const Teacher = require('../models/Teacher')

module.exports = {
    index(req, res) {
        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers){
                const pagination = {
                    filter,
                    total,
                    page
                }

                return res.render('teachers/index', {teachers, filter})
            }
        }

        Teacher.paginate(params)
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
        Teacher.delete(req.body.id, function(){
            return res.redirect(`/teachers`)
        })
    },

}

