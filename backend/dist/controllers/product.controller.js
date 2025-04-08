import Product from '../models/product.model.js';
export const createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
};
export const getProducts = async (req, res) => {
    try {
        const userId = req.user?._id; // 👈 Simple fix here
        const { category, minPrice, maxPrice, rating, search } = req.query;
        const filter = { user: userId }; // 👈 Only fetch logged-in user's products
        if (category)
            filter.category = category;
        if (rating)
            filter.rating = { $gte: Number(rating) };
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = Number(minPrice);
            if (maxPrice)
                filter.price.$lte = Number(maxPrice);
        }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        const products = await Product.find(filter);
        res.status(200).json(products);
    }
    catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const updateProduct = async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated)
        return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
};
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
