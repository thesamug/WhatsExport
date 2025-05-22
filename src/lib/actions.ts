'use server';

import { generateInsightsDashboard } from '@/ai/flows/generate-insights-dashboard';
import type { GenerateInsightsDashboardInput, GenerateInsightsDashboardOutput } from '@/ai/flows/generate-insights-dashboard';
import type { Contact } from '@/types';

export async function getDashboardInsightsAction(
  contacts: Contact[]
): Promise<GenerateInsightsDashboardOutput | { error: string }> {
  if (!contacts || contacts.length === 0) {
    return { error: 'No contact data provided to generate insights.' };
  }

  // Prepare a simplified string representation of contact data for the AI
  // This can be customized based on what aspects of contacts are most relevant for insights
  const contactDataSummary = contacts.map(c => ({
    name: c.name,
    labels: c.labels,
    country: c.countryCode,
    lastContacted: c.lastContacted.toISOString().split('T')[0], // YYYY-MM-DD format
  }));
  
  const input: GenerateInsightsDashboardInput = {
    contactData: `User has ${contacts.length} contacts. Here's a sample of their data (name, labels, country, lastContacted):\n${JSON.stringify(contactDataSummary.slice(0, 10))}\nAnalyze communication patterns, frequent contacts, topics, and suggest groups.`,
  };

  try {
    const insights = await generateInsightsDashboard(input);
    return insights;
  } catch (error) {
    console.error('Error generating insights:', error);
    return { error: 'Failed to generate insights. Please try again.' };
  }
}
