import * as mongoose from 'mongoose';

export const ContactoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contacto: Number,
  },
  { timestamps: true, collection: 'contactos' },
);
