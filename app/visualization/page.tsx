'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PolicyItem {
  name: string;
  averageCollectionRate: number;
  riskLevel: string;
}

// 더미 데이터
const dummyData: PolicyItem[] = [
  { name: '실명', averageCollectionRate: 18, riskLevel: '높음' },
  { name: '전화번호', averageCollectionRate: 40, riskLevel: '중간' },
  { name: '성별', averageCollectionRate: 60, riskLevel: '낮음' },
  { name: '이메일', averageCollectionRate: 75, riskLevel: '낮음' },
  { name: '주소', averageCollectionRate: 35, riskLevel: '중간' },
  { name: '생년월일', averageCollectionRate: 55, riskLevel: '낮음' },
  { name: '건강정보', averageCollectionRate: 15, riskLevel: '높음' },
  { name: '결제 정보', averageCollectionRate: 20, riskLevel: '높음' },
  { name: '위치 정보', averageCollectionRate: 25, riskLevel: '높음' },
];

// 위험도별 색상 매핑
const riskColors: Record<string, { bg: string; text: string; lightBg: string }> = {
  '높음': { bg: '#EF4444', text: '#FFFFFF', lightBg: '#FEE2E2' },
  '중간': { bg: '#F97316', text: '#FFFFFF', lightBg: '#FFEDD5' },
  '낮음': { bg: '#22C55E', text: '#FFFFFF', lightBg: '#DCFCE7' },
};

const riskLevels = ['낮음', '중간', '높음'];

// 개인정보 보호 팁
const privacyTips = [
  '필수가 아닌 항목은 입력하지 않기 - 많은 개인정보 수집 요청은 선택 사항입니다',
  '제3자 공유 정책 확인 - 약관의 "정보 공유" 섹션을 주의해 읽어보세요',
  '정한 보안 점검 - 유출로 보호되어 있어 안전한 소인지 확인하세요, 위치 등을 정기적으로 확인하세요',
  '추가적 데이터 삭제 요청 - 대부분의 서비스는 개인정보 삭제를 지원합니다',
];

/**
 * Renders a client-side visualization page that displays privacy-related policy collection statistics, risk-level interpretation guides, collapsible privacy tips, and sortable statistic cards with progress bars.
 *
 * Fetches statistics from `/api/v1/statisticsa` on mount; if the fetch fails the component continues to display initialized dummy data and surfaces an error message.
 *
 * @returns A JSX element representing the visualization page UI
 */
export default function VisualizationPage() {
  const [statistics, setStatistics] = useState<PolicyItem[]>(dummyData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    '낮음': false,
    '중간': false,
    '높음': false,
    'tips': false,
  });
  const [sortBy, setSortBy] = useState<'name' | 'rate-asc' | 'rate-desc'>('name');

  // 백엔드 API 연동
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/v1/statisticsa');
        
        if (!response.ok) {
          console.warn('API 호출 실패, 더미 데이터 사용');
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.policyItems && Array.isArray(data.policyItems)) {
          setStatistics(data.policyItems);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to fetch statistics:', err);
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

  const getItemsByRiskLevel = (level: string) => {
    return statistics.filter(item => item.riskLevel === level);
  };

  // 정렬된 통계 데이터
  const sortedStatistics = [...statistics].sort((a, b) => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* 로딩 상태 */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#506FB2]"></div>
            <p className="mt-4 text-gray-600">데이터를 불러오는 중...</p>
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

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
          
          {riskLevels.map((level) => {
            const items = getItemsByRiskLevel(level);
            const colors = riskColors[level];
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
                    {/* 설명 텍스트 */}
                    <p className="text-gray-600 text-sm mb-4">
                      {level === '낮음' && '필수적인 기본 정보로, 거의 모든 서비스에서 요구하는 항목들입니다. 예외적 정보의 수집은 서비스 제공을 위해 필수적입니다.'}
                      {level === '중간' && '개인의 서비스나 특정 기능을 위해 요구되는 정보입니다. 이 항목들의 이용은 사용하는지, 제3자와 공유되는지 확인이 필요합니다.'}
                      {level === '높음' && '매우 민감한 개인 정보입니다. 이들은 신체 도용, 사기, 개인정보 악용의 위험이 높습니다. 반드시 필요한 경우에만 제공하고, 제3자 공유 정책에 특히 주의해야 합니다.'}
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
                  {privacyTips.map((tip, index) => (
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
                onChange={(e) => setSortBy(e.target.value as any)}
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
              {Object.entries(riskColors).map(([level, colors]) => (
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
            const colors = riskColors[stat.riskLevel] || riskColors['낮음'];
            
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