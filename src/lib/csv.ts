import type { Contact } from '@/types';

export function exportContactsToCSV(contacts: Contact[], filename: string = 'whatsexport_contacts.csv'): void {
  if (contacts.length === 0) {
    alert('No contacts to export.');
    return;
  }

  const headers = ['ID', 'Name', 'Phone Number', 'Country Code', 'Labels', 'Last Contacted'];
  const rows = contacts.map(contact => [
    contact.id,
    contact.name,
    contact.phoneNumber,
    contact.countryCode,
    contact.labels.join(', '),
    contact.lastContacted.toLocaleDateString(),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    alert('CSV export is not supported in your browser.');
  }
}
