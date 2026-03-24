import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/common/ThemeProvider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full absolute top-4 right-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800"
        >
            {theme === 'dark' ? (
                <Sun className="h-[1.2rem] w-[1.2rem] text-zinc-100" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] text-zinc-900" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
