import { Schema, Document, model } from 'mongoose';

interface Image {
  id: number;
  original: string;
  thumbnail: string;
}

interface Type {
  id: number;
  name: string;
  language: string;
  translated_languages: string[];
  settings: {
    isHome: boolean;
    layoutType: string;
    productCard: string;
  };
  slug: string;
  icon: string;
  promotional_sliders: Image[];
  created_at: Date;
  updated_at: Date;
}

export interface ICategory extends Document {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image: Image[];
  details: string | null;
  language: string;
  translated_languages: string[];
  parent: ICategory | null;
  type_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  parent_id: number | null;
  type: Type | null;
  children: ICategory[];
}

const ImageSchema = new Schema<Image>(
  {
    id: { type: Number, required: true },
    original: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { _id: false },
);

const TypeSchema = new Schema<Type>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    language: { type: String, required: true },
    translated_languages: { type: [String], default: [] },
    settings: {
      isHome: { type: Boolean, required: true },
      layoutType: { type: String, required: true },
      productCard: { type: String, required: true },
    },
    slug: { type: String, required: true },
    icon: { type: String, required: true },
    promotional_sliders: [ImageSchema],
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
  },
  { _id: false },
);

export const CategorySchema = new Schema<ICategory>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, required: false },
  image: { type: [ImageSchema], default: [] },
  details: { type: String, default: null },
  language: { type: String, required: false },
  translated_languages: { type: [String], default: [] },
  parent: { type: Schema.Types.Mixed, default: null },
  type_id: { type: Number, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  deleted_at: { type: Date, default: null },
  parent_id: { type: Number, default: null },
  type: { type: TypeSchema, default: null },
  children: { type: [Schema.Types.Mixed], default: [] },
});

export const CategoryModel = model<ICategory>('Category', CategorySchema);
