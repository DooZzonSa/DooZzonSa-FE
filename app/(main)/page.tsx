 "use client";

import { useState, useEffect } from "react";

import ProgressBar from "@/app/_components/main/ProgressBar";
import {
  BeforeAnalysisScreen,
  CompleteScreen,
  LoadingScreen,
} from "@/app/_components/main/screens";

type ScreenKey = "before" | "loading" | "complete";

const SCREEN_SEQUENCE: ScreenKey[] = ["before", "loading", "complete"];

export default function Home() {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>("before");
  const currentStep = SCREEN_SEQUENCE.indexOf(activeScreen) + 1;

  const handleAnalyze = () => {
    setActiveScreen("loading");
  };

  const handleLoadingComplete = () => {
    setActiveScreen("complete");
  };

  // 로딩 화면에서 2초 후 완료 화면으로 전환 (임시)
  useEffect(() => {
    if (activeScreen === "loading") {
      const timer = setTimeout(() => {
        handleLoadingComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [activeScreen]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50">
      <div className="w-full max-w-4xl px-6 pt-12">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={SCREEN_SEQUENCE.length}
        />
      </div>
      <div className="flex w-full flex-1 items-center justify-center">
        <section className="flex w-full max-w-4xl flex-col gap-6 px-6 py-12">
          {activeScreen === "before" && (
            <BeforeAnalysisScreen onAnalyze={handleAnalyze} />
          )}
          {activeScreen === "loading" && (
            <LoadingScreen onComplete={handleLoadingComplete} />
          )}
          {activeScreen === "complete" && <CompleteScreen />}
        </section>
      </div>
    </main>
  );
}
