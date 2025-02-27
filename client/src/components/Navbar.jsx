import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed w-full top-0 z-40 backdrop-blur-lg shadow-md"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition duration-200">
              <div
                className="size-9 rounded-lg flex items-center justify-center shadow-sm"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors"
              style={{ backgroundColor: "var(--border-color)", color: "var(--text-color)" }}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <div className="flex items-center gap-3">
                <Link
                  to={"/profile"}
                  className="btn btn-sm gap-2"
                  style={{ backgroundColor: "var(--border-color)", color: "var(--text-color)" }}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-1 items-center hover:text-red-500 transition-colors"
                  style={{ color: "var(--text-color)" }}
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
