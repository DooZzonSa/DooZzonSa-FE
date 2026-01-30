export interface PolicyIssue {
  title: string;
  summary: string;
  source: string;
  issueType: string;
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
