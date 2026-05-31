export type Theme = "light" | "dark";

export function getInitialTheme(): Theme {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
  }
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("theme", theme);
  }
}

export function toggleTheme(current: Theme): Theme {
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
  return next;
}
