const Diaria = require('../models/diariaModel');
const asyncHandler = require('express-async-handler');
const { calcularTotais } = require('../services/diariaService');

// @desc    Criar nova diária
// @route   POST /api/diarias
// @access  Privado
const criarDiaria = asyncHandler(async (req, res) => {
  const { funcionario, valor, descricao, projeto } = req.body;
  
  const diaria = await Diaria.create({
    funcionario,
    valor,
    descricao,
    projeto,
    usuario: req.user.id
  });

  res.status(201).json(diaria);
});

// @desc    Obter todas diárias
// @route   GET /api/diarias
// @access  Privado/Admin
const obterDiarias = asyncHandler(async (req, res) => {
  const { status, funcionario, inicio, fim } = req.query;
  
  const filtro = {};
  if (status) filtro.status = status;
  if (funcionario) filtro.funcionario = funcionario;
  if (inicio && fim) {
    filtro.data = { 
      $gte: new Date(inicio),
      $lte: new Date(fim)
    };
  }

  const diarias = await Diaria.find(filtro)
    .populate('funcionario', 'nome cargo')
    .sort('-data');

  const totais = await calcularTotais(diarias);

  res.json({ diarias, totais });
});

module.exports = {
  criarDiaria,
  obterDiarias
};