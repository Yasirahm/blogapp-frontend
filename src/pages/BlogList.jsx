import { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      toast.error("Failed to fetch blogs ❌");
    }
    setLoading(false);
  };

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/blogs/${id}`);
      toast.success("Blog Deleted 🗑");
      fetchBlogs();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          All Blogs
        </h1>

        {loading ? (
          <div className="text-center text-gray-600">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-gray-500">No blogs available.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    {blog.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {blog.description}
                  </p>

                  <p className="text-xs text-gray-400 mb-4">
                    {new Date(blog.date).toDateString()}
                  </p>

                  {/* Buttons */}
                  <div className="flex justify-between">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                      onClick={() => deleteBlog(blog._id)}
                    >
                      Delete
                    </button>

                    <button
                      className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm transition"
                      onClick={() =>
                        toast("Edit feature can be added here ✏")
                      }
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogList;
