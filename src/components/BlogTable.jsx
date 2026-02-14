import api from "../api";

function BlogTable({ blogs, setSelectedBlog, refreshBlogs }) {

  const deleteBlog = async (id) => {
    await api.delete(`/blogs/${id}`);
    refreshBlogs();
  };

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <h3>{blog.title}</h3>
          <img src={blog.image} width="150" alt="" />
          <p>{blog.description}</p>
          <p><strong>Category:</strong> {blog.category}</p>
          <p><strong>Date:</strong> {new Date(blog.date).toDateString()}</p>

          <button onClick={() => setSelectedBlog(blog)}>Edit</button>
          <button onClick={() => deleteBlog(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default BlogTable;
