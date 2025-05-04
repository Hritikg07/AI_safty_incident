import { Incident } from '@/types/incident';

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics in job recommendations, leading to potential discrimination issues. Initial investigation suggests training data imbalance.",
    severity: "Medium",
    reportedAt: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information in an industrial setting. No immediate harm but highlighted need for better fact-checking mechanisms.",
    severity: "High",
    reportedAt: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata during conversation. Issue was caught early and fixed within maintenance window.",
    severity: "Low",
    reportedAt: "2025-03-20T09:15:00Z"
  },
  {
    id: 4,
    title: "AI Model Performance Degradation",
    description: "Gradual decline in model accuracy observed over two weeks. Root cause identified as concept drift in production data.",
    severity: "Medium",
    reportedAt: "2025-03-25T16:45:00Z"
  },
  {
    id: 5,
    title: "Unauthorized Model Access Attempt",
    description: "Multiple failed attempts to access model API endpoints detected. Security measures prevented any breach.",
    severity: "High",
    reportedAt: "2025-03-28T08:20:00Z"
  }
]; 