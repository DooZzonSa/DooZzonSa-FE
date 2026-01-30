 "use client";

import { useState } from "react";
import PrimaryButton from "@/app/_components/common/buttons/PrimaryButton";

type BeforeAnalysisScreenProps = {
  onAnalyze: (agreementText: string) => void;
};

export default function BeforeAnalysisScreen({
  onAnalyze,
}: BeforeAnalysisScreenProps) {
  const [agreementText, setAgreementText] = useState(""); 
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          약관을 붙여넣고
          <span className="hidden md:inline"> </span>
          <br className="md:hidden" />
          <span className="bg-gradient-to-t from-yellow-300 from-40% to-transparent to-40%">
            위험도
          </span>
          를 확인해보세요
        </h1>
        <p className="text-base leading-relaxed text-slate-500 md:text-lg">
          <span className="block">
            다른 서비스와 비교해
          </span>
          <span className="block">과도한 개인정보 수집 및 주의점을 알려드려요</span>
        </p>
      </header>

      <textarea
        value={agreementText}
        onChange={(event) => setAgreementText(event.target.value)}
        placeholder="개인정보 처리 방침을 붙여넣어주세요."
        className="h-[50vh] min-h-[360px] max-h-[65vh] w-full resize-none rounded-2xl border border-transparent bg-[#DAEAF6] px-4 py-4 text-[15px] leading-relaxed text-slate-900 shadow-sm outline-none transition focus:border-slate-100 focus:shadow-[0_0_0_3px_rgba(148,163,184,0.25)] sm:px-10 sm:py-10"
      />

      <div className="flex justify-center">
        <PrimaryButton
          className="w-full max-w-xs"
          onClick={() => onAnalyze(agreementText)}
          disabled={agreementText.trim().length === 0}
        >
          분석하기
        </PrimaryButton>
      </div>
    </div>
  );
}

