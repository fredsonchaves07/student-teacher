exports.age = function(birth){
    data = new Date()
    birth = new Date(birth)

    diff = Math.abs(data.getTime() - birth.getTime())
    age = Math.ceil(diff / (1000 * 3600 * 24 * 30.5 * 12)) - 1

    if(data.getDate() >= (birth.getDate() + 1) && (data.getMonth() + 1) == (birth.getMonth() + 1)){
        age += 1
    }

    return age
}

exports.graduation = function(specialty){
    if(specialty == 'medio'){
        return 'Ensino Médio'
    } else if(specialty == 'superior'){
        return 'Ensino Superior'
    } else if(specialty == 'mestrado'){
        return 'Mestrado'
    } else if(specialty == 'doutorado'){
        return 'Doutorado'
    } else if(specialty == '6F'){
        return '6º Ano do Fundamental'
    } else if(specialty == '7F'){
        return '7º Ano do Fundamental'
    } else if(specialty == '8F'){
        return '8º Ano do Fundamental'
    } else if(specialty == '9F'){
        return '9º Ano do Fundamental'
    } else if(specialty == '1M'){
        return '1º Ano do Médio'
    } else if(specialty == '2M'){
        return '2º Ano do Médio'
    } else if(specialty == '3M'){
        return '3º Ano do Médio'
    }  
}

exports.formatDate = function(date){
    return date.split('/').reverse().join('-')
}