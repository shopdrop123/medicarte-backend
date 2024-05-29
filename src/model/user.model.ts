import { Schema, Document, model } from 'mongoose';

interface Address {
  id: number;
  title: string;
  type: string;
  default: number;
  customer: any;
  address: {
    zip: string;
    city: string;
    state: string;
    country: string;
    street_address: string;
  };
  customer_id: number;
  created_at: Date;
  updated_at: Date;
}

interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: Date;
  updated_at: Date;
  pivot: {
    model_id: number;
    permission_id: number;
    model_type: string;
  };
}

interface Profile {
  id: number;
  avatar: any;
  bio: string;
  socials: any;
  contact: string;
  customer_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  shop_id: number | null;
  profile: Profile;
  address: Address[] | any;
  permissions: Permission[];
}

const AddressSchema = new Schema<Address>(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    default: { type: Number, required: true },
    address: {
      zip: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      street_address: { type: String, required: true },
    },
    customer_id: { type: Number, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
  },
  { _id: false },
);

const PermissionSchema = new Schema<Permission>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    guard_name: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    pivot: {
      model_id: { type: Number, required: true },
      permission_id: { type: Number, required: true },
      model_type: { type: String, required: true },
    },
  },
  { _id: false },
);

const ProfileSchema = new Schema<Profile>(
  {
    id: { type: Number, required: true },
    avatar: { type: String, default: null },
    bio: { type: String, required: true },
    socials: { type: String, default: null },
    contact: { type: String, required: true },
    customer_id: { type: Number, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
  },
  { _id: false },
);

export const UserSchema = new Schema<IUser>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  email_verified_at: { type: Date, default: null },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  is_active: { type: Boolean, required: true },
  shop_id: { type: Number, default: null },
  profile: ProfileSchema,
  address: [AddressSchema],
  permissions: [PermissionSchema],
});

export const UserModel = model<IUser>('User', UserSchema);
