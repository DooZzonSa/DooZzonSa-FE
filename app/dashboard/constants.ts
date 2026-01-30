import { PolicyIssuesData } from './types';

export const DUMMY_DATA: PolicyIssuesData = {
  thisWeekSummary: "이번 주 가장 주의할 소식은 A쇼핑몰 고객정보 유출이에요. 이름, 연락처, 주소가 빠져나갔어요. B금융앱은 동의 없이 광고사에 정보를 팔다 적발됐고요. 가입된 서비스 약관, 한 번 점검해보시는 게 좋겠어요.",
  policyIssues: [
    {
      title: "대형 쇼핑몰 A사, 고객 개인정보 230만건 유출",
      summary: "이름, 연락처, 주소 등 개인정보가 해킹으로 유출. 2차 피해 주의 필요",
      source: "디지털 타임즈",
      issueType: "정보 유출",
      url: "https://example.com"
    },
    {
      title: "B 금융앱, 약관에 없던 마케팅 정보 제3자 제공 적발",
      summary: "금융위원회 조사 결과, 이용자 동의 없이 광고사에 정보 판매",
      source: "IT 조선",
      issueType: "약관 악용",
      url: "https://example.com"
    },
    {
      title: "E 쇼핑미디어, 탈퇴 후에도 데이터 보관 논란",
      summary: "회원 탈퇴해도 최대 5년간 개인정보 보관한다는 약관 조항 발견",
      source: "테크뉴스",
      issueType: "약관 악용",
      url: "https://example.com"
    }
  ],
  statistics: {
    totalCount: 127,
    thisMonthCount: 12,
    dataBreachCount: 45,
    abuseCount: 52
  }
};
