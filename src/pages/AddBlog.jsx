import Sidebar from "../components/Sidebar";
import BlogForm from "../components/BlogForm";

function AddBlog() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", flex: 1 }}>
        <h1>Add Blog</h1>
        <BlogForm refreshBlogs={() => {}} />
      </div>
    </div>
  );
}

export default AddBlog;
