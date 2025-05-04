export type Severity = 'Low' | 'Medium' | 'High';

export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: Severity;
  reportedAt: string;
}

export type SortOrder = 'newest' | 'oldest';

export interface NewIncidentFormData {
  title: string;
  description: string;
  severity: Severity;
} 