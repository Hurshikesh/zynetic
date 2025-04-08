import { useState, useEffect } from 'react';
import API from '../services/api';
import { Product } from '../types';

const ProductForm = ({ productId }: { productId?: string }) => {
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    category: '',
    price: 0,
    rating: 0
  });

  useEffect(() => {
    if (productId) {
      API.get(`/products/${productId}`).then(res => setProduct(res.data));
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productId) {
      await API.put(`/products/${productId}`, product);
    } else {
      await API.post('/products', product);
    }
    setProduct({ name: '', description: '', category: '', price: 0, rating: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input className="form-control" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input className="form-control" value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <input className="form-control" value={product.category} onChange={e => setProduct({ ...product, category: e.target.value })} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input type="number" className="form-control" value={product.price} onChange={e => setProduct({ ...product, price: +e.target.value })} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <input type="number" className="form-control" value={product.rating} onChange={e => setProduct({ ...product, rating: +e.target.value })} required />
      </div>
      <button type="submit" className="btn btn-primary">
        {productId ? 'Update' : 'Add'} Product
      </button>
    </form>
  );
};

export default ProductForm;
