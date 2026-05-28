export interface SubAgent {
  id: string;
  name: string;
  domain: string;
  description: string;
  toolsBound: string[];
  knowledgeAttached: string[];
  guardrailsApplied: string[];
}

export const subAgents: SubAgent[] = [
  {
    id: 'sa_member_auth',
    name: 'Authentication',
    domain: 'Identity',
    description: 'Verifies member identity with multi-factor checks and KYC steps.',
    toolsBound: ['tool_idv', 'tool_core_banking'],
    knowledgeAttached: ['Member identity policy'],
    guardrailsApplied: ['No PII echo', 'Failed-auth lockout'],
  },
  {
    id: 'sa_account_services',
    name: 'Account Services',
    domain: 'Operations',
    description: 'Handles balance, transactions, statements, and standard servicing tasks.',
    toolsBound: ['tool_core_banking', 'tool_statements'],
    knowledgeAttached: ['Account disclosures', 'Reg D and E basics'],
    guardrailsApplied: ['No financial advice', 'Citation required'],
  },
  {
    id: 'sa_collections',
    name: 'Collections',
    domain: 'Servicing',
    description: 'Manages hardship workflows, payment-plan drafts, and promise-to-pay flows.',
    toolsBound: ['tool_collections_crm', 'tool_payments'],
    knowledgeAttached: ['Hardship programs', 'Collections compliance'],
    guardrailsApplied: ['TCPA-safe outbound', 'No threats'],
  },
  {
    id: 'sa_financial_wellness',
    name: 'Financial Wellness',
    domain: 'Member Health',
    description: 'Offers budgeting, savings, and educational content within CU policy.',
    toolsBound: ['tool_education_catalog'],
    knowledgeAttached: ['Financial wellness library'],
    guardrailsApplied: ['No financial advice'],
  },
  {
    id: 'sa_loans',
    name: 'Loan & Payments',
    domain: 'Lending',
    description: 'Loan intake, eligibility pre-check, payment scheduling, deferment flows.',
    toolsBound: ['tool_los', 'tool_payments'],
    knowledgeAttached: ['Loan product catalog'],
    guardrailsApplied: ['Do not quote final rates'],
  },
  {
    id: 'sa_compliance',
    name: 'Compliance',
    domain: 'Risk',
    description: 'Applies regulatory checks: Reg E, Reg D, GLBA disclosures, FFIEC guidance.',
    toolsBound: [],
    knowledgeAttached: ['Reg D and E', 'GLBA', 'FFIEC'],
    guardrailsApplied: ['Mandatory disclosures'],
  },
  {
    id: 'sa_knowledge',
    name: 'Knowledge',
    domain: 'Retrieval',
    description: 'Grounds responses in attached knowledge with citation.',
    toolsBound: ['tool_retrieval'],
    knowledgeAttached: [],
    guardrailsApplied: ['Citation required'],
  },
];

export function getSubAgentById(id: string): SubAgent | undefined {
  return subAgents.find((s) => s.id === id);
}
