import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  company?: string;
  jobTitle?: string;
}

const contactSchema: Schema<IContact> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Contact must belong to a user'],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
  },
  company: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
});

const Contact = mongoose.model<IContact>('Contact', contactSchema);
export default Contact;
