import LoadingAnimation from "@/app/_components/common/loading";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingAnimation />
      <h2 className="mt-8 text-2xl font-semibold text-slate-900">
        약관을 분석 중이에요...
      </h2>
      <p className="mt-2 text-base text-slate-500">잠시만 기다려 주세요</p>
    </div>
  );
}

