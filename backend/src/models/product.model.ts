import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  rating: Number,
  image: { type: String, required: false }

});

export default mongoose.model('Product', productSchema);
