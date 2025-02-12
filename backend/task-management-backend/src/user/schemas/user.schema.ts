import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  linkedinPhoto?: string;
  name?: string;
}

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  linkedinPhoto: { type: String, required: false },
  name: { type: String, required: false },
});
