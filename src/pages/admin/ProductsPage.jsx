import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import ProductForm from "../../components/ProductForm";

export default function ProductsPage(){
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async ()=> {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(()=>{ load(); }, []);

  const onDelete = async (id) => {
    if(!confirm("Delete product?")) return;
    await API.delete(`/products/${id}`);
    load();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Products</h2>
        <button className="btn" onClick={() => { setEditing(null); setShowForm(true); }}>
          + Add Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editing}
          onSuccess={() => { setShowForm(false); load(); }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border rounded p-4 flex flex-col">
            <img src={p.images?.[0] || "/placeholder.png"} alt={p.name} className="h-48 w-full object-cover mb-3 rounded" />
            <h3 className="font-medium">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.category}</p>
            <div className="mt-auto flex gap-2">
              <button className="px-3 py-1 border rounded" onClick={()=>{ setEditing(p); setShowForm(true); }}>Edit</button>
              <button className="px-3 py-1 border rounded text-red-600" onClick={()=> onDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
