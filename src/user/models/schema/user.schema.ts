import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    nome: String,
    tipo_user: String,
    password: String,
    salt: String,
    isAdmin: { type: Boolean, default: false },
    isFuncionario: { type: Boolean, default: false },
    isContacto: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'users' },
);
