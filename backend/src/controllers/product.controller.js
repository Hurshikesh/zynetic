import Product from '../models/product.model';
export const createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
};
export const getProducts = async (req, res) => {
    const { category, minPrice, maxPrice, rating, search } = req.query;
    const filter = {};
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
    res.json(products);
};
export const updateProduct = async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated)
        return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
};
export const deleteProduct = async (req, res) => {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
        return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
};
