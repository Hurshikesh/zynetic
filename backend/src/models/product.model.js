import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    rating: Number,
});
export default mongoose.model('Product', productSchema);
