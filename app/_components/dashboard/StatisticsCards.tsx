import { Statistics } from '@/app/dashboard/types';

interface StatisticsCardsProps {
  statistics: Statistics;
}

interface StatCard {
  value: number;
  label: string;
  colorClass: string;
  borderClass: string;
}

export default function StatisticsCards({ statistics }: StatisticsCardsProps) {
  const statCards: StatCard[] = [
    {
      value: statistics.totalCount,
      label: '올해 총 사례',
      colorClass: 'text-gray-800',
      borderClass: 'border-r border-b lg:border-b-0 border-gray-300'
    },
    {
      value: statistics.thisMonthCount,
      label: '이번 달',
      colorClass: 'text-gray-800',
      borderClass: 'border-b lg:border-b-0 lg:border-r border-gray-300'
    },
    {
      value: statistics.dataBreachCount,
      label: '정보 유출',
      colorClass: 'text-red-600',
      borderClass: 'border-r lg:border-r border-gray-300'
    },
    {
      value: statistics.abuseCount,
      label: '약관 악용',
      colorClass: 'text-orange-600',
      borderClass: ''
    }
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <div key={index} className={`text-center py-6 md:py-8 ${card.borderClass}`}>
            <p className={`text-3xl md:text-4xl lg:text-5xl font-bold ${card.colorClass} mb-1 md:mb-2`}>
              {card.value}
              <span className={`text-lg md:text-xl lg:text-2xl ${card.colorClass}`}>건</span>
            </p>
            <p className="text-xs md:text-sm text-gray-600">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

