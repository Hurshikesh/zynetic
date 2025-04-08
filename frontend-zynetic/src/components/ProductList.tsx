// components/ProductList.tsx
import React from 'react';
import { Product } from '../types';

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
};

const ProductList: React.FC<Props> = ({ products, onDelete, onUpdate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p._id} className="border p-4 rounded shadow">
          <h3 className="font-bold">{p.name}</h3>
          <p>{p.description}</p>
          <p>₹{p.price}</p>
          <p>⭐ {p.rating}</p>
          <div className="mt-2 flex gap-2">
            <button onClick={() => onUpdate(p._id!)} className="btn btn-warning">Edit</button>
            <button onClick={() => onDelete(p._id!)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
