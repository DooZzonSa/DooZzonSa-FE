export interface PolicyIssue {
  title: string;
  summary: string;
  source: string;
  issueType: '정보 유출' | '약관 악용' | 'DATA_BREACH' | 'POLICY_ABUSE';
  url: string;
}

export interface Statistics {
  totalCount: number;
  thisMonthCount: number;
  dataBreachCount: number;
  abuseCount: number;
}

export interface PolicyIssuesData {
  thisWeekSummary: string;
  policyIssues: PolicyIssue[];
  statistics: Statistics;
}
