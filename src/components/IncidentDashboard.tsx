'use client';

import { useState } from 'react';
import { Incident, Severity, SortOrder } from '@/types/incident';
import { mockIncidents } from '@/data/mockIncidents';
import IncidentList from './IncidentList';
import IncidentForm from './IncidentForm';
import FilterControls from './FilterControls';
import ThemeToggle from './ThemeToggle';

export default function IncidentDashboard() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [expandedIncidentId, setExpandedIncidentId] = useState<number | null>(null);

  const filteredAndSortedIncidents = incidents
    .filter(incident => selectedSeverity === 'All' || incident.severity === selectedSeverity)
    .sort((a, b) => {
      const dateA = new Date(a.reportedAt).getTime();
      const dateB = new Date(b.reportedAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const handleAddIncident = (newIncident: Omit<Incident, 'id' | 'reportedAt'>) => {
    const incident: Incident = {
      ...newIncident,
      id: Math.max(...incidents.map(i => i.id)) + 1,
      reportedAt: new Date().toISOString()
    };
    setIncidents(prev => [...prev, incident]);
  };

  const toggleIncidentExpansion = (id: number) => {
    setExpandedIncidentId(currentId => currentId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <ThemeToggle />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Safety Incident Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track, manage, and report AI safety incidents in real-time. Help maintain transparency and accountability.
          </p>
        </div>

        <div className="mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <FilterControls
            selectedSeverity={selectedSeverity}
            sortOrder={sortOrder}
            onSeverityChange={setSelectedSeverity}
            onSortOrderChange={setSortOrder}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Reported Incidents
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {filteredAndSortedIncidents.length} incidents found
                  </div>
                </div>
                <IncidentList
                  incidents={filteredAndSortedIncidents}
                  expandedIncidentId={expandedIncidentId}
                  onToggleExpansion={toggleIncidentExpansion}
                />
              </div>
            </div>
          </div>

          <div className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <div className="card">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Report New Incident
                </h2>
                <IncidentForm onSubmit={handleAddIncident} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 