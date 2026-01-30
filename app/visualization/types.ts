export interface PolicyItem {
  name: string;
  averageCollectionRate: number;
  riskLevel: string;
}

export interface StatisticsData {
  policyItems: PolicyItem[];
}

export interface ApiResponse {
  status: number;
  message: string;
  data: StatisticsData;
}

export type SortType = 'name' | 'rate-asc' | 'rate-desc';

export interface RiskColor {
  bg: string;
  text: string;
  lightBg: string;
}
