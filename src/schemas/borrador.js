import mongoose from 'mongoose';

export const borradorSchema = new mongoose.schema({
  nombre: String
});

export const Borrador = mongoose.model('Borrador', borradorSchema);