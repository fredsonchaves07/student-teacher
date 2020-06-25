const utils = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {

    index(req, res) {
        Student.all(function(students){
            return res.render('students/index', {students})
        })  
    },

    create(req, res) {
        return res.render('students/create')
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all fieds')
            }
        }

        Student.create(req.body, function(student){
            return res.redirect('/students')
        })
    },

    show(req, res) {
        Student.find(req.params.id, function(student){
            if(!student){
                return res.send('Student not found!')
            }

            student.age = utils.age(student.birth)
            student.graduation = utils.graduation(student.graduation)

            return res.render('students/show', {student})

        })
    },

    edit(req, res) {
        Student.find(req.params.id, function(student){
            if(!student){
                return res.send('Student not found')
            }

            student.birth = utils.formatDate(student.birth)

            return res.render('students/edit', {student})
        }) 
    },

    put(req, res) {
        Student.update(req.body, function(){
            return res.redirect(`/students`)
        })
    },

    delete(req, res) {
        Student.delete(req.body.id, function(){
            return res.redirect('/students')
        })
    },
}