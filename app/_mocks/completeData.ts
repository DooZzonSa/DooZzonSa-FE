export interface Agreement {
  name: string;
  averageCollectionRate: number;
}

export interface Caution {
  content: string;
}

export interface AnalysisResult {
  agreements: Agreement[];
  cautions: Caution[];
}

export interface AnalysisResponse {
  status: number;
  message: string;
  data: AnalysisResult;
}

export const completeData: AnalysisResponse = {
  status: 200,
  message: "약관 분석 성공",
  data: {
    agreements: [
      { name: "실명", averageCollectionRate: 18 },
      { name: "전화번호", averageCollectionRate: 40 },
      { name: "성별", averageCollectionRate: 60 },
      { name: "이메일", averageCollectionRate: 80 },
    ],
    cautions: [
      {
        content:
          "서비스 이용 과정에서 IP, 쿠키, 이용기록, 기기정보, 위치정보가 자동으로 수집될 수 있어요.",
      },
      {
        content:
          "만 14세 미만은 법정대리인 정보(이름/DI/휴대전화번호 등)까지 추가로 수집해요.",
      },
      {
        content: "통계·연구·공익 기록 보존 목적에 가명처리한 정보를 활용할 수 있어요.",
      },
    ],
  },
};

