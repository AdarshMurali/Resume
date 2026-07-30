import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext, type Theme } from "@/hooks/use-theme";

const STORAGE_KEY = "resume-theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
  });
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(getSystemTheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setSystemTheme(getSystemTheme());
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
