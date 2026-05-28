import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { KPIRow } from '@/components/dashboard/KPIRow';
import { ActionRow } from '@/components/dashboard/ActionRow';
import { ConversationsChart } from '@/components/dashboard/ConversationsChart';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { AppsGrid } from '@/components/dashboard/AppsGrid';
import { Footer } from '@/components/shell/Footer';
import { dashboardFooterStatus } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeHeader />
      <KPIRow />
      <ActionRow />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ConversationsChart />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>

      <AppsGrid />

      <p className="text-[11px] text-foreground-subtle text-center">{dashboardFooterStatus}</p>

      <Footer />
    </div>
  );
}
