export type MarketplaceKind =
  | 'template'
  | 'sub_agent'
  | 'skill'
  | 'knowledge_pack'
  | 'guardrail_pack'
  | 'evaluation_pack';

export interface MarketplaceItem {
  id: string;
  name: string;
  kind: MarketplaceKind;
  category: string;
  description: string;
  longDescription: string;
  version: string;
  installedByCount: number;
  lastUpdated: string;
  installed: boolean;
  updateAvailable?: boolean;
  rating: number;
  features: string[];
  changelog: { version: string; date: string; notes: string }[];
}

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: 'mp_card_dispute_template',
    name: 'Card Dispute Resolution',
    kind: 'template',
    category: 'Card Services',
    description: 'Full app template for Reg E disputes including SOP-derived eval scenarios.',
    longDescription:
      'Production-ready template covering the full card dispute lifecycle: identity verification, transaction lookup, dispute case creation per Reg E, provisional-credit notice, and member follow-up. Includes the Authentication, Account Services, and Compliance sub-agents pre-wired with the credit-union baseline guardrails.',
    version: '2.4.1',
    installedByCount: 32,
    lastUpdated: '2026-05-21',
    installed: true,
    rating: 4.7,
    features: [
      'Reg E dispute case creation',
      'Member identity verification with KBA + step-up',
      '10-day provisional credit notice automation',
      'Joint account handling',
      '40 SOP-derived eval scenarios',
      'TCPA-safe outbound communications',
    ],
    changelog: [
      { version: '2.4.1', date: '2026-05-21', notes: 'Added 12 scenarios covering joint-account disputes.' },
      { version: '2.3.0', date: '2026-04-18', notes: 'Updated Reg E provisional-credit timing per Q1 2026 guidance.' },
      { version: '2.2.0', date: '2026-03-10', notes: 'New PII redaction guardrail; expanded escalation routing.' },
    ],
  },
  {
    id: 'mp_hardship_guardrail',
    name: 'Member Hardship Guardrail Pack',
    kind: 'guardrail_pack',
    category: 'Collections',
    description:
      'TCPA-compliant outreach, no-threats, no-financial-advice, escalation triggers for hardship workflows.',
    longDescription:
      'A curated bundle of 11 guardrails purpose-built for collections and hardship apps. Enforces TCPA-safe outbound rules, blocks threatening or coercive language, requires income-loss documentation before drafting plans, and routes financial-distress signals to human counselors.',
    version: '1.3.0',
    installedByCount: 18,
    lastUpdated: '2026-05-15',
    installed: false,
    rating: 4.8,
    features: [
      'TCPA-safe outbound for all SMS and voice',
      'No-threats / no-coercive-language enforcement',
      'Income-loss documentation gate',
      'Escalation triggers on distress signals',
      'No-financial-advice baseline',
      'State-specific outreach windows',
    ],
    changelog: [
      { version: '1.3.0', date: '2026-05-15', notes: 'Added state-specific quiet-hour rules for outbound calls.' },
      { version: '1.2.0', date: '2026-04-02', notes: 'Income-loss documentation guardrail.' },
    ],
  },
  {
    id: 'mp_fraud_eval_pack',
    name: 'Fraud Triage Evaluation Pack',
    kind: 'evaluation_pack',
    category: 'Fraud',
    description: '80 pre-built scenarios for fraud detection patterns and triage routing.',
    longDescription:
      'Comprehensive evaluation scenarios covering card-not-present fraud, account takeover, social engineering, card cloning, and emerging digital-wallet fraud patterns. Each scenario tests both detection accuracy and escalation routing.',
    version: '3.1.0',
    installedByCount: 24,
    lastUpdated: '2026-05-12',
    installed: true,
    rating: 4.9,
    features: [
      '80 conversation scenarios',
      'Card-not-present + card-present coverage',
      'Account takeover patterns',
      'Social engineering scripts',
      'Card cloning detection',
      'Digital wallet fraud (Apple Pay, Google Pay)',
    ],
    changelog: [
      { version: '3.1.0', date: '2026-05-12', notes: '24 new scenarios covering digital-wallet fraud.' },
      { version: '3.0.0', date: '2026-03-22', notes: 'Major refresh; aligned with FFIEC 2026 guidance.' },
    ],
  },
  {
    id: 'mp_account_opening_template',
    name: 'Member Account Opening',
    kind: 'template',
    category: 'Account Opening',
    description: 'End-to-end onboarding with KYC, product selection, disclosure delivery.',
    longDescription:
      'Self-serve onboarding template wrapping identity verification, product matching, disclosure delivery, and back-office task creation. Includes 12 sub-agent-bound flows and 30 baseline scenarios.',
    version: '1.8.2',
    installedByCount: 41,
    lastUpdated: '2026-05-09',
    installed: true,
    rating: 4.6,
    features: [
      'KYC + CIP identity flow',
      'Reg D share-account disclosures',
      'Joint and minor account handling',
      'Initial deposit automation',
      'Cross-channel onboarding (digital + SMS)',
    ],
    changelog: [
      { version: '1.8.2', date: '2026-05-09', notes: 'Improved minor-account flow.' },
    ],
  },
  {
    id: 'mp_loan_intake_template',
    name: 'Loan Application Intake',
    kind: 'template',
    category: 'Lending',
    description: 'Pre-check, eligibility scoring, underwriter handoff.',
    longDescription:
      'Loan intake template suitable for auto, personal, and HELOC products. Includes hard-stop guardrails on rate quotes and seamless handoff to underwriting.',
    version: '1.2.0',
    installedByCount: 14,
    lastUpdated: '2026-04-30',
    installed: false,
    rating: 4.4,
    features: [
      'Rate-language compliance guardrail',
      'Pre-check eligibility scoring',
      'Document collection flow',
      'Underwriter handoff with structured payload',
    ],
    changelog: [
      { version: '1.2.0', date: '2026-04-30', notes: 'Added rate-language compliance guardrail.' },
    ],
  },
  {
    id: 'mp_member_auth_sub_agent',
    name: 'Member Authentication',
    kind: 'sub_agent',
    category: 'Identity',
    description: 'Multi-factor identity verification sub-agent for credit unions.',
    longDescription:
      'Drop-in identity sub-agent that combines knowledge-based auth, OTP, and step-up factors. Adapts to risk score; integrates with major IdVs.',
    version: '4.0.0',
    installedByCount: 56,
    lastUpdated: '2026-05-18',
    installed: true,
    updateAvailable: true,
    rating: 4.9,
    features: [
      'KBA + OTP + passkey + biometric',
      'Risk-tiered step-up',
      'Failed-auth lockout',
      'PII echo prevention',
    ],
    changelog: [
      { version: '4.0.0', date: '2026-05-18', notes: 'Passkey support; new risk-tier model.' },
      { version: '3.5.0', date: '2026-03-14', notes: 'Biometric integration.' },
    ],
  },
  {
    id: 'mp_collections_sub_agent',
    name: 'Collections',
    kind: 'sub_agent',
    category: 'Collections',
    description: 'Hardship plans, promise-to-pay, payment-plan drafting.',
    longDescription:
      'Specialized sub-agent for collections workflows. Drafts payment plans, handles promise-to-pay tracking, and integrates with TCPA-safe outbound rules.',
    version: '2.1.0',
    installedByCount: 19,
    lastUpdated: '2026-05-08',
    installed: true,
    rating: 4.5,
    features: [
      'Payment plan drafting',
      'Promise-to-pay tracking',
      'TCPA-safe SMS reminders',
      'Counselor escalation triggers',
    ],
    changelog: [
      { version: '2.1.0', date: '2026-05-08', notes: 'Better integration with hardship guardrails.' },
    ],
  },
  {
    id: 'mp_compliance_sub_agent',
    name: 'Compliance',
    kind: 'sub_agent',
    category: 'Compliance',
    description: 'Reg E, Reg D, GLBA, and FFIEC compliance enforcement.',
    longDescription:
      'Compliance sub-agent that applies regulatory checks to every member-impacting decision. Generates disclosures, enforces timing requirements, and audits every action.',
    version: '3.2.1',
    installedByCount: 47,
    lastUpdated: '2026-05-11',
    installed: true,
    rating: 4.8,
    features: [
      'Reg E + Reg D enforcement',
      'GLBA disclosure automation',
      'FFIEC fraud guidance',
      'Mandatory audit trail per decision',
    ],
    changelog: [
      { version: '3.2.1', date: '2026-05-11', notes: 'Updated GLBA disclosure templates.' },
    ],
  },
  {
    id: 'mp_pii_redaction_skill',
    name: 'PII Redaction',
    kind: 'skill',
    category: 'Compliance',
    description: 'Detects and redacts PII / NPI in member communications.',
    longDescription:
      'Lightweight skill that runs over outbound responses to detect SSN, account numbers, addresses, and NPI patterns. Configurable masking and audit logging.',
    version: '1.6.0',
    installedByCount: 38,
    lastUpdated: '2026-05-05',
    installed: true,
    rating: 4.7,
    features: [
      'SSN, account, and address detection',
      'Configurable masking patterns',
      'Audit log of every redaction',
    ],
    changelog: [
      { version: '1.6.0', date: '2026-05-05', notes: 'Improved address detection.' },
    ],
  },
  {
    id: 'mp_intent_classifier_skill',
    name: 'Member Intent Classifier',
    kind: 'skill',
    category: 'Member Services',
    description: 'Fast multi-class classification for inbound member messages.',
    longDescription:
      'Sub-200ms intent classifier optimized for credit-union member-service conversations. Covers 200+ intents across card, account, lending, and fraud categories.',
    version: '2.0.0',
    installedByCount: 29,
    lastUpdated: '2026-04-25',
    installed: false,
    rating: 4.6,
    features: [
      '200+ intents pre-trained',
      'Sub-200ms p95',
      'Out-of-scope detection',
      'Multi-language (English + Spanish)',
    ],
    changelog: [{ version: '2.0.0', date: '2026-04-25', notes: 'Spanish support.' }],
  },
  {
    id: 'mp_reg_e_knowledge',
    name: 'Reg E Playbook',
    kind: 'knowledge_pack',
    category: 'Compliance',
    description: 'Curated knowledge pack covering Reg E error resolution end-to-end.',
    longDescription:
      'Comprehensive knowledge pack covering Reg E dispute timelines, provisional credit rules, error-resolution procedures, and member notification requirements.',
    version: '5.1.0',
    installedByCount: 44,
    lastUpdated: '2026-05-20',
    installed: true,
    rating: 4.9,
    features: [
      'Error resolution flowcharts',
      'Provisional credit timing matrices',
      'Member notification templates',
      'State-specific addenda',
    ],
    changelog: [
      { version: '5.1.0', date: '2026-05-20', notes: 'Aligned with Q2 2026 CFPB guidance.' },
    ],
  },
  {
    id: 'mp_aml_knowledge',
    name: 'AML / BSA Knowledge Pack',
    kind: 'knowledge_pack',
    category: 'Compliance',
    description: 'CIP, CDD, and SAR-related procedures and member-service guidance.',
    longDescription:
      'Anti-money-laundering and Bank Secrecy Act knowledge pack covering identification procedures, customer due diligence, and Suspicious Activity Report handling at the member-service layer.',
    version: '2.3.0',
    installedByCount: 16,
    lastUpdated: '2026-04-18',
    installed: false,
    rating: 4.4,
    features: ['CIP procedures', 'CDD escalation', 'SAR handling guidance', 'Beneficial ownership rules'],
    changelog: [{ version: '2.3.0', date: '2026-04-18', notes: 'Beneficial-ownership refresh.' }],
  },
  {
    id: 'mp_account_disclosures_knowledge',
    name: 'Account Opening Disclosures',
    kind: 'knowledge_pack',
    category: 'Account Opening',
    description: 'Reg D, Reg DD, and CU-specific share-account disclosures.',
    longDescription:
      'Up-to-date disclosure templates and language for share, share certificate, IRA, and HSA account opening.',
    version: '4.0.0',
    installedByCount: 22,
    lastUpdated: '2026-04-29',
    installed: true,
    rating: 4.6,
    features: [
      'Share account disclosures',
      'Share certificate APY templates',
      'IRA and HSA addenda',
      'Reg DD truth-in-savings language',
    ],
    changelog: [{ version: '4.0.0', date: '2026-04-29', notes: 'Reg DD truth-in-savings refresh.' }],
  },
  {
    id: 'mp_tcpa_guardrail',
    name: 'TCPA Outbound Pack',
    kind: 'guardrail_pack',
    category: 'Compliance',
    description: 'TCPA-safe SMS and voice outbound rules per state.',
    longDescription:
      'Guardrail bundle that enforces TCPA opt-in requirements, quiet-hour windows by state, and 10DLC registration prerequisites.',
    version: '1.5.0',
    installedByCount: 35,
    lastUpdated: '2026-05-07',
    installed: false,
    rating: 4.8,
    features: [
      'Opt-in enforcement',
      'State-specific quiet hours',
      '10DLC registration check',
      'Opt-out propagation',
    ],
    changelog: [{ version: '1.5.0', date: '2026-05-07', notes: 'Added two new state restrictions.' }],
  },
  {
    id: 'mp_no_financial_advice_guardrail',
    name: 'No-Financial-Advice Baseline',
    kind: 'guardrail_pack',
    category: 'Compliance',
    description: 'Prevents accidental investment, tax, or fiduciary advice.',
    longDescription:
      'Baseline guardrail bundle that blocks the agent from giving specific investment, tax, or fiduciary recommendations. Provides safe deflection templates.',
    version: '2.0.0',
    installedByCount: 52,
    lastUpdated: '2026-04-14',
    installed: true,
    rating: 4.7,
    features: [
      'Investment-advice detection',
      'Tax-advice deflection',
      'Fiduciary-advice deflection',
      'Safe-handoff templates',
    ],
    changelog: [{ version: '2.0.0', date: '2026-04-14', notes: 'Tightened tax-advice detection.' }],
  },
  {
    id: 'mp_card_dispute_eval',
    name: 'Card Dispute Evaluation Pack',
    kind: 'evaluation_pack',
    category: 'Card Services',
    description: '60 scenarios covering dispute filing, status updates, and joint accounts.',
    longDescription:
      'Comprehensive evaluation scenarios for card dispute resolution apps. Covers happy paths, edge cases, joint accounts, and Reg E timing edge cases.',
    version: '2.0.0',
    installedByCount: 28,
    lastUpdated: '2026-04-08',
    installed: false,
    rating: 4.5,
    features: ['60 conversation scenarios', 'Reg E timing edge cases', 'Joint-account variants'],
    changelog: [{ version: '2.0.0', date: '2026-04-08', notes: 'Major scenario refresh.' }],
  },
  {
    id: 'mp_member_services_eval',
    name: 'Member Services Evaluation Pack',
    kind: 'evaluation_pack',
    category: 'Member Services',
    description: '120 broad member-service scenarios for general inquiry apps.',
    longDescription:
      'Broad scenario coverage across general member service workflows: balance inquiries, transaction history, address changes, statement requests, and routine FAQs.',
    version: '1.8.0',
    installedByCount: 33,
    lastUpdated: '2026-05-03',
    installed: false,
    rating: 4.6,
    features: ['120 scenarios', '20+ intent categories', 'Spanish variants'],
    changelog: [{ version: '1.8.0', date: '2026-05-03', notes: 'Spanish variants added.' }],
  },
  {
    id: 'mp_financial_wellness_sub_agent',
    name: 'Financial Wellness',
    kind: 'sub_agent',
    category: 'Member Services',
    description: 'Educational content, budgeting, and savings guidance within CU policy.',
    longDescription:
      'Sub-agent for financial education and savings nudges. Operates within strict no-advice guardrails while providing budgeting tools and savings strategies.',
    version: '1.5.0',
    installedByCount: 11,
    lastUpdated: '2026-04-22',
    installed: false,
    rating: 4.3,
    features: ['Budget planning', 'Savings goals', 'Educational content', 'No-advice safe zones'],
    changelog: [{ version: '1.5.0', date: '2026-04-22', notes: 'Educational content refresh.' }],
  },
  {
    id: 'mp_account_intent_skill',
    name: 'Account Inquiry Intent Detector',
    kind: 'skill',
    category: 'Account Services',
    description: 'Identifies account-related inquiries from member text.',
    longDescription:
      'Specialized intent skill for routing account inquiries (balance, transactions, holds, fees) within member-service apps.',
    version: '1.4.0',
    installedByCount: 21,
    lastUpdated: '2026-04-19',
    installed: false,
    rating: 4.5,
    features: ['20+ account intents', 'Sub-100ms latency', 'Spanish support'],
    changelog: [{ version: '1.4.0', date: '2026-04-19', notes: 'Sub-100ms latency improvements.' }],
  },
  {
    id: 'mp_fraud_alert_knowledge',
    name: 'Fraud Pattern Library',
    kind: 'knowledge_pack',
    category: 'Fraud',
    description: 'Continuously refreshed library of fraud patterns and red flags.',
    longDescription:
      'A weekly-refreshed library of known fraud patterns, social engineering scripts, and red flags. Updated by the Platform Team with anonymized data across CUs.',
    version: '2.4.0',
    installedByCount: 26,
    lastUpdated: '2026-05-26',
    installed: false,
    rating: 4.7,
    features: ['Weekly refresh', 'Social engineering scripts', 'Red flag patterns', 'Cross-CU pattern aggregation'],
    changelog: [{ version: '2.4.0', date: '2026-05-26', notes: 'New phishing patterns from Q2 2026.' }],
  },
];

export const featuredItemIds = [
  'mp_card_dispute_template',
  'mp_hardship_guardrail',
  'mp_fraud_eval_pack',
];

export const marketplaceCategories = [
  'All domains',
  'Card Services',
  'Member Services',
  'Lending',
  'Fraud',
  'Account Opening',
  'Collections',
  'Compliance',
];

export const kindLabel: Record<MarketplaceKind, string> = {
  template: 'Templates',
  sub_agent: 'Sub-Agents',
  skill: 'Skills',
  knowledge_pack: 'Knowledge Packs',
  guardrail_pack: 'Guardrail Packs',
  evaluation_pack: 'Eval Scenario Packs',
};

export const kindShortLabel: Record<MarketplaceKind, string> = {
  template: 'Template',
  sub_agent: 'Sub-Agent',
  skill: 'Skill',
  knowledge_pack: 'Knowledge',
  guardrail_pack: 'Guardrails',
  evaluation_pack: 'Eval Pack',
};

export function getMarketplaceItemById(id: string): MarketplaceItem | undefined {
  return marketplaceItems.find((m) => m.id === id);
}
