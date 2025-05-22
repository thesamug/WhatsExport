'use client';

import * as React from 'react';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { ContactFilters } from '@/components/ContactFilters';
import { ContactList } from '@/components/ContactList';
import type { Contact, Filters } from '@/types';
import { mockContacts } from '@/data/mockContacts';
import { exportContactsToCSV } from '@/lib/csv';
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = React.useState<Contact[]>([]);
  const [filters, setFilters] = React.useState<Filters>({
    countryCode: '',
    labels: [],
    lastContactedDate: undefined,
  });
  const { toast } = useToast();

  const handleScanContacts = () => {
    // Simulate scanning contacts
    setContacts(mockContacts);
    setFilteredContacts(mockContacts); // Initially show all scanned contacts
    toast({
      title: "Contacts Scanned",
      description: `${mockContacts.length} contacts have been loaded.`,
    });
  };

  React.useEffect(() => {
    let currentContacts = [...contacts];

    if (filters.countryCode) {
      currentContacts = currentContacts.filter(c => c.countryCode === filters.countryCode);
    }

    if (filters.labels.length > 0) {
      currentContacts = currentContacts.filter(c => filters.labels.every(label => c.labels.includes(label)));
    }

    if (filters.lastContactedDate) {
      const filterDate = new Date(filters.lastContactedDate);
      filterDate.setHours(0, 0, 0, 0); // Normalize to start of day for comparison
      currentContacts = currentContacts.filter(c => {
        const contactDate = new Date(c.lastContacted);
        contactDate.setHours(0,0,0,0); // Normalize
        return contactDate.getTime() === filterDate.getTime();
      });
    }
    
    setFilteredContacts(currentContacts);
  }, [filters, contacts]);

  const handleExportCSV = () => {
    if (filteredContacts.length === 0) {
       toast({
        title: "No Contacts to Export",
        description: "There are no contacts matching the current filters.",
        variant: "destructive",
      });
      return;
    }
    exportContactsToCSV(filteredContacts);
    toast({
      title: "Export Successful",
      description: `${filteredContacts.length} contacts exported to CSV.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div 
        className="max-w-2xl w-full mx-auto my-4 md:my-8 bg-card shadow-2xl rounded-lg overflow-hidden flex flex-col"
        style={{minHeight: '80vh', maxHeight: '95vh'}}
      >
        <AppHeader onScanContacts={handleScanContacts} />
        <main className="flex-grow p-4 md:p-6 space-y-6 overflow-y-auto">
          <ContactFilters 
            filters={filters} 
            onFiltersChange={setFilters} 
            onExport={handleExportCSV}
            contactCount={filteredContacts.length}
          />
          <ContactList contacts={filteredContacts} />
        </main>
        <AppFooter />
      </div>
    </div>
  );
}
