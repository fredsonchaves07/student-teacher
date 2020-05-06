const fs = require('fs')
const data = require('../data.json')
const utils = require('../utils.js')
const Intl = require('intl')

//create
exports.post = (function(req, res){
    
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Please, fill all fieds')
        }
    }

    let {avatar_url, name, birth, specialty, type, acom} = req.body

    const id = Number(data.students.length + 1)
    const created_at = new Date()
    birth = new Date(birth)

    data.students.push({
        id,
        avatar_url,
        name,
        birth,
        specialty,
        type,
        acom,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send('Write file error!')
        }
        return res.redirect('/students')
    })
})

//show
exports.show = function(req, res){
    const {id} = req.params

    const foundStudents = data.students.find(function(students){
        return students.id == id
    })

    if(!foundStudents){
        return res.send('Student not found!')
    }

    const student = {
        ...foundStudents,
        age: utils.age(foundStudents.birth),
        graduation: utils.graduation(foundStudents.specialty),
        acom: foundStudents.acom.split(','),
        created_at: Intl.DateTimeFormat('pt-BR').format(new Date(foundStudents.created_at))
    }

    return res.render('students/show', {student})
}
//edit
exports.edit = function(req, res){
    const {id} = req.params

    const foundStudents = data.students.find(function(students){
        return students.id == id
    })

    if(!foundStudents){
        return res.send('Student not found!')
    }

    let {birth} = foundStudents
    birth = Intl.DateTimeFormat('pt-BR').format(Date.parse(foundStudents.birth) + 10000000)
    
    const student = {
        ...foundStudents,
        birth: utils.formatDate(birth),
    }
    return res.render('students/edit', {student})
}
//put
exports.put = function(req, res){
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
        ...foundStudents,
        ...req.body,
        birth: new Date(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send("Write file error!")
        }

        return res.redirect(`/students/${id}`)
    })
}

//delete
exports.delete = function(req, res){
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


}

//Index
exports.index = function(req, res){
    return res.render('students/index', {students: data.students})
}