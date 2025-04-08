import mongoose, { Schema, Document } from 'mongoose';

// Definition of a single product
interface Product {
  name: string;
  price: number;
  minQuantity: number;
}

// Interface of the entire document (user)
export interface IUser extends Document {
  companyName: string;
  phoneNumber: string;
  representativeName: string;
  productsOffered: Product[];
  password: string;
  role: 'admin' | 'supplier';

}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  minQuantity: { type: Number, required: true },
});

const UserSchema: Schema = new Schema({
  companyName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  representativeName: { type: String, required: true },
  productsOffered: { type: [ProductSchema], default: [] },
  password: {type: String, required: true},
  role: { type: String, enum: ['admin', 'supplier'], required: true },

});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
