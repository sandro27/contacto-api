import { Document } from 'mongoose';
import { User } from 'src/user/models/interface/user.interface';

export interface Contacto extends Document {
  user: User;
  contacto: number;
}
