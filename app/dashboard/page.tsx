'use client';

import { useEffect, useState, useMemo } from 'react';
import WeeklySummaryBox from '@/app/_components/dashboard/WeeklySummaryBox';
import StatisticsCards from '@/app/_components/dashboard/StatisticsCards';
import PolicyIssueCard from '@/app/_components/dashboard/PolicyIssueCard';
import { PolicyIssuesData } from './types';

type FilterType = '전체' | '정보 유출' | '약관 악용';

const FILTERS: FilterType[] = ['전체', '정보 유출', '약관 악용'];
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.0.50:8081';

export default function DashboardPage() {
  const [data, setData] = useState<PolicyIssuesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('전체');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicyIssues = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/policy-issues`);
        
        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다');
        }
        
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러올 수 없습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyIssues();
  }, []);

  const filteredIssues = useMemo(() => {
    if (!data) return [];
    
    return activeFilter === '전체' 
      ? data.policyIssues 
      : data.policyIssues.filter(issue => issue.issueType === activeFilter);
  }, [data, activeFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">로딩 중...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600 text-lg">{error || '데이터를 불러올 수 없습니다'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            약관 이슈 대시보드
          </h1>
          <p className="text-gray-600 text-lg">
            최근 발생한 개인정보 유출 및 약관 악용 사례를 확인하세요
          </p>
        </header>

        <WeeklySummaryBox summary={data.thisWeekSummary} />
        <StatisticsCards statistics={data.statistics} />

        <div className="flex gap-3 mb-6">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-[#2C3E50] text-white shadow-md'
                  : 'bg-[#E8F4F8] text-gray-700 hover:bg-[#D0E8F0]'
              }`}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue, index) => (
              <PolicyIssueCard key={`${issue.title}-${index}`} issue={issue} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              해당 필터에 맞는 이슈가 없습니다
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
