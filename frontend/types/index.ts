export type TabType = 'prediction' | 'simulator' | 'analytics' | 'science' | 'about';
export type ThemeMode = 'dark' | 'light';

export interface PredictionInput {
  student_name: string;
  standard: string;
  G1: number;
  G2: number;
  studytime: number;
  failures: number;
  schoolsup: 'yes' | 'no';
  famsup: 'yes' | 'no';
  internet: 'yes' | 'no';
  higher: 'yes' | 'no';
  goout: number;
  freetime: number;
  health: number;
  absences: number;
}

export interface RecommendationItem {
  title: string;
  detail: string;
  category: 'study' | 'attendance' | 'health' | 'lifestyle' | 'support' | 'general';
}

export interface FeatureFactor {
  feature: string;
  feature_name_gu: string;
  value: string | number;
  importance_pct: number;
  status: 'strength' | 'neutral' | 'attention';
  description_gu: string;
}

export interface PredictionResponse {
  id: string;
  student_name: string;
  standard: string;
  predicted_score: number;
  percentage: number;
  risk_level: 'high' | 'moderate' | 'good' | 'excellent';
  risk_label_gu: string;
  risk_status_gu: string;
  risk_tone_gu: string;
  risk_class: string;
  inputs: PredictionInput;
  recommendations: RecommendationItem[];
  factors: FeatureFactor[];
  model_version: string;
  created_at: string;
}

export interface DistributionBin {
  range_label: string;
  count: number;
  percentage: number;
}

export interface GroupAverage {
  category: string;
  avg_score: number;
  count: number;
}

export interface AnalyticsData {
  total_students: number;
  average_score: number;
  pass_rate: number;
  high_performers_count: number;
  needing_attention_count: number;
  average_attendance_rate: number;
  average_study_hours: number;
  score_distribution: DistributionBin[];
  study_time_vs_score: GroupAverage[];
  absences_vs_score: GroupAverage[];
}

export interface ModelInfo {
  model_name: string;
  algorithm: string;
  r2_score: number;
  mae: number;
  features: string[];
  feature_importances: {
    feature: string;
    feature_name_gu: string;
    importance_pct: number;
  }[];
  school_name: string;
  mentor_name: string;
  subtitle: string;
}
