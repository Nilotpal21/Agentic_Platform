export type EventKind =
  | 'conversation_completed'
  | 'conversation_failed'
  | 'conversation_escalated'
  | 'task_created'
  | 'task_completed'
  | 'guardrail_triggered'
  | 'evaluation_run'
  | 'sop_uploaded'
  | 'helper_action'
  | 'approval_event'
  | 'deployment_event';

export type ActivitySeverity = 'success' | 'warning' | 'error' | 'info' | 'purple';

export interface ActivityEvent {
  id: string;
  appId: string;
  appName: string;
  kind: EventKind;
  summary: string;
  detail?: string;
  agent?: string;
  actor?: string;
  ago: string;
  severity: ActivitySeverity;
}

export const activity: ActivityEvent[] = [
  {
    id: 'a1',
    appId: 'app_card_dispute_triage',
    appName: 'card-dispute-triage',
    kind: 'task_completed',
    summary: 'Reg E case opened for member',
    agent: 'sa_account_services',
    actor: 'webhook',
    ago: '12s ago',
    severity: 'success',
  },
  {
    id: 'a2',
    appId: 'app_account_opening',
    appName: 'account-opening-assistant',
    kind: 'conversation_completed',
    summary: 'New share account opened, disclosures delivered',
    agent: 'sa_knowledge',
    actor: 'webhook',
    ago: '38s ago',
    severity: 'success',
  },
  {
    id: 'a3',
    appId: 'app_card_dispute_triage',
    appName: 'card-dispute-triage',
    kind: 'conversation_escalated',
    summary: 'Escalated to fraud ops: pattern match on 3 disputed merchants',
    agent: 'sa_compliance',
    actor: 'webhook',
    ago: '1m ago',
    severity: 'warning',
  },
  {
    id: 'a4',
    appId: 'app_hardship_assist',
    appName: 'hardship-assist',
    kind: 'approval_event',
    summary: 'Submission acknowledged by reviewer Rina Salgado',
    actor: 'u_rs',
    ago: '2m ago',
    severity: 'info',
  },
  {
    id: 'a5',
    appId: 'app_card_dispute_triage',
    appName: 'card-dispute-triage',
    kind: 'guardrail_triggered',
    summary: 'Blocked: agent attempted to quote final rate',
    detail: 'Guardrail: do-not-quote-final-rates',
    agent: 'sa_account_services',
    actor: 'system',
    ago: '4m ago',
    severity: 'warning',
  },
  {
    id: 'a6',
    appId: 'app_card_dispute_triage',
    appName: 'card-dispute-triage',
    kind: 'helper_action',
    summary: 'Process Owner accepted Helper suggestion: add Reg E guardrail',
    actor: 'u_np',
    ago: '6m ago',
    severity: 'purple',
  },
  {
    id: 'a7',
    appId: 'app_fraud_triage',
    appName: 'fraud-triage',
    kind: 'evaluation_run',
    summary: 'Continuous evaluation completed — score 96 (↑ +0.8)',
    actor: 'system',
    ago: '7m ago',
    severity: 'info',
  },
  {
    id: 'a8',
    appId: 'app_account_opening',
    appName: 'account-opening-assistant',
    kind: 'task_completed',
    summary: 'Identity verified, member onboarding complete',
    agent: 'sa_member_auth',
    actor: 'webhook',
    ago: '9m ago',
    severity: 'success',
  },
];
