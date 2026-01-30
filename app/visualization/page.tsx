'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PolicyItem, SortType } from './types';
import { 
  API_BASE_URL, 
  RISK_COLORS, 
  RISK_LEVELS, 
  RISK_DESCRIPTIONS, 
  PRIVACY_TIPS 
} from './constants';

export default function VisualizationPage() {
  const [statistics, setStatistics] = useState<PolicyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    '낮음': false,
    '중간': false,
    '높음': false,
    'tips': false,
  });
  const [sortBy, setSortBy] = useState<SortType>('name');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/statistics`);
        
        if (!response.ok) {
          throw new Error('통계 데이터를 불러오는데 실패했습니다');
        }

        const result = await response.json();
        
        if (result.data?.policyItems && Array.isArray(result.data.policyItems)) {
          setStatistics(result.data.policyItems);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const toggleSection = (level: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [level]: !prev[level],
    }));
  };

  const getItemsByRiskLevel = useMemo(() => {
    return (level: string) => statistics.filter(item => item.riskLevel === level);
  }, [statistics]);

  const sortedStatistics = useMemo(() => {
    return [...statistics].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'ko');
        case 'rate-asc':
          return a.averageCollectionRate - b.averageCollectionRate;
        case 'rate-desc':
          return b.averageCollectionRate - a.averageCollectionRate;
        default:
          return 0;
      }
    });
  }, [statistics, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#506FB2]"></div>
          <p className="mt-4 text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {!loading && (
          <>
            {/* 헤더 */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                약관 내용 수집 통계
              </h1>
              <p className="text-gray-600 text-lg">
                타 기관 개인정보 약관 데이터를 바탕으로 평균적으로 어떤 약관들이 수집되는지 한 눈에 비교해보세요
              </p>
            </div>

        {/* 위험도별 해석 가이드 */}
        <div className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">위험도별 해석 가이드</h2>
          
          {RISK_LEVELS.map((level) => {
            const items = getItemsByRiskLevel(level);
            const colors = RISK_COLORS[level];
            const isExpanded = expandedSections[level];
            
            return (
              <div key={level} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* 토글 헤더 */}
                <button
                  onClick={() => toggleSection(level)}
                  className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50"
                  style={{ backgroundColor: colors.lightBg }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="px-4 py-1 rounded-full text-sm font-bold"
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text,
                      }}
                    >
                      {level}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {items.length}개 항목
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {/* 펼쳐지는 내용 */}
                {isExpanded && (
                  <div className="bg-white p-6 space-y-4">
                    <p className="text-gray-600 text-sm mb-4">
                      {RISK_DESCRIPTIONS[level]}
                    </p>

                    {/* 항목 그리드 - 더 작은 박스, 자동 줄바꿈 */}
                    <div className="flex flex-wrap gap-2">
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap"
                          style={{
                            backgroundColor: colors.lightBg,
                            color: colors.bg,
                          }}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* 개인정보 보호 팁 섹션 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* 토글 헤더 */}
            <button
              onClick={() => toggleSection('tips')}
              className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 bg-blue-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-blue-600 text-xl">ℹ️</span>
                <span className="text-lg font-semibold text-gray-900">
                  개인정보 보호 팁
                </span>
              </div>
              {expandedSections['tips'] ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* 펼쳐지는 내용 */}
            {expandedSections['tips'] && (
              <div className="bg-white p-6">
                <ol className="space-y-3 list-decimal list-inside">
                  {PRIVACY_TIPS.map((tip, index) => (
                    <li key={index} className="text-gray-700 text-sm leading-relaxed">
                      {tip}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-300 my-12"></div>

        {/* 수집 통계 비율 섹션 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">수집 통계 비율</h2>
            
            {/* 정렬 옵션 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">정렬:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#506FB2] focus:border-transparent"
              >
                <option value="name">이름순</option>
                <option value="rate-desc">비율 높은순</option>
                <option value="rate-asc">비율 낮은순</option>
              </select>
            </div>
          </div>
          
          {/* 평균 수집률과 범례 */}
          <div className="flex items-center justify-between mb-8">
            {/* 왼쪽: 평균 수집률 레이블과 차트 바 */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">평균 수집률</span>
              <div className="w-12 h-3 bg-[#506FB2] rounded-[10px]"></div>
            </div>
            
            {/* 오른쪽: 범례 */}
            <div className="flex items-center gap-6">
              {Object.entries(RISK_COLORS).map(([level, colors]) => (
                <div key={level} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.bg }}
                  ></div>
                  <span className="text-sm text-gray-600">{level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 통계 카드 목록 */}
        <div className="space-y-6">
          {sortedStatistics.map((stat, index) => {
            const colors = RISK_COLORS[stat.riskLevel] || RISK_COLORS['낮음'];
            
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {stat.name}
                  </h3>
                  <span
                    className="px-4 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${colors.bg}20`,
                      color: colors.bg,
                    }}
                  >
                    {stat.riskLevel}
                  </span>
                </div>

                {/* 프로그레스 바 */}
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-4 bg-gray-200 rounded-[10px] overflow-hidden">
                    <div
                      className="h-full bg-[#506FB2] rounded-[10px] transition-all duration-500"
                      style={{ width: `${stat.averageCollectionRate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 min-w-[45px] text-right">
                    {stat.averageCollectionRate}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
          </>
        )}
      </div>
    </div>
  );
}
