import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    currency: "KES",
    stock: 0,
    category: "",
    images: [],
    attributes: { color: "", size: "", material: "" },
    featured: false,
    visible: true,
  });
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("admin_token");
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch categories and products
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      setCategories(res.data);
    } catch (err) {
      setError("Failed to fetch categories");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
  
    setUploading(true);
  
    const uploadedImages = [];
  
    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "jubleh_preset"); // ✅ matches Cloudinary
      formData.append("folder", "products"); // optional - matches your folder name
  
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dadhuap2d/image/upload", // ✅ use your real cloud name here
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await res.json();
      uploadedImages.push(data.secure_url);
    }
  
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedImages],
    }));
  
    setUploading(false);
  };
  

  // Create or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.price || !form.category) {
      setError("Title, Price, and Category are required.");
      return;
    }

    try {
      setLoading(true);
      if (editing) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/products/${editing}`,
          form,
          { headers }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/products`, form, {
          headers,
        });
      }

      setForm({
        title: "",
        description: "",
        price: "",
        currency: "KES",
        stock: 0,
        category: "",
        images: [],
        attributes: { color: "", size: "", material: "" },
        featured: false,
        visible: true,
      });
      setEditing(null);
      fetchProducts();
    } catch (err) {
      setError("Error saving product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        headers,
      });
      fetchProducts();
    } catch (err) {
      setError("Error deleting product");
    }
  };

  // Edit Product
  const handleEdit = (p) => {
    setEditing(p._id);
    setForm({
      title: p.title,
      description: p.description,
      price: p.price,
      currency: p.currency,
      stock: p.stock,
      category: p.category?._id || "",
      images: p.images || [],
      attributes: p.attributes || { color: "", size: "", material: "" },
      featured: p.featured || false,
      visible: p.visible ?? true,
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      price: "",
      currency: "KES",
      stock: 0,
      category: "",
      images: [],
      attributes: { color: "", size: "", material: "" },
      featured: false,
      visible: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {editing ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-gray-600 mt-1">
          {editing ? "Update product details" : "Create a new product listing"}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Product Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                placeholder="Enter product title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (KES) *
              </label>
              <input
                placeholder="0.00"
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe the product features and benefits..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
            />
          </div>

          {/* Category and Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                placeholder="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Attributes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Product Attributes
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                placeholder="Color"
                value={form.attributes.color}
                onChange={(e) =>
                  setForm({
                    ...form,
                    attributes: { ...form.attributes, color: e.target.value },
                  })
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
              <input
                placeholder="Size"
                value={form.attributes.size}
                onChange={(e) =>
                  setForm({
                    ...form,
                    attributes: { ...form.attributes, size: e.target.value },
                  })
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
              <input
                placeholder="Material"
                value={form.attributes.material}
                onChange={(e) =>
                  setForm({
                    ...form,
                    attributes: { ...form.attributes, material: e.target.value },
                  })
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={form.visible}
                onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                className="w-4 h-4 text-amber-400 border-gray-300 rounded focus:ring-amber-400"
              />
              <span className="text-sm font-medium text-gray-700">Visible to customers</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 text-amber-400 border-gray-300 rounded focus:ring-amber-400"
              />
              <span className="text-sm font-medium text-gray-700">Featured product</span>
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Product Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={uploading}
              />
              <label 
                htmlFor="image-upload" 
                className={`cursor-pointer block ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
              >
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  {uploading ? "Uploading..." : "Upload images"}
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB each
                </span>
              </label>
            </div>

            {/* Image Previews */}
            {form.images.length > 0 && (
              <div className="mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img}
                        alt="Product preview"
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            images: form.images.filter((_, index) => index !== i),
                          })
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-amber-400 text-black py-3 px-6 rounded-lg font-semibold hover:bg-amber-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {editing ? "Updating..." : "Saving..."}
                </span>
              ) : (
                editing ? "Update Product" : "Save Product"
              )}
            </button>
            
            {editing && (
              <button
                type="button"
                onClick={cancelEdit}
                disabled={loading}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">
            All Products ({products.length})
          </h3>
        </div>

        {loading && products.length === 0 ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h4 className="text-gray-900 font-medium mb-2">No products yet</h4>
            <p className="text-gray-500">Start by adding your first product above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900">Product</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Title</th>
                  <th className="text-right p-4 font-semibold text-gray-900">Price</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Stock</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                  <th className="text-right p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg border"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{product.title}</span>
                        <span className="text-sm text-gray-500">{product.category?.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-semibold text-gray-900">
                        KES {product.price?.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' : 
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock || 0} in stock
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col space-y-1">
                        {product.featured && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
                            Featured
                          </span>
                        )}
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          product.visible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end space-x-3">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}