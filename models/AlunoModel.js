const turmas = require('../database/alunos.json')
const { v4 } = require('uuid')
const fs = require('fs')

exports.adicionarAluno = async (cursoId, alunoLine) => {

    for await (let line of alunoLine){
        const alunoLineSplit = line.split(";")
        const idAlunos = alunoLineSplit[0]
        const alunos = alunoLineSplit[1]
       
        const novosAlunos = {
            curso: cursoId,
            id: v4(),
            idAlunos,
            alunos,
        }
        turmas.push(novosAlunos)
      }

    fs.writeFileSync("./database/alunos.json", JSON.stringify(turmas))
}

exports.retornarAlunos = (cursoId) =>{

const cursoEncontrado = turmas.filter((turma) => turma.curso === cursoId)


return cursoEncontrado
}
    
