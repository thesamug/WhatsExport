// src/components/InsightDisplay.tsx
'use client';

import { BarChart, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { DashboardInsights } from '@/types';
import { Users, MessageSquareText, Clock, UsersRound } from 'lucide-react';

interface InsightDisplayProps {
  insights: DashboardInsights | null;
  isLoading: boolean;
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export function InsightDisplay({ insights, isLoading }: InsightDisplayProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="shadow-md animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!insights) {
    return <p className="text-muted-foreground text-center py-8">Click "Generate Insights" to see your contact communication analysis.</p>;
  }
  
  const frequentContactsChartData = insights.frequentContacts.slice(0, 5).map(fc => ({ name: fc.name, count: fc.count }));
  const frequentContactsChartConfig = {
    count: {
      label: "Messages",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const topicBreakdownChartData = insights.topicBreakdown.slice(0, 5).map(tb => ({ name: tb.topic, value: tb.count }));
   const topicBreakdownChartConfig = {
    topics: {
      label: "Topics",
    },
    ...topicBreakdownChartData.reduce((acc, cur, idx) => {
      acc[cur.name] = { label: cur.name, color: COLORS[idx % COLORS.length] };
      return acc;
    }, {} as ChartConfig)
  } satisfies ChartConfig;


  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-primary" />Frequent Contacts</CardTitle>
          <CardDescription>Top 5 most contacted individuals.</CardDescription>
        </CardHeader>
        <CardContent>
          {frequentContactsChartData.length > 0 ? (
            <ChartContainer config={frequentContactsChartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={frequentContactsChartData} layout="vertical" margin={{ right: 20 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" dataKey="count" />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Legend />
                <Bar dataKey="count" fill="var(--color-count)" radius={4} />
              </BarChart>
            </ChartContainer>
          ) : <p className="text-muted-foreground">Not enough data.</p>}
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center"><MessageSquareText className="mr-2 h-5 w-5 text-primary" />Topic Breakdown</CardTitle>
          <CardDescription>Common themes in your conversations.</CardDescription>
        </CardHeader>
        <CardContent>
         {topicBreakdownChartData.length > 0 ? (
           <ChartContainer config={topicBreakdownChartConfig} className="mx-auto aspect-square max-h-[250px]">
              <RechartsPieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                <Pie data={topicBreakdownChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {topicBreakdownChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                 <Legend content={({ payload }) => (
                    <ul className="flex flex-wrap justify-center gap-2 mt-4">
                      {payload?.map((entry, index) => (
                        <li key={`item-${index}`} className="flex items-center text-xs">
                          <span style={{ backgroundColor: entry.color }} className="inline-block w-3 h-3 mr-1 rounded-sm"></span>
                          {entry.value} ({ (topicBreakdownChartData.find(d => d.name === entry.value)?.value || 0) })
                        </li>
                      ))}
                    </ul>
                  )} />
              </RechartsPieChart>
            </ChartContainer>
         ) : <p className="text-muted-foreground">Not enough data.</p>}
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center"><Clock className="mr-2 h-5 w-5 text-primary" />Average Response Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{insights.averageResponseTime || 'N/A'}</p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center"><UsersRound className="mr-2 h-5 w-5 text-primary" />Suggested Groups</CardTitle>
          <CardDescription>Potential contact groups based on patterns.</CardDescription>
        </CardHeader>
        <CardContent>
          {insights.suggestedGroups && insights.suggestedGroups.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {insights.suggestedGroups.map((group, index) => (
                <li key={index}>{group}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No group suggestions available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
