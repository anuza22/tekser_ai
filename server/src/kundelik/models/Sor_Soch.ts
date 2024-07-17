import mongoose, { Document, Schema } from 'mongoose';

export interface ISorSoch extends Document{
    id: string;
    studentId: string;
    studentName: string;
    links: string[];
    results: string;
  }

  const SorSochSchema: Schema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    studentName: { type: String, required: true },
    links: [{ type: String, required: true }],
    results: { type: String, required: true },
  });


  export default mongoose.model<ISorSoch>('SorSoch', SorSochSchema);