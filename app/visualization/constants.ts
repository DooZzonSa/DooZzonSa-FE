import { RiskColor } from './types';

// 환경변수 필수 체크
if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL 환경변수가 설정되지 않았습니다');
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 위험도별 색상 매핑
export const RISK_COLORS: Record<string, RiskColor> = {
  '높음': { bg: '#EF4444', text: '#FFFFFF', lightBg: '#FEE2E2' },
  '중간': { bg: '#F97316', text: '#FFFFFF', lightBg: '#FFEDD5' },
  '낮음': { bg: '#22C55E', text: '#FFFFFF', lightBg: '#DCFCE7' },
};

export const RISK_LEVELS = ['낮음', '중간', '높음'] as const;

// 위험도별 설명
export const RISK_DESCRIPTIONS: Record<string, string> = {
  '낮음': '필수적인 기본 정보로, 거의 모든 서비스에서 요구하는 항목들입니다. 예외적 정보의 수집은 서비스 제공을 위해 필수적입니다.',
  '중간': '개인의 서비스나 특정 기능을 위해 요구되는 정보입니다. 이 항목들의 이용은 사용하는지, 제3자와 공유되는지 확인이 필요합니다.',
  '높음': '매우 민감한 개인 정보입니다. 이들은 신체 도용, 사기, 개인정보 악용의 위험이 높습니다. 반드시 필요한 경우에만 제공하고, 제3자 공유 정책에 특히 주의해야 합니다.',
};

// 개인정보 보호 팁
export const PRIVACY_TIPS = [
  '필수가 아닌 항목은 입력하지 않기 - 많은 개인정보 수집 요청은 선택 사항입니다',
  '제3자 공유 정책 확인 - 약관의 "정보 공유" 섹션을 주의해 읽어보세요',
  '정한 보안 점검 - 유출로 보호되어 있어 안전한 소인지 확인하세요, 위치 등을 정기적으로 확인하세요',
  '추가적 데이터 삭제 요청 - 대부분의 서비스는 개인정보 삭제를 지원합니다',
];
