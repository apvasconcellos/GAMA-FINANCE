const cursos = require('../database/cursos.json')
const { v4 } = require('uuid')
const fs = require('fs')

exports.findAll = () => cursos;

exports.findById = (id) => cursos.find((curso) => curso.id === id);

exports.criarCurso = (picture_curso_path, titulo, professor, descricao) => {
    const novoCurso = {
        id: v4(),
        picture_curso_path,
        titulo,
        professor,
        descricao, 
        dataCriacao: new Date().toLocaleString("pt-BR"),
        dataModificacao: new Date().toLocaleString("pt-BR")
    };
    
    cursos.push(novoCurso)

    fs.writeFileSync("./database/cursos.json", JSON.stringify(cursos))
    return novoCurso
}

exports.excluirCurso = (id)=> {
        
    const index = cursos.findIndex((curso)=> curso.id === id);
    cursos.splice(index, 1)
   fs.writeFileSync("./database/cursos.json", JSON.stringify(cursos));
   
}

exports.editarCurso = (id, titulo, professor, descricao) => {
    const cursoEncontrado = this.findById(id)

    cursoEncontrado.titulo = titulo
    cursoEncontrado.professor = professor
    cursoEncontrado.descricao = descricao
    cursoEncontrado.dataModificacao = new Date().toLocaleString("pt-BR")

    fs.writeFileSync("./database/cursos.json", JSON.stringify(cursos));

    return cursoEncontrado
}

