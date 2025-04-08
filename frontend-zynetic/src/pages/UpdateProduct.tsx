import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

const UpdateProduct = () => {
  const { id } = useParams();
  return (
    <div className="container mt-4">
      <h2 className="text-warning mb-3">Update Product</h2>
      <ProductForm productId={id} />
    </div>
  );
};

export default UpdateProduct;
