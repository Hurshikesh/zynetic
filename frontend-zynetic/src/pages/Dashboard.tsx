import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';
import { Product } from '../types';

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  const fetchProducts = () => {
    getProducts()
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter
    if (filterCategory) result = result.filter(p => p.category === filterCategory);
    result = result.filter(
      p =>
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        p.rating >= ratingFilter &&
        (p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()))
    );

    // Sort
    if (sortBy === 'price') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page on any filter change
  }, [search, filterCategory, priceRange, ratingFilter, sortBy, products]);

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleUpdate = (id: string) => {
    navigate(`/update-product/${id}`);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Product Dashboard</h1>
        <button onClick={() => navigate('/add-product')} className="btn btn-success">
          ➕ Add Product
        </button>
      </div>

      {/* Filter & Search */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search name or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded col-span-2"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          {/* Add more categories if needed */}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Min Rating"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(+e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sort By</option>
          <option value="price">Price (Low to High)</option>
          <option value="rating">Rating (High to Low)</option>
        </select>
      </div>

      {/* Products List */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentItems.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow">
              {product.image && (
  <img
    src={`http://localhost:5000/uploads/${product.image}`}
    alt={product.name}
    className="w-full h-40 object-cover mb-2 rounded"
  />
)}

              <h3 className="font-bold text-lg">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-sm text-gray-600">Category: {product.category}</p>
              <p className="text-sm text-gray-600">₹{product.price}</p>
              <p className="text-sm text-yellow-500">⭐ {product.rating}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleUpdate(product._id!)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => handleDelete(product._id!)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center mt-4">No products found.</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
