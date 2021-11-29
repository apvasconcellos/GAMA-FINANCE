const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer();
const path = require('path');
const CursoController = require("../controllers/CursoController");
const AlunoController = require("../controllers/AlunoController");

// set Storage

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const up = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de arquivo inválido"));
    }
  }
}).single('picture')

// cursos
router.get('/', async (req, res, next) => {
  const cursos = await CursoController.findAll()
  res.render('listaCursos', { title: 'Cursos',  cursos });
});

//criar curso
router.get('/novocurso',  (req, res, next) => {
  res.render('newCurso', { title: 'Novo Curso'});
});
router.post('/novocurso', up, async (req, res, next) => {
    if(req.file == undefined){
      res.render('newCurso', { title: 'Novo Curso', msg:"Error: no file Selected!" });
    } else {
      
      const picture_curso_path = req.file.filename;
      const {titulo, professor, descricao } = req.body
      CursoController.criarCurso(picture_curso_path, titulo, professor, descricao)
      res.redirect('/cursos')
    }
});
// curso
router.get('/:id',  async (req, res, next) => {
  const { id } = req.params
  const curso = CursoController.findById(id)
  const turma =  await AlunoController.retornarAlunos(id);
   
  res.render('curso', { title: 'Curso',  curso, turma });
});
router.get('/editar/:id',  async (req, res, next) => {
  const { id } = req.params;
  const curso = await CursoController.findById(id)
  res.render('editarCurso', { title: 'Editar Curso',  curso });
});
router.post('/editar/:id', (req, res, next) => {
  const {id} = req.params
  const {titulo, professor, descricao} = req.body
  CursoController.editarCurso(id, titulo, professor, descricao )
  res.redirect('/cursos')
});

//aulas curso
router.get('/aulas/:id', async (req, res, next) => {
  const {id} = req.params
  const curso = await CursoController.findById(id)

  res.render('aulas', { title: 'Aulas', curso})
});
// apagar curso
router.post('/removercurso',  (req, res, next) => {
  const {id} = req.body
  CursoController.excluirCurso(id)
  res.redirect('/cursos')
});

//importar arquivo
router.post('/:id',upload.single('lista_alunos'),  async function(req, res) {
  
  const cursoId = req.params.id
  AlunoController.adicionarAlunos(cursoId, req.file);
  res.redirect(`/cursos/${cursoId}`);
});

module.exports = router;