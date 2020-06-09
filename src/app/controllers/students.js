const utils = require('../../lib/utils')
const Intl = require('intl')

module.exports = {
    index(req, res) {
        return res.render('students/index', {students: data.students})
    },
    create(req, res) {
        return res.render('stundents/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all fieds')
            }
        }
    
        foundStudents = req.body
    
        const id = String(data.students.length + 1)
        birth = new Date(req.body.birth)
        ch = Number(req.body.ch)
    
        data.students.push({
            id,
            ...foundStudents,
            birth,
            ch
        })
    
        fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
            if(err){
                return res.send('Write file error!')
            }
            return res.redirect('/students')
        })
    },
    show(req, res) {
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
        graduation: utils.graduation(foundStudents.graduation),
    }
    return res.render('students/show', {student})

    },
    edit(req, res) {
        const {id} = req.params

        const foundStudents = data.students.find(function(students){
            return students.id == id
        })
    
        if(!foundStudents){
            return res.send('Student not found!')
        }
    
        let {birth} = foundStudents
        birth = Intl.DateTimeFormat('pt-BR').format(Date.parse(foundStudents.birth) + 20000000)
        
        const student = {
            ...foundStudents,
            birth: utils.formatDate(birth),
        }
        return res.render('students/edit', {student})
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