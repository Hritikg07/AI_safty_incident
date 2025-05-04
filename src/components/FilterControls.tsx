'use client';

import React from 'react';
import { Severity, SortOrder } from '@/types/incident';

interface FilterControlsProps {
  selectedSeverity: Severity | 'All';
  sortOrder: SortOrder;
  onSeverityChange: (severity: Severity | 'All') => void;
  onSortOrderChange: (order: SortOrder) => void;
}

export default function FilterControls({
  selectedSeverity,
  sortOrder,
  onSeverityChange,
  onSortOrderChange
}: FilterControlsProps) {
  const severityOptions: (Severity | 'All')[] = ['All', 'Low', 'Medium', 'High'];

  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex-1">
          <label className="label">Filter by Severity</label>
          <div className="flex flex-wrap gap-2">
            {severityOptions.map(severity => (
              <button
                key={severity}
                onClick={() => onSeverityChange(severity)}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200 transform hover:scale-105 animate-scale-in
                  ${selectedSeverity === severity
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
              >
                {severity === 'All' ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    All Incidents
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {severity === 'High' && (
                      <svg className="h-4 w-4 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    {severity === 'Medium' && (
                      <svg className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {severity === 'Low' && (
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {severity}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <label className="label">Sort by Date</label>
          <div className="flex gap-2">
            <button
              onClick={() => onSortOrderChange('newest')}
              className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg
                text-sm font-medium transition-all duration-200 transform hover:scale-105 animate-scale-in
                ${sortOrder === 'newest'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              style={{ animationDelay: '0.1s' }}
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                Newest First
              </span>
            </button>
            <button
              onClick={() => onSortOrderChange('oldest')}
              className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg
                text-sm font-medium transition-all duration-200 transform hover:scale-105 animate-scale-in
                ${sortOrder === 'oldest'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              style={{ animationDelay: '0.2s' }}
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                Oldest First
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 