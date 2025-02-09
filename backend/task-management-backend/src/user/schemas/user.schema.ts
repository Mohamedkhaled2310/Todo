import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  linkedinProfileUrl?: string;
  linkedinPhoto?: string;
  name?: string;
}

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  linkedinProfileUrl: { type: String, required: false },
  linkedinPhoto: { type: String, required: false },
  name: { type: String, required: false },
});
