import { TriangleAlert } from "lucide-react";
import PrimaryButton from "@/app/_components/common/buttons/PrimaryButton";
import type { PolicyAnalyzeResponse } from "@/app/_api/policy";
const getProgressColor = (rate: number) =>
  rate <= 25 ? "bg-[#EF4444]" : "bg-[#60A5FA]";

type CompleteScreenProps = {
  onComplete: () => void;
  data: PolicyAnalyzeResponse["data"];
};

export default function CompleteScreen({ onComplete, data }: CompleteScreenProps) {

  return (
    <div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 md:flex-row md:gap-8 md:px-6">
        <section className="flex h-[460px] flex-1 flex-col bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)] md:h-[520px] md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-1">
              <span className="h-5 w-2 rounded-sm bg-[#22C55E]" />
              <span className="h-7 w-2 rounded-sm bg-[#60A5FA]" />
              <span className="h-4 w-2 rounded-sm bg-[#EF4444]" />
            </div>
            <h2 className="text-2xl text-shadow-xs font-semibold text-slate-900">
              다른 서비스와 비교
            </h2>
          </div>

          <div className="mt-8 flex-1 space-y-6 overflow-y-auto pr-2">
            {data.agreements.map((agreement) => (
              <div key={agreement.name} className="flex items-center gap-4">
                <span className="min-w-[72px] text-lg font-semibold text-slate-900">
                  {agreement.name}
                </span>
                <div className="relative h-7 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">
                  <div
                    className={`h-full ${getProgressColor(
                      agreement.averageCollectionRate
                    )}`}
                    style={{ width: `${agreement.averageCollectionRate}%` }}
                  />
                </div>
                <span className="min-w-[56px] text-right text-lg font-bold text-slate-900">
                  {agreement.averageCollectionRate}%
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-400">
            평균 수집률은 유사 서비스의 동의 항목을 기반으로 계산돼요.
          </p>
        </section>

        <section className="flex h-[460px] flex-1 flex-col rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)] md:h-[520px] md:p-8">
          <div className="flex items-center gap-3">
            <TriangleAlert className="text-2xl text-red-600"/>
            <h2 className="text-2xl text-shadow-xs font-semibold text-slate-900">주의할 점</h2>
          </div>

          <div className="mt-6 flex-1 space-y-5 overflow-y-auto pr-2">
            {data.cautions.map((caution, index) => (
              <div key={`${index}-${caution.content}`} className="flex gap-3">
                <div className="text-2xl font-semibold text-[#3E3E3E]">✓</div>
                <p className="text-base text-slate-900">{caution.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="flex justify-center mt-10">
        <PrimaryButton
          className="w-full max-w-xs"
          onClick={onComplete}
        >
          돌아가기
        </PrimaryButton>
      </div>
    </div>
  );
}

