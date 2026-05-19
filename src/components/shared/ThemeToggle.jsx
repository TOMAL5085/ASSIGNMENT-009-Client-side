import { Moon, SunMedium } from "lucide-react";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text)]"
    >
      {theme === "light" ? <Moon size={16} /> : <SunMedium size={16} />}
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
