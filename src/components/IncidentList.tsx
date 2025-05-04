'use client';

import React from 'react';
import { Incident } from '@/types/incident';
import { format } from 'date-fns';

interface IncidentListProps {
  incidents: Incident[];
  expandedIncidentId: number | null;
  onToggleExpansion: (id: number) => void;
}

function getSeverityColor(severity: Incident['severity']) {
  switch (severity) {
    case 'High':
      return 'badge badge-high';
    case 'Medium':
      return 'badge badge-medium';
    case 'Low':
      return 'badge badge-low';
  }
}

export default function IncidentList({
  incidents,
  expandedIncidentId,
  onToggleExpansion
}: IncidentListProps) {
  if (incidents.length === 0) {
    return (
      <div className="text-center py-12 bg-secondary/50 rounded-lg border-2 border-dashed border-border animate-fade-in">
        <svg
          className="mx-auto h-12 w-12 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-foreground">No incidents found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          No incidents found matching the current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident, index) => (
        <div
          key={incident.id}
          className="card overflow-hidden animate-scale-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {incident.title}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {format(new Date(incident.reportedAt), 'MMM d, yyyy h:mm a')}
                  </span>
                  <span className={getSeverityColor(incident.severity)}>
                    {incident.severity}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onToggleExpansion(incident.id)}
                className="ml-4 text-sm font-medium text-primary hover:text-primary/80
                         flex items-center gap-1 transition-colors duration-200"
              >
                {expandedIncidentId === incident.id ? (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Hide Details
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    View Details
                  </>
                )}
              </button>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out
              ${expandedIncidentId === incident.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="border-t border-border mt-4 pt-4">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {incident.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 