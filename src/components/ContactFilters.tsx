'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarDays, Filter, Tags, Globe, Download, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { Filters } from '@/types';
import { MOCK_COUNTRY_CODES, MOCK_LABELS } from '@/types';

interface ContactFiltersProps {
  filters: Filters;
  onFiltersChange: (newFilters: Filters) => void;
  onExport: () => void;
  contactCount: number;
}

export function ContactFilters({ filters, onFiltersChange, onExport, contactCount }: ContactFiltersProps) {
  const [selectedLabels, setSelectedLabels] = React.useState<string[]>(filters.labels);

  const handleLabelChange = (label: string) => {
    const newLabels = selectedLabels.includes(label)
      ? selectedLabels.filter(l => l !== label)
      : [...selectedLabels, label];
    setSelectedLabels(newLabels);
    onFiltersChange({ ...filters, labels: newLabels });
  };
  
  const handleDateChange = (date: Date | undefined) => {
    onFiltersChange({ ...filters, lastContactedDate: date });
  };

  const handleCountryChange = (value: string) => {
    // Convert special "__ALL__" value back to empty string for filter logic
    const actualValue = value === "__ALL__" ? "" : value;
    onFiltersChange({ ...filters, countryCode: actualValue });
  };

  const clearFilters = () => {
    setSelectedLabels([]);
    onFiltersChange({
      countryCode: '',
      labels: [],
      lastContactedDate: undefined,
    });
  };

  const activeFilterCount = [
    filters.countryCode,
    filters.labels.length > 0,
    filters.lastContactedDate,
  ].filter(Boolean).length;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Filter className="mr-2 h-5 w-5 text-primary" />
          Filter Contacts
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">{activeFilterCount} Active</Badge>
          )}
        </CardTitle>
        <CardDescription>Refine your contact list based on specific criteria.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <Label htmlFor="countryCode" className="flex items-center mb-1">
              <Globe className="mr-2 h-4 w-4 text-muted-foreground" /> Country Code
            </Label>
            <Select value={filters.countryCode === "" ? "__ALL__" : filters.countryCode} onValueChange={handleCountryChange}>
              <SelectTrigger id="countryCode">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_COUNTRY_CODES.map(country => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="flex items-center mb-1">
              <Tags className="mr-2 h-4 w-4 text-muted-foreground" /> Labels
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start font-normal">
                  {selectedLabels.length > 0 ? `${selectedLabels.length} selected` : "Select labels"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
                  {MOCK_LABELS.map(label => (
                    <div key={label} className="flex items-center space-x-2">
                      <Checkbox
                        id={`label-${label}`}
                        checked={selectedLabels.includes(label)}
                        onCheckedChange={() => handleLabelChange(label)}
                      />
                      <Label htmlFor={`label-${label}`} className="font-normal">{label}</Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div>
            <Label htmlFor="lastContactedDate" className="flex items-center mb-1">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Last Contacted Date
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                <Button
                    id="lastContactedDate"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                >
                    {filters.lastContactedDate ? format(filters.lastContactedDate, 'PPP') : <span>Pick a date</span>}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={filters.lastContactedDate}
                    onSelect={handleDateChange}
                    initialFocus
                />
                </PopoverContent>
            </Popover>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
            <XCircle className="mr-2 h-4 w-4" />
            Clear Filters
        </Button>
        <Button onClick={onExport} variant="accent" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
          <Download className="mr-2 h-4 w-4" />
          Export ({contactCount}) CSV
        </Button>
      </CardFooter>
    </Card>
  );
}

// Need to import Card components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
