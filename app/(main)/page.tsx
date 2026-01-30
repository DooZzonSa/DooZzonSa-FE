"use client";

import { useState } from "react";

import ProgressBar from "@/app/_components/main/ProgressBar";
import {
  BeforeAnalysisScreen,
  CompleteScreen,
  LoadingScreen,
} from "@/app/_components/main/screens";
import { analyzePolicy, type PolicyAnalyzeResponse } from "@/app/_api/policy";

type ScreenKey = "before" | "loading" | "complete";

const SCREEN_SEQUENCE: ScreenKey[] = ["before", "loading", "complete"];

export default function Home() {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>("before");
  const [analysisData, setAnalysisData] =
    useState<PolicyAnalyzeResponse["data"] | null>(null);
  const currentStep = SCREEN_SEQUENCE.indexOf(activeScreen) + 1;

  const handleAnalyze = async (agreementText: string) => {
    setActiveScreen("loading");
    setAnalysisData(null);
    try {
      const response = await analyzePolicy(agreementText);
      setAnalysisData(response.data);
      setActiveScreen("complete");
    } catch (error) {
      console.error(error);
      setActiveScreen("before");
    }
  };

  const handleComplete = () => {
    setActiveScreen("before");
  };

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
          {activeScreen === "loading" && <LoadingScreen />}
          {activeScreen === "complete" && analysisData && (
            <CompleteScreen onComplete={handleComplete} data={analysisData} />
          )}
        </section>
      </div>
    </main>
  );
}
