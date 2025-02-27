import { useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

const AuthImagePattern = ({ title, subtitle }) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div
      className="hidden lg:flex items-center justify-center p-12"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${i % 2 === 0 ? "animate-pulse" : ""}`}
              style={{ backgroundColor: "var(--primary-color)" }}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
