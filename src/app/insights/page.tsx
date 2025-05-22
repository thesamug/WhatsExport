'use client';

import * as React from 'react';
import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { InsightDisplay } from '@/components/InsightDisplay';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getDashboardInsightsAction } from '@/lib/actions';
import type { DashboardInsights } from '@/types';
import { mockContacts } from '@/data/mockContacts'; // Using mock contacts to feed the AI
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


export default function InsightsPage() {
  const [insights, setInsights] = React.useState<DashboardInsights | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setInsights(null);
    // In a real scenario, you'd pass actual scanned/filtered contacts.
    // For this demo, we use mockContacts.
    if (mockContacts.length === 0) {
        toast({
            title: "No Contacts",
            description: "Cannot generate insights without contact data. Please 'Scan Contacts' on the main page first.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }
    const result = await getDashboardInsightsAction(mockContacts);
    setIsLoading(false);

    if ('error' in result) {
      toast({
        title: "Error Generating Insights",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setInsights(result);
      toast({
        title: "Insights Generated",
        description: "Successfully analyzed contact data.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div 
        className="max-w-3xl w-full mx-auto my-4 md:my-8 bg-card shadow-2xl rounded-lg overflow-hidden flex flex-col"
        style={{minHeight: '80vh', maxHeight: '95vh'}}
      >
        <header className="bg-card border-b p-4 flex items-center justify-between sticky top-0 z-10">
            <Button variant="ghost" size="icon" asChild aria-label="Back to Home">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Smart Insights Dashboard</h1>
            <div className="w-9"></div> {/* Spacer to balance the back button */}
        </header>

        <main className="flex-grow p-4 md:p-6 space-y-6 overflow-y-auto">
          <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-lg">Communication Analysis</CardTitle>
                <CardDescription>Discover patterns and insights from your WhatsApp contacts.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleGenerateInsights} disabled={isLoading} variant="primary" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isLoading ? 'Generating...' : 'Generate Insights'}
                </Button>
            </CardContent>
          </Card>
          
          <InsightDisplay insights={insights} isLoading={isLoading} />
        </main>
        <AppFooter />
      </div>
    </div>
  );
}
