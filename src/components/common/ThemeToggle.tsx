import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center gap-1 rounded-md border border-border bg-card p-1"
    >
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          title={label}
          onClick={() => setTheme(value)}
          className={cn(
            "inline-flex h-7 w-7 items-center justify-center rounded transition-colors",
            theme === value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
