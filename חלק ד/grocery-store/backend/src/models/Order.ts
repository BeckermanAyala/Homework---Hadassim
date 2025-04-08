import mongoose, { Schema, Document, Types } from 'mongoose';

// Structure of a product within the order
interface OrderedProduct {
  name: string;
  quantity: number;
}

// type of order
export interface IOrder extends Document {
  orderId: string;
  supplierId: Types.ObjectId;
  products: OrderedProduct[];
  status: 'חדש' | 'בתהליך' | 'הושלמה';
  createdAt: Date;
  updatedAt: Date;

}

const OrderedProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema(
  {
    supplierId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: { type: [OrderedProductSchema], required: true },
    orderId: {
      type: String,
      unique: true,
      default: () => `${Math.floor(1000 + Math.random() * 9000)}`,
    },
    status: {
      type: String,
      enum: ['חדש', 'בתהליך', 'הושלמה'],
      default: 'חדש',
    },
    storeOwnerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }

  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
