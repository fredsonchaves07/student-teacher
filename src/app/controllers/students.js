const utils = require('../../lib/utils')
const Intl = require('intl')
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

        /*let {birth} = foundStudents
        birth = Intl.DateTimeFormat('pt-BR').format(Date.parse(foundStudents.birth) + 20000000)
        
        const student = {
            ...foundStudents,
            birth: utils.formatDate(birth),
        }*/
        
    },

    put(req, res) {
        const {id} = req.body
        let index = 0
    
        const foundStudents = data.students.find(function(students, foundIndex){
            if(id == students.id){
                index = foundIndex
                return true
            }
        })
    
        if(!foundStudents){
            return res.send('Student not found!')
        }
    
        const student = {
            id: Number(id),
            ...foundStudents,
            ...req.body,
            birth: new Date(req.body.birth)
        }
    
        console.log('teste')
    
        data.students[index] = student
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err){
                return res.send("Write file error!")
            }
    
            return res.redirect(`/students/${id}`)
        })
    },
    delete(req, res) {
        const {id} = req.body
        const filteredStudents = data.students.filter(function(student){
            return student.id != id
        })
    
        data.students = filteredStudents
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err){
                return res.send("Write file error!")
            }
    
            return res.redirect('/students')
        })
    },
}