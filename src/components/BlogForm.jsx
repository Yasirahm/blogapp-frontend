import { useState, useEffect } from "react";
import api from "../api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function AdminBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH BLOGS ================= */

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      toast.error("Failed to load blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ================= EDIT HANDLER ================= */

  useEffect(() => {
    if (selectedBlog) {
      setForm({
        title: selectedBlog.title,
        description: selectedBlog.description,
        category: selectedBlog.category,
        image: null,
      });
      setPreview(selectedBlog.image);
    }
  }, [selectedBlog]);

  /* ================= FORM HANDLERS ================= */

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (let key in form) {
      if (form[key]) data.append(key, form[key]);
    }

    try {
      if (selectedBlog) {
        await api.put(`/blogs/${selectedBlog._id}`, data);
        toast.success("Blog Updated Successfully 🚀");
      } else {
        await api.post("/blogs", data);
        toast.success("Blog Added Successfully 🎉");
      }

      setForm({
        title: "",
        description: "",
        category: "",
        image: null,
      });

      setPreview(null);
      setSelectedBlog(null);
      fetchBlogs();
    } catch (error) {
      toast.error("Something went wrong ❌");
    }

    setLoading(false);
  };

  /* ================= DELETE ================= */

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/blogs/${id}`);
      toast.success("Blog Deleted");
      fetchBlogs();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">

      <div className="max-w-5xl mx-auto space-y-10">

        {/* ================= FORM ================= */}
        <div className="relative bg-white shadow-lg rounded-2xl p-6">

          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm 
                            flex items-center justify-center 
                            rounded-2xl z-50">
              <Loader />
            </div>
          )}

          <h2 className="text-2xl font-bold mb-6">
            {selectedBlog ? "Edit Blog" : "Create New Blog"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="title"
              placeholder="Blog Title"
              onChange={handleChange}
              value={form.title}
              required
              disabled={loading}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              name="category"
              placeholder="Category"
              onChange={handleChange}
              value={form.category}
              disabled={loading}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              name="description"
              placeholder="Write your blog content..."
              onChange={handleChange}
              value={form.description}
              rows="5"
              disabled={loading}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />

            <div>
              <label className="block mb-2 text-gray-600">
                Upload Image
              </label>

              <input
                type="file"
                name="image"
                onChange={handleChange}
                disabled={loading}
                className="w-full"
              />
            </div>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-40 rounded-lg shadow-md mt-3"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {selectedBlog ? "Update Blog" : "Publish Blog"}
            </button>

          </form>
        </div>

        {/* ================= BLOG LIST ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 space-y-2">
                <h3 className="font-bold">{blog.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {blog.description}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default AdminBlogPage;
