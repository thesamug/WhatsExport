'use server';

/**
 * @fileOverview Generates insights for a WhatsApp contact communication dashboard.
 *
 * - generateInsightsDashboard - A function that generates insights for the dashboard.
 * - GenerateInsightsDashboardInput - The input type for the generateInsightsDashboard function.
 * - GenerateInsightsDashboardOutput - The return type for the generateInsightsDashboard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsightsDashboardInputSchema = z.object({
  contactData: z
    .string()
    .describe('A string containing the contact data to analyze.'),
});

export type GenerateInsightsDashboardInput = z.infer<
  typeof GenerateInsightsDashboardInputSchema
>;

const GenerateInsightsDashboardOutputSchema = z.object({
  frequentContacts: z
    .array(z.object({name: z.string(), count: z.number()}))
    .describe('Most frequently contacted users.'),
  averageResponseTime: z
    .string()
    .describe('Average response time to contacts.'),
  topicBreakdown: z
    .array(z.object({topic: z.string(), count: z.number()}))
    .describe('Breakdown of topics discussed with contacts.'),
  suggestedGroups: z
    .array(z.string())
    .describe('Suggested contact groups based on communication patterns.'),
});

export type GenerateInsightsDashboardOutput = z.infer<
  typeof GenerateInsightsDashboardOutputSchema
>;

export async function generateInsightsDashboard(
  input: GenerateInsightsDashboardInput
): Promise<GenerateInsightsDashboardOutput> {
  return generateInsightsDashboardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInsightsDashboardPrompt',
  input: {schema: GenerateInsightsDashboardInputSchema},
  output: {schema: GenerateInsightsDashboardOutputSchema},
  prompt: `You are an AI assistant that analyzes WhatsApp contact data and generates insights for a dashboard.

  Analyze the following contact data:
  {{contactData}}

  Based on this data, generate the following insights:
  - Most frequently contacted users (frequentContacts).
  - Average response time to contacts (averageResponseTime).
  - Breakdown of topics discussed with contacts (topicBreakdown).
  - Suggested contact groups based on communication patterns (suggestedGroups).

  Return the insights in the following JSON format:
  {
    "frequentContacts": [{"name": "string", "count": number}],
    "averageResponseTime": "string",
    "topicBreakdown": [{"topic": "string", "count": number}],
    "suggestedGroups": ["string"]
  }`,
});

const generateInsightsDashboardFlow = ai.defineFlow(
  {
    name: 'generateInsightsDashboardFlow',
    inputSchema: GenerateInsightsDashboardInputSchema,
    outputSchema: GenerateInsightsDashboardOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
