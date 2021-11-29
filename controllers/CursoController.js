const CursoModel = require("../models/CursoModel");

const CursoController = {
    criarCurso: (picture_curso_path, titulo, professor, descricao) => {
        return CursoModel.criarCurso(picture_curso_path, titulo, professor, descricao)
    },
    findAll: () => CursoModel.findAll(),
    findById: (id) => CursoModel.findById(id),
    excluirCurso: (id) => CursoModel.excluirCurso(id),
    editarCurso: (id, titulo, professor, descricao) => CursoModel.editarCurso(id, titulo, professor, descricao)
}

module.exports = CursoController;