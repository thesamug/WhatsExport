import type { Contact } from '@/types';
import { MOCK_LABELS, MOCK_COUNTRY_CODES } from '@/types';

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const names = ["Alice Smith", "Bob Johnson", "Charlie Brown", "Diana Prince", "Edward Green", "Fiona Apple", "George Harrison", "Helen Troy", "Ivan Drago", "Julia Roberts", "Kevin Bacon", "Linda Hamilton", "Michael Jordan", "Nancy Drew", "Oliver Twist", "Patricia Arquette", "Quincy Jones", "Rachel Green", "Steven Spielberg", "Tina Turner"];
const phonePrefixes = ["555-010", "555-020", "555-030", "555-040", "555-050"];

export const mockContacts: Contact[] = Array.from({ length: 20 }, (_, i) => {
  const name = names[i % names.length];
  const country = MOCK_COUNTRY_CODES[(i % (MOCK_COUNTRY_CODES.length -1)) + 1]; // Avoid "All Countries"
  return {
    id: `contact_${i + 1}`,
    name: name,
    phoneNumber: `${phonePrefixes[i % phonePrefixes.length]}${i % 10}`,
    countryCode: country.value,
    labels: getRandomElements(MOCK_LABELS, Math.floor(Math.random() * 3) + 1), // 1 to 3 labels
    lastContacted: getRandomDate(new Date(2023, 0, 1), new Date()),
    avatarUrl: `https://placehold.co/40x40.png?text=${name.substring(0,1)}`,
  };
});
