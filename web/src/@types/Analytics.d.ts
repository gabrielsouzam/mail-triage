export interface AnalyticsStats {
  total_analyses: number;
  productive_count: number;
  unproductive_count: number;
  productive_rate: number;
  avg_processing_time_ms: number;
  today_count: number;
}

export interface RecentAnalysis {
  id: number;
  preview: string;
  category: 'productive' | 'unproductive';
  created_at: string;
}
