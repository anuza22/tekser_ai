import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  id: number;
  id_str: string;
  personId: number;
  personId_str: string;
  kundelikLogin: string;
  kundelikPassword: string;
  kundelikToken: string;
  shortName: string;
  locale: string;
  timezone: string;
  sex: string;
  birthday: Date;
  roles: string[];
  phone?: string;
  schoolName?: string;
  className?: string;
  subjectName?: string;
  userRole?: string;
}

const UserSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  id_str: { type: String, required: true, unique: true },
  personId: { type: Number, required: true, unique: true },
  personId_str: { type: String, required: true, unique: true },
  kundelikLogin: { type: String, required: true },
  kundelikPassword: { type: String, required: true },
  kundelikToken: { type: String, required: true },
  shortName: { type: String, required: true },
  locale: { type: String, required: true },
  timezone: { type: String, required: true },
  sex: { type: String, required: true },
  birthday: { type: Date, required: true },
  roles: { type: [String], required: true },
  phone: { type: String, default: '' },
  schoolName: { type: String, required: false },
  className: { type: String, required: false },
  subjectName: { type: String, required: false },
  userRole: { type: String, required: false },
});

export default mongoose.model<IUser>('User', UserSchema);
