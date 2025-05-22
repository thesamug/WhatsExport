'use client';

import { Button } from '@/components/ui/button';
import { UserCircle2, Settings2, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import React from 'react';

export function AppFooter() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Placeholder for theme toggle button to prevent hydration mismatch
  // The actual button will render once the component is mounted on the client.
  const themeToggleButton = mounted ? (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  ) : (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </Button>
  );


  return (
    <footer className="bg-card border-t p-3 flex items-center justify-between sticky bottom-0 z-10">
      <span className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} WhatsExport</span>
      <div className="flex items-center gap-2">
        {themeToggleButton}
        <Button variant="ghost" size="icon" aria-label="Account">
          <UserCircle2 className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings2 className="h-5 w-5" />
        </Button>
      </div>
    </footer>
  );
}
