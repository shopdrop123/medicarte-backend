import { Schema, Document, model } from 'mongoose';

interface Image {
  id: number;
  original: string;
  thumbnail: string;
}

export interface IAuthor extends Document {
  id: number;
  name: string;
  is_approved: number;
  image: Image;
  cover_image: Image;
  slug: string;
  language: string;
  bio: string;
  quote: string;
  born: Date;
  death: Date | null;
  languages: string;
  socials: string[];
  created_at: Date;
  updated_at: Date;
  products_count: number;
  translated_languages: string[];
}

const ImageSchema = new Schema<Image>(
  {
    id: { type: Number, required: true },
    original: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { _id: false },
);

export const AuthorSchema = new Schema<IAuthor>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  is_approved: { type: Number, required: true },
  image: ImageSchema,
  cover_image: ImageSchema,
  slug: { type: String, required: true, unique: true },
  language: { type: String, required: true },
  bio: { type: String, required: true },
  quote: { type: String, required: true },
  born: { type: Date, required: true },
  death: { type: Date, default: null },
  languages: { type: String, required: true },
  socials: { type: [String], default: [] },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  products_count: { type: Number, required: true },
  translated_languages: { type: [String], default: [] },
});

export const AuthorModel = model<IAuthor>('Author', AuthorSchema);
