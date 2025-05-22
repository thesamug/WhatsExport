import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScanLine, LogIn, Briefcase } from 'lucide-react';

interface AppHeaderProps {
  onScanContacts?: () => void;
}

export function AppHeader({ onScanContacts }: AppHeaderProps) {
  return (
    <header className="bg-card border-b p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Briefcase className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-semibold text-foreground">WhatsExport</h1>
      </div>
      <div className="flex items-center gap-2">
        {onScanContacts && (
          <Button variant="ghost" size="sm" onClick={onScanContacts} aria-label="Scan Contacts">
            <ScanLine className="h-4 w-4 mr-1" />
            Scan
          </Button>
        )}
        <Button variant="outline" size="sm" aria-label="Login">
          <LogIn className="h-4 w-4 mr-1" />
          Login
        </Button>
      </div>
    </header>
  );
}
