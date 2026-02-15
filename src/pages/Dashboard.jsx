import Sidebar from "../components/Sidebar";
import BlogForm from "../components/BlogForm";

function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
     

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-x-hidden">
        <BlogForm />
      </main>

    </div>
  );
}

export default Dashboard;
