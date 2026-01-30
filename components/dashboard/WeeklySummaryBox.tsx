interface WeeklySummaryBoxProps {
  summary: string;
}

export default function WeeklySummaryBox({ summary }: WeeklySummaryBoxProps) {
  return (
    <div 
      className="mb-8 p-6 md:p-8 rounded-2xl"
      style={{ 
        backgroundColor: '#EFF8FF', 
        border: '2px solid #194268' 
      }}
    >
      <h2 
        className="text-base md:text-lg font-bold mb-4 md:mb-6"
        style={{ color: '#194268' }}
      >
        한 줄로 읽는 이번주
      </h2>
      <p className="text-gray-800 text-sm md:text-base leading-relaxed">
        {summary}
      </p>
    </div>
  );
}
