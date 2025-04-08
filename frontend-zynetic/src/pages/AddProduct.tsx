import ProductForm from '../components/ProductForm';

const AddProduct = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1 className="h4 mb-4 text-primary">Add a New Product</h1>
        <ProductForm />
      </div>
    </div>
  );
};

export default AddProduct;
