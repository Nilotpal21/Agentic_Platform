export interface ConversationPoint {
  hour: string;
  success: number;
  escalated: number;
  failed: number;
}

export const conversationsByHour: ConversationPoint[] = [
  { hour: '14:00', success: 88, escalated: 4, failed: 1 },
  { hour: '15:00', success: 102, escalated: 6, failed: 2 },
  { hour: '16:00', success: 124, escalated: 7, failed: 3 },
  { hour: '17:00', success: 136, escalated: 9, failed: 2 },
  { hour: '18:00', success: 158, escalated: 8, failed: 4 },
  { hour: '19:00', success: 174, escalated: 11, failed: 3 },
  { hour: '20:00', success: 163, escalated: 9, failed: 2 },
  { hour: '21:00', success: 142, escalated: 7, failed: 2 },
  { hour: '22:00', success: 118, escalated: 6, failed: 1 },
  { hour: '23:00', success: 96, escalated: 5, failed: 1 },
  { hour: '00:00', success: 72, escalated: 4, failed: 0 },
  { hour: '01:00', success: 58, escalated: 3, failed: 0 },
];

export const dashboardFooterStatus =
  'Continuous evaluation last ran 14 minutes ago · 0 active drift alerts · 1 Helper suggestion pending acknowledgment';
