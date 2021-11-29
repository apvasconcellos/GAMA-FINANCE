const AlunoModel = require("../models/AlunoModel");
const { Readable } = require('stream');
const readline = require('readline');

exports.adicionarAlunos = (cursoId, file) => {
  const { buffer } = file
  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);
  const alunoLine = readline.createInterface({
    input: readableFile,
  })
  AlunoModel.adicionarAluno(cursoId, alunoLine)};

exports.retornarAlunos = cursoId => AlunoModel.retornarAlunos(cursoId);
