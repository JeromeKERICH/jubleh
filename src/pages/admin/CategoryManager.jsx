import { useState, useEffect } from "react";
import axios from "axios";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("admin_token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      setCategories(res.data);
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchCategories(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    try {
      setLoading(true);
      setError("");
      
      if (editing) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/categories/${editing}`,
          { name: name.trim() },
          { headers }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/categories`,
          { name: name.trim() },
          { headers }
        );
      }
      setName("");
      setEditing(null);
      fetchCategories();
    } catch (err) {
      setError("Error saving category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`, { headers });
      fetchCategories();
    } catch (err) {
      setError("Error deleting category");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setName("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Manage Categories</h2>
        <p className="text-gray-600 mt-1">Add, edit, and organize product categories</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {editing ? "Edit Category" : "Add New Category"}
        </h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              type="submit"
              disabled={loading || !name.trim()}
              className="bg-amber-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-24"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                editing ? "Update" : "Add"
              )}
            </button>
            
            {editing && (
              <button 
                type="button"
                onClick={cancelEdit}
                disabled={loading}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Categories ({categories.length})
          </h3>
        </div>

        {loading && categories.length === 0 ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h4 className="text-gray-900 font-medium mb-2">No categories yet</h4>
            <p className="text-gray-500">Start by adding your first category above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900">Category Name</th>
                  <th className="text-right p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end space-x-3">
                        <button 
                          onClick={() => { 
                            setEditing(category._id); 
                            setName(category.name); 
                          }}
                          disabled={loading}
                          className="text-amber-600 hover:text-amber-700 font-medium text-sm disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(category._id)}
                          disabled={loading}
                          className="text-red-600 hover:text-red-700 font-medium text-sm disabled:opacity-50"
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