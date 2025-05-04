'use client';

import { useState } from 'react';
import { Incident, Severity } from '@/types/incident';

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id' | 'reportedAt'>) => void;
}

export default function IncidentForm({ onSubmit }: IncidentFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium' as Severity
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        onSubmit(formData);
        setFormData({
          title: '',
          description: '',
          severity: 'Medium'
        });
        setErrors({});
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-lg animate-fade-in">
          Incident reported successfully!
        </div>
      )}

      <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
        <label htmlFor="title" className="label">
          Title
          <span className="text-destructive ml-1">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className={`input-field ${errors.title ? 'border-destructive' : ''}`}
          placeholder="Brief description of the incident"
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-destructive animate-slide-in">
            {errors.title}
          </p>
        )}
      </div>

      <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
        <label htmlFor="severity" className="label">
          Severity Level
          <span className="text-destructive ml-1">*</span>
        </label>
        <select
          id="severity"
          value={formData.severity}
          onChange={e => setFormData(prev => ({ ...prev, severity: e.target.value as Severity }))}
          className="input-field"
          disabled={isSubmitting}
        >
          <option value="Low">Low - Minor Issue</option>
          <option value="Medium">Medium - Significant Concern</option>
          <option value="High">High - Critical Problem</option>
        </select>
      </div>

      <div className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
        <label htmlFor="description" className="label">
          Detailed Description
          <span className="text-destructive ml-1">*</span>
        </label>
        <textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className={`input-field ${errors.description ? 'border-destructive' : ''}`}
          placeholder="Provide a detailed description of the incident, including any relevant context or impact..."
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-destructive animate-slide-in">
            {errors.description}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`button-primary w-full flex items-center justify-center gap-2
          ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Submitting...
          </>
        ) : (
          'Submit Incident Report'
        )}
      </button>
    </form>
  );
} 