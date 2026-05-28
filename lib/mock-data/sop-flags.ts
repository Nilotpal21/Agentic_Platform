export type FlagSeverity = 'blocker' | 'warning' | 'suggestion';

export interface SOPFlag {
  id: string;
  sopId: string;
  severity: FlagSeverity;
  title: string;
  quotedPassage: string;
  suggestedFix?: string;
  acknowledged: boolean;
}

export const sopFlags: SOPFlag[] = [
  // Card disputes — 2 warnings, 5 suggestions
  {
    id: 'flag_cd_w1',
    sopId: 'sop_card_disputes',
    severity: 'warning',
    title: 'Reg E timeline may exceed mandatory disclosure window',
    quotedPassage:
      'The member services team will respond to disputed transactions within 15 business days of the initial inquiry.',
    suggestedFix:
      'Reg E mandates provisional credit within 10 business days for most disputes. Shorten the response window or document an exception path.',
    acknowledged: false,
  },
  {
    id: 'flag_cd_w2',
    sopId: 'sop_card_disputes',
    severity: 'warning',
    title: 'Identity verification step is optional in §3',
    quotedPassage:
      'If the member can recall their last 4 card digits, the representative may proceed without further verification.',
    suggestedFix:
      'Card-last-4 alone is below GLBA-recommended verification strength for disputed-transaction workflows.',
    acknowledged: false,
  },
  {
    id: 'flag_cd_s1',
    sopId: 'sop_card_disputes',
    severity: 'suggestion',
    title: 'Joint-account disclosure language not specified',
    quotedPassage: 'For joint accounts, follow the standard disclosure script.',
    acknowledged: false,
  },
  {
    id: 'flag_cd_s2',
    sopId: 'sop_card_disputes',
    severity: 'suggestion',
    title: 'Escalation contact for fraud is referenced but not defined',
    quotedPassage: 'If fraud is suspected, escalate to the fraud queue.',
    acknowledged: false,
  },
  {
    id: 'flag_cd_s3',
    sopId: 'sop_card_disputes',
    severity: 'suggestion',
    title: 'Member language preference not handled',
    quotedPassage: 'Speak to the member in clear, friendly English.',
    acknowledged: true,
  },

  // Hardship — 1 blocker, 3 warnings, 2 suggestions
  {
    id: 'flag_hs_b1',
    sopId: 'sop_hardship',
    severity: 'blocker',
    title: 'Income-loss documentation step is missing from §4',
    quotedPassage:
      'The representative will offer the member a 90-day payment plan based on their stated situation.',
    suggestedFix:
      'Hardship programs require documentation of income loss before drafting a payment plan. Add a documentation step to §4.',
    acknowledged: false,
  },
  {
    id: 'flag_hs_w1',
    sopId: 'sop_hardship',
    severity: 'warning',
    title: 'TCPA opt-out path is not explicit',
    quotedPassage: 'Send the member follow-up reminders via SMS at days 14 and 28.',
    suggestedFix:
      'TCPA requires explicit opt-in for SMS and an explicit opt-out path on every message.',
    acknowledged: false,
  },
  {
    id: 'flag_hs_w2',
    sopId: 'sop_hardship',
    severity: 'warning',
    title: 'Threatening language risk in §5',
    quotedPassage:
      "If the member misses two consecutive plan payments, advise that further legal action 'may follow.'",
    suggestedFix:
      'Replace conditional legal-action language with neutral escalation phrasing.',
    acknowledged: false,
  },
  {
    id: 'flag_hs_w3',
    sopId: 'sop_hardship',
    severity: 'warning',
    title: 'No explicit financial-distress escalation trigger',
    quotedPassage:
      'If the member appears emotionally distressed, the representative may pause the conversation.',
    suggestedFix:
      'Add an explicit escalation path to a human counselor when financial-distress signals are detected.',
    acknowledged: false,
  },
  {
    id: 'flag_hs_s1',
    sopId: 'sop_hardship',
    severity: 'suggestion',
    title: 'Co-borrower handling not addressed',
    quotedPassage: 'For loans with a co-borrower, the same rules apply.',
    acknowledged: false,
  },
  {
    id: 'flag_hs_s2',
    sopId: 'sop_hardship',
    severity: 'suggestion',
    title: 'Recovery / step-down plan path is implicit',
    quotedPassage: 'After 90 days, return the member to the standard payment schedule.',
    acknowledged: true,
  },

  // Account opening — 1 warning, 8 suggestions (just include a few)
  {
    id: 'flag_ao_w1',
    sopId: 'sop_acct_opening',
    severity: 'warning',
    title: 'Reg D share-account disclosure not referenced',
    quotedPassage:
      'When opening a share certificate, explain the standard rate and term.',
    suggestedFix:
      'Reg D requires specific dividend-period disclosures for share certificates. Reference the disclosure script.',
    acknowledged: false,
  },
  {
    id: 'flag_ao_s1',
    sopId: 'sop_acct_opening',
    severity: 'suggestion',
    title: 'Minor account handling not specified',
    quotedPassage: 'For applicants under 18, follow the minor-account workflow.',
    acknowledged: false,
  },
  {
    id: 'flag_ao_s2',
    sopId: 'sop_acct_opening',
    severity: 'suggestion',
    title: 'Joint applicant flow could be clearer',
    quotedPassage: 'Joint applicants are handled the same as primary applicants.',
    acknowledged: false,
  },
  // Fraud triage — 2 warnings, 4 suggestions
  {
    id: 'flag_fr_w1',
    sopId: 'sop_fraud_triage',
    severity: 'warning',
    title: 'PII exposure risk in escalation message',
    quotedPassage:
      'When escalating to the fraud queue, include the disputed transaction details and the member\'s full account number.',
    suggestedFix:
      'Use the masked account number; the fraud queue can look up the full reference.',
    acknowledged: false,
  },
  {
    id: 'flag_fr_w2',
    sopId: 'sop_fraud_triage',
    severity: 'warning',
    title: 'Accusatory language risk',
    quotedPassage:
      "Confirm with the member that they didn't make the transaction themselves.",
    suggestedFix:
      'Reframe as: "Could you help me verify this transaction was authorized?"',
    acknowledged: true,
  },
  // Loans — 3 warnings, 6 suggestions
  {
    id: 'flag_ln_w1',
    sopId: 'sop_loans',
    severity: 'warning',
    title: 'Rate-quoting language could mislead members',
    quotedPassage:
      'Quote the member the current best advertised rate as their expected rate.',
    suggestedFix:
      'Final rates depend on underwriting. Replace with: "indicative range, subject to underwriting."',
    acknowledged: false,
  },
];

export function getFlagsForSOP(sopId: string): SOPFlag[] {
  return sopFlags.filter((f) => f.sopId === sopId);
}
