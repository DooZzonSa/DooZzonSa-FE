'use client';

import { useEffect, useState } from 'react';
import WeeklySummaryBox from '@/app/_components/dashboard/WeeklySummaryBox';
import StatisticsCards from '@/app/_components/dashboard/StatisticsCards';
import PolicyIssueCard from '@/app/_components/dashboard/PolicyIssueCard';
import { PolicyIssuesData } from './types';
import { DUMMY_DATA } from './constants';

export default function DashboardPage() {
  const [data, setData] = useState<PolicyIssuesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/policy-issues');
        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다');
        }
        const result = await response.json();
        // API 응답에서 data 필드 추출
        setData(result.data);
      } catch (err) {
        console.warn('API 호출 실패, 더미 데이터 사용:', err);
        setData(DUMMY_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-red-600">데이터를 불러올 수 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          약관 이슈 대시보드
        </h1>
        
        <p className="text-gray-600 text-lg mb-12 text-center">
          최근 발생한 개인정보 유출 및 약관 악용 사례를 확인하세요
        </p>

        <WeeklySummaryBox summary={data.thisWeekSummary} />
        <StatisticsCards statistics={data.statistics} />

        <div className="space-y-4">
          {data.policyIssues.map((issue, index) => (
            <PolicyIssueCard key={index} issue={issue} />
          ))}
        </div>
      </div>
    </div>
  );
}
