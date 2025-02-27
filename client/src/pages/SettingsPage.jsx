import { useEffect } from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const { deleteAccount, authUser } = useAuthStore();
  const navigate = useNavigate();

  // Apply selected theme to <html> tag dynamically
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-gray-500">
            Choose a theme for your chat interface
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors 
                ${
                  theme === t
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-blue-500"></div>
                  <div className="rounded bg-green-500"></div>
                  <div className="rounded bg-yellow-500"></div>
                  <div className="rounded bg-gray-500"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div
          className="rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden shadow-lg"
          style={{
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
          }}
        >
          <div className="p-4 ">
            <div className="max-w-lg mx-auto">
              <div
                className="rounded-xl shadow-sm overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-color)",
                  color: "var(--text-color)",
                }}
              >
                <div
                  className="px-4 py-3 border-b border-gray-300 dark:border-gray-700"
                  style={{ backgroundColor: "var(--bg-color)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs">Online</p>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto"
                  style={{ backgroundColor: "var(--bg-color)" }}
                >
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className="max-w-[80%] rounded-xl p-3 shadow-sm"
                        style={{
                          backgroundColor: message.isSent
                            ? "var(--primary-color)"
                            : "var(--secondary-color)",
                          color: message.isSent
                            ? "#ffffff"
                            : "var(--text-color)",
                        }}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-[10px] mt-1.5 opacity-70">
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="p-4 border-t border-gray-300 dark:border-gray-700"
                  style={{ backgroundColor: "var(--bg-color)" }}
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 text-sm h-10 border border-gray-300 dark:border-gray-700 rounded-lg px-3"
                      style={{
                        backgroundColor: "var(--bg-color)",
                        color: "var(--text-color)",
                      }}
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="bg-blue-500 text-white px-4 h-10 rounded-lg flex items-center justify-center">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {authUser ? (
            <button
              className="px-4 py-2.5 rounded-lg border"
              style={{
                backgroundColor: "var(--text-color)",
                borderColor: "var(--accent-color)",
                color: "var(--bg-color)",
              }}
              onClick={deleteAccount}
            >
              Delete Account
            </button>
          ) : (
            <button
              className="px-4 py-2.5 rounded-lg border"
              style={{
                backgroundColor: "var(--text-color)",
                borderColor: "var(--accent-color)",
                color: "var(--bg-color)",
              }}
              onClick={() => navigate("/")}
            >
              Login Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
