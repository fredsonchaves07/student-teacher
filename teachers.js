const fs = require('fs')
const data = require('./data.json')
const utils = require('./utils.js')

//create
exports.post = (function(req, res){
    
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Please, fill all fieds')
        }
    }

    let {avatar_url, name, birth, specialty, type, acom} = req.body

    const id = Number(data.teachers.length + 1)
    const created_at = new Date()
    birth = new Date(birth)

    data.teachers.push({
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
        console.log(data.teachers)
        return res.redirect('/teachers')
    })
})

//show
exports.show = function(req, res){
    const {id} = req.params

    const foundTeachers = data.teachers.find(function(teachers){
        return teachers.id == id
    })

    if(!foundTeachers){
        return res.send('Teacher not found!')
    }

    const teachers = {
        ...foundTeachers,
        age: utils.age(foundTeachers.birth),
        graduation: utils.graduation(foundTeachers.specialty),
        acom: foundTeachers.specialty.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR')
    }
}
//delete