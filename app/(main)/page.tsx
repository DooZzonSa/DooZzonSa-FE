import type { ReactNode } from "react";

import ProgressBar from "@/app/_components/main/ProgressBar";
import {
  BeforeAnalysisScreen,
  CompleteScreen,
  LoadingScreen,
} from "@/app/_components/main/screens";

type ScreenKey = "before" | "loading" | "complete";

const SCREEN_SEQUENCE: ScreenKey[] = ["before", "loading", "complete"];

const SCREENS: Record<ScreenKey, ReactNode> = {
  before: <BeforeAnalysisScreen />,
  loading: <LoadingScreen />,
  complete: <CompleteScreen />,
};

export default function Home() {
  // TODO: 실제 흐름에 맞춰 activeScreen 값을 업데이트하도록 연결하세요.
  const activeScreen: ScreenKey = "before";
  const currentStep = SCREEN_SEQUENCE.indexOf(activeScreen) + 1;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={SCREEN_SEQUENCE.length}
        />
        {SCREENS[activeScreen]}
      </section>
    </main>
  );
}
