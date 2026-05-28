export type SOPStatus = 'parsed' | 'parsing' | 'failed' | 'archived';

export interface SOPStats {
  intentsDetected: number;
  tasksDetected: number;
  escalationsDetected: number;
}

export interface SOP {
  id: string;
  name: string;
  filename: string;
  fileSizeKB: number;
  pages: number;
  uploadedBy: string;
  uploadedAt: string;
  status: SOPStatus;
  version: number;
  stats: SOPStats;
  blockerFlags: number;
  warningFlags: number;
  suggestionFlags: number;
  appsGenerated: string[];
  attachedSubAgents: string[];
  attachedKnowledge: string[];
  attachedGuardrails: string[];
  selectedChannels: ('digital' | 'voice' | 'sms' | 'email')[];
}

export const sops: SOP[] = [
  {
    id: 'sop_card_disputes',
    name: 'Card Dispute Resolution SOP',
    filename: 'Card_Disputes_v3.2.pdf',
    fileSizeKB: 482,
    pages: 14,
    uploadedBy: 'u_np',
    uploadedAt: '2026-05-21',
    status: 'parsed',
    version: 3,
    stats: { intentsDetected: 9, tasksDetected: 12, escalationsDetected: 4 },
    blockerFlags: 0,
    warningFlags: 2,
    suggestionFlags: 5,
    appsGenerated: ['app_card_dispute_triage'],
    attachedSubAgents: ['sa_member_auth', 'sa_account_services', 'sa_compliance'],
    attachedKnowledge: [
      'Reg E playbook',
      'Card dispute disclosures',
      'Member identity policy',
      'Cornerstone FAQ',
    ],
    attachedGuardrails: [
      'No PII echo',
      'Failed-auth lockout',
      'Mandatory Reg E disclosures',
      'No financial advice',
      'TCPA-safe outbound',
      'Citation required',
      'Do not quote final rates',
    ],
    selectedChannels: ['digital', 'voice'],
  },
  {
    id: 'sop_acct_opening',
    name: 'Member Account Opening',
    filename: 'AOS_Onboarding.pdf',
    fileSizeKB: 612,
    pages: 22,
    uploadedBy: 'u_np',
    uploadedAt: '2026-05-15',
    status: 'parsed',
    version: 2,
    stats: { intentsDetected: 11, tasksDetected: 18, escalationsDetected: 6 },
    blockerFlags: 0,
    warningFlags: 1,
    suggestionFlags: 8,
    appsGenerated: ['app_account_opening'],
    attachedSubAgents: ['sa_member_auth', 'sa_account_services', 'sa_knowledge'],
    attachedKnowledge: [
      'Account opening disclosures',
      'KYC and identity policy',
      'Reg D basics',
      'Product catalog',
      'Cornerstone branch FAQ',
    ],
    attachedGuardrails: [
      'No PII echo',
      'KYC required before account creation',
      'Mandatory product disclosures',
      'No financial advice',
      'Citation required',
    ],
    selectedChannels: ['digital', 'sms'],
  },
  {
    id: 'sop_fraud_triage',
    name: 'Fraud Triage and Member Notification',
    filename: 'Fraud_Triage_v1.1.pdf',
    fileSizeKB: 388,
    pages: 11,
    uploadedBy: 'u_np',
    uploadedAt: '2026-05-12',
    status: 'parsed',
    version: 1,
    stats: { intentsDetected: 7, tasksDetected: 10, escalationsDetected: 5 },
    blockerFlags: 0,
    warningFlags: 2,
    suggestionFlags: 4,
    appsGenerated: ['app_fraud_triage'],
    attachedSubAgents: ['sa_member_auth', 'sa_account_services', 'sa_compliance'],
    attachedKnowledge: [
      'Fraud detection patterns',
      'FFIEC fraud guidance',
      'Member identity policy',
      'Cornerstone fraud playbook',
    ],
    attachedGuardrails: [
      'No PII echo',
      'Failed-auth lockout',
      'Mandatory escalation on confirmed fraud',
      'No accusatory language',
      'TCPA-safe outbound',
      'Citation required',
    ],
    selectedChannels: ['digital', 'voice'],
  },
  {
    id: 'sop_hardship',
    name: 'Member Hardship Payment Plans',
    filename: 'Hardship_Plans_2026.docx',
    fileSizeKB: 286,
    pages: 9,
    uploadedBy: 'u_np',
    uploadedAt: '2026-05-19',
    status: 'parsed',
    version: 1,
    stats: { intentsDetected: 6, tasksDetected: 8, escalationsDetected: 3 },
    blockerFlags: 1,
    warningFlags: 3,
    suggestionFlags: 2,
    appsGenerated: ['app_hardship_assist'],
    attachedSubAgents: ['sa_member_auth', 'sa_collections', 'sa_financial_wellness'],
    attachedKnowledge: [
      'Hardship eligibility policy',
      'Cornerstone hardship programs',
      'Collections compliance',
      'TCPA outbound rules',
    ],
    attachedGuardrails: [
      'No PII echo',
      'TCPA-safe outbound',
      'No threats / accusatory language',
      'Mandatory escalation on financial distress signals',
      'No financial advice',
    ],
    selectedChannels: ['digital'],
  },
  {
    id: 'sop_loans',
    name: 'Loan Application Intake (Draft)',
    filename: 'Loan_Intake_Draft.pdf',
    fileSizeKB: 412,
    pages: 16,
    uploadedBy: 'u_np',
    uploadedAt: '2026-05-08',
    status: 'parsed',
    version: 1,
    stats: { intentsDetected: 8, tasksDetected: 11, escalationsDetected: 4 },
    blockerFlags: 0,
    warningFlags: 3,
    suggestionFlags: 6,
    appsGenerated: ['app_loan_intake'],
    attachedSubAgents: ['sa_loans', 'sa_member_auth'],
    attachedKnowledge: [
      'Loan product catalog',
      'Underwriting eligibility guidelines',
      'KYC and identity policy',
    ],
    attachedGuardrails: [
      'No PII echo',
      'Do not quote final rates',
      'KYC required before pre-check',
      'No financial advice',
    ],
    selectedChannels: ['digital'],
  },
];

export function getSOPById(id: string): SOP | undefined {
  return sops.find((s) => s.id === id);
}

export const recentSOPs = sops.slice(0, 3);
