import { Button } from '@/components/ui/button';
import { UserCircle2, Settings2 } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="bg-card border-t p-3 flex items-center justify-between sticky bottom-0 z-10">
      <span className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} WhatsExport</span>
      <div className="flex items-center gap-2">
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
