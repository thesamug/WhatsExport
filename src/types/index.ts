import type { GenerateInsightsDashboardOutput } from '@/ai/flows/generate-insights-dashboard';

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  countryCode: string;
  labels: string[];
  lastContacted: Date;
  avatarUrl?: string;
}

export interface Filters {
  countryCode: string;
  labels: string[];
  lastContactedDate: Date | undefined;
}

export const MOCK_LABELS = ["Work", "Friends", "Family", "Important", "Leads", "New"];

export const MOCK_COUNTRY_CODES = [
  { label: "All Countries", value: "__ALL__" }, // Changed value from "" to "__ALL__"
  { label: "USA (+1)", value: "+1" },
  { label: "UK (+44)", value: "+44" },
  { label: "India (+91)", value: "+91" },
  { label: "Germany (+49)", value: "+49" },
  { label: "Brazil (+55)", value: "+55" },
];

export type DashboardInsights = GenerateInsightsDashboardOutput;
