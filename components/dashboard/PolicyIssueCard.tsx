import { PolicyIssue } from '@/app/dashboard/types';

interface PolicyIssueCardProps {
  issue: PolicyIssue;
}

export default function PolicyIssueCard({ issue }: PolicyIssueCardProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-gray-300">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
        {issue.title}
      </h3>

      <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
        {issue.summary}
      </p>

      <hr className="my-4 border-gray-300" />

      <div className="flex flex-wrap justify-between items-center gap-2">
        <p className="text-xs md:text-sm text-gray-500">
          출처: {issue.source}
        </p>
        <a 
          href={issue.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 font-medium text-xs md:text-sm whitespace-nowrap"
        >
          자세히 보기 →
        </a>
      </div>
    </div>
  );
}
