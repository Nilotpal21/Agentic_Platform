export interface AppLiveMetrics {
  appId: string;
  appName: string;
  projectId: string;
  conversations24h: number;
  successRate: number;
  avgLatencyMs: number;
  p95LatencyMs: number;
  escalations24h: number;
  guardrailTriggers24h: number;
  evaluationScore: number;
  killSwitchActive: boolean;
  /** 24 hourly buckets, oldest first */
  conversationsByHour: number[];
  /** 24 hourly continuous-evaluation score points */
  evalScoreByHour: number[];
}

export const liveMetrics: AppLiveMetrics[] = [
  {
    appId: 'app_card_dispute_triage',
    appName: 'card-dispute-triage',
    projectId: 'proj_card_services',
    conversations24h: 1240,
    successRate: 96.8,
    avgLatencyMs: 814,
    p95LatencyMs: 1420,
    escalations24h: 38,
    guardrailTriggers24h: 4,
    evaluationScore: 94,
    killSwitchActive: false,
    conversationsByHour: [
      32, 28, 22, 18, 14, 12, 18, 32, 48, 62, 74, 81, 88, 86, 78, 70, 62, 58, 55, 50, 46, 42, 38, 36,
    ],
    evalScoreByHour: [93, 93, 93, 93, 94, 94, 94, 94, 94, 94, 94, 94, 94, 95, 95, 95, 95, 95, 94, 94, 94, 94, 94, 94],
  },
  {
    appId: 'app_account_opening',
    appName: 'account-opening-assistant',
    projectId: 'proj_member_onboarding',
    conversations24h: 412,
    successRate: 92.2,
    avgLatencyMs: 1050,
    p95LatencyMs: 1810,
    escalations24h: 18,
    guardrailTriggers24h: 1,
    evaluationScore: 91,
    killSwitchActive: false,
    conversationsByHour: [
      8, 6, 4, 4, 5, 7, 12, 18, 22, 26, 28, 30, 28, 26, 22, 20, 18, 16, 14, 12, 11, 10, 9, 8,
    ],
    evalScoreByHour: [92, 92, 92, 91, 91, 91, 91, 91, 92, 92, 92, 92, 91, 91, 91, 91, 91, 91, 91, 91, 91, 91, 91, 91],
  },
];

export interface ContinuousEvalFinding {
  id: string;
  appId: string;
  appName: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  detail: string;
  examplesCount: number;
  ago: string;
  acknowledged: boolean;
}

export const continuousEvalFindings: ContinuousEvalFinding[] = [
  {
    id: 'cef_1',
    appId: 'app_card_dispute_triage',
    appName: 'card-dispute-triage',
    severity: 'warning',
    title: 'Reg E disclosure category dropped 4 points in last run',
    detail:
      "Last 50 conversations show a drift in disclosure timing. Two failing examples involve members who asked about provisional credit before the disclosure was offered.",
    examplesCount: 6,
    ago: '14 min ago',
    acknowledged: false,
  },
  {
    id: 'cef_2',
    appId: 'app_account_opening',
    appName: 'account-opening-assistant',
    severity: 'info',
    title: 'Citation coverage trending down (96% → 92% over 7d)',
    detail:
      "The app is increasingly responding without citing a source. Likely cause: a recent batch of joint-applicant flows uses templates that the platform's citation guardrail does not yet cover.",
    examplesCount: 14,
    ago: '2 hr ago',
    acknowledged: false,
  },
];

export interface DriftAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  appId: string;
  appName: string;
  title: string;
  delta: string;
  ago: string;
}

export const driftAlerts: DriftAlert[] = [
  {
    id: 'da_1',
    severity: 'warning',
    appId: 'app_card_dispute_triage',
    appName: 'card-dispute-triage',
    title: 'Escalation rate up',
    delta: '24/day → 38/day · last 72 hr',
    ago: '1 hr ago',
  },
];

export interface StreamEvent {
  id: string;
  ago: string;
  appName: string;
  outcome: 'Completed' | 'Escalated' | 'Failed' | 'Task created';
  memberRef: string;
  durationMs: number;
}

const OUTCOMES: StreamEvent['outcome'][] = ['Completed', 'Completed', 'Completed', 'Task created', 'Escalated', 'Completed', 'Failed'];
const APP_POOL = ['card-dispute-triage', 'account-opening-assistant'];

let streamSeq = 0;
export function generateStreamEvent(): StreamEvent {
  streamSeq += 1;
  const outcome = OUTCOMES[Math.floor(Math.random() * OUTCOMES.length)];
  return {
    id: `evt_${streamSeq}_${Date.now()}`,
    ago: 'just now',
    appName: APP_POOL[Math.floor(Math.random() * APP_POOL.length)],
    outcome,
    memberRef: `anon_${Math.floor(Math.random() * 99999)
      .toString()
      .padStart(5, '0')}`,
    durationMs: 200 + Math.floor(Math.random() * 4800),
  };
}

export const initialStreamEvents: StreamEvent[] = [
  {
    id: 'evt_seed_1',
    ago: '14s ago',
    appName: 'card-dispute-triage',
    outcome: 'Completed',
    memberRef: 'anon_42188',
    durationMs: 412,
  },
  {
    id: 'evt_seed_2',
    ago: '32s ago',
    appName: 'account-opening-assistant',
    outcome: 'Task created',
    memberRef: 'anon_18074',
    durationMs: 1230,
  },
  {
    id: 'evt_seed_3',
    ago: '48s ago',
    appName: 'card-dispute-triage',
    outcome: 'Escalated',
    memberRef: 'anon_91204',
    durationMs: 2880,
  },
  {
    id: 'evt_seed_4',
    ago: '1m ago',
    appName: 'card-dispute-triage',
    outcome: 'Completed',
    memberRef: 'anon_60103',
    durationMs: 388,
  },
  {
    id: 'evt_seed_5',
    ago: '1m ago',
    appName: 'account-opening-assistant',
    outcome: 'Completed',
    memberRef: 'anon_28911',
    durationMs: 902,
  },
  {
    id: 'evt_seed_6',
    ago: '2m ago',
    appName: 'card-dispute-triage',
    outcome: 'Failed',
    memberRef: 'anon_77821',
    durationMs: 5210,
  },
];

export const tenantStatusStrip = {
  appsDeployed: 2,
  conversations24h: 1652,
  successRateLive: 96.4,
  driftAlerts: 1,
  guardrailTriggers24h: 5,
  avgLatencyMs: 814,
  p95LatencyMs: 1420,
};
