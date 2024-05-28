import { Schema, Document, model } from 'mongoose';

// Define nested schemas

const ValuesSchema = new Schema(
  {
    id: { type: Number, required: true },
    slug: { type: String, required: true },
    attribute_id: { type: Number, required: true },
    value: { type: String, required: true },
    language: { type: String, required: true },
    meta: { type: String, required: false },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    translated_languages: [{ type: String }],
  },
  { _id: false },
);

const CoverImageSchema = new Schema(
  {
    id: { type: String, required: true },
    original: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { _id: false },
);

const LogoSchema = new Schema(
  {
    id: { type: String, required: true },
    original: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { _id: false },
);

const AddressSchema = new Schema(
  {
    zip: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    street_address: { type: String, required: true },
  },
  { _id: false },
);

const SocialsSchema = new Schema(
  {
    url: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false },
);

const LocationSchema = new Schema(
  {
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: false },
    formattedAddress: { type: String, required: false },
  },
  { _id: false },
);

const SettingsSchema = new Schema(
  {
    contact: { type: String, required: true },
    socials: [SocialsSchema],
    website: { type: String, required: false },
    // location: LocationSchema || any,
    location: { type: LocationSchema, required: false },
  },
  { _id: false },
);

const ShopSchema = new Schema(
  {
    id: { type: Number, required: true },
    owner_id: { type: Number, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    cover_image: CoverImageSchema,
    logo: LogoSchema,
    is_active: { type: Number, required: true },
    address: AddressSchema,
    settings: SettingsSchema,
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
  },
  { _id: false },
);

// Define the main attribute schema

export interface IAttribute extends Document {
  id: number;
  slug: string;
  language: string;
  name: string;
  shop_id: number;
  created_at: Date;
  updated_at: Date;
  translated_languages: string[];
  values: Array<{
    id: number;
    slug: string;
    attribute_id: number;
    value: string;
    language: string;
    meta: string;
    created_at: Date;
    updated_at: Date;
    translated_languages: string[];
  }>;
  shop: {
    id: number;
    owner_id: number;
    name: string;
    slug: string;
    description: string;
    cover_image: {
      id: string;
      original: string;
      thumbnail: string;
    };
    logo: {
      id: string;
      original: string;
      thumbnail: string;
    };
    is_active: number;
    address: {
      zip: string;
      city: string;
      state: string;
      country: string;
      street_address: string;
    };
    settings: {
      contact: string;
      socials: Array<{
        url: string;
        icon: string;
      }>;
      website: string;
      location: {
        lat: number;
        lng: number;
        city: string;
        state: string;
        country: string;
        formattedAddress: string;
      };
    };
    created_at: Date;
    updated_at: Date;
  };
}

export const AttributeSchema = new Schema<IAttribute>({
  id: { type: Number, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  language: { type: String, required: true },
  name: { type: String, required: true },
  shop_id: { type: Number, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  translated_languages: [{ type: String }],
  values: [ValuesSchema],
  shop: ShopSchema,
});

export const AttributeModel = model<IAttribute>('Attribute', AttributeSchema);
