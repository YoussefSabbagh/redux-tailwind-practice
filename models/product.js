import { Schema, models, model } from 'mongoose';

const productSchema = new Schema({
  sku_code: String,
  brandcode: String,
  brand: String,
  category: String,
  photo: String,
  name: String,
  price: Number,
  stock: Number,
  date: String,
  status: String,
  rate: Number,
  reviews: Number,
});

const Products = models.product || model('product', productSchema);

export default Products;
