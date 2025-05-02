const mongoose = require('mongoose');

const diariaSchema = new mongoose.Schema({
  funcionario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Funcionario',
    required: true
  },
  data: {
    type: Date,
    required: true,
    default: Date.now
  },
  valor: {
    type: Number,
    required: true,
    min: 0
  },
  descricao: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  projeto: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pendente', 'aprovada', 'rejeitada', 'paga'],
    default: 'pendente'
  },
  comprovantes: [String], // URLs dos comprovantes
  criadoEm: {
    type: Date,
    default: Date.now
  },
  atualizadoEm: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

diariaSchema.pre('save', function(next) {
  this.atualizadoEm = Date.now();
  next();
});

module.exports = mongoose.model('Diaria', diariaSchema);