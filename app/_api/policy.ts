export type AgreementSummary = {
  name: string;
  averageCollectionRate: number;
};

export type PolicyCaution = {
  content: string;
};

export type PolicyAnalyzeResponse = {
  status: number;
  message: string;
  data: {
    agreements: AgreementSummary[];
    cautions: PolicyCaution[];
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const getApiUrl = (path: string) =>
  API_BASE_URL ? `${API_BASE_URL}${path}` : path;

export async function analyzePolicy(context: string) {
  const response = await fetch(getApiUrl("/api/v1/policy-items"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ context }),
  });

  if (!response.ok) {
    throw new Error(`Policy analyze failed: ${response.status}`);
  }

  return (await response.json()) as PolicyAnalyzeResponse;
}

