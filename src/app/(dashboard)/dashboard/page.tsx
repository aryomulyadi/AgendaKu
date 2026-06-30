import { TodaySummary } from "@/components/dashboard/today-summary";
import { FocusTask } from "@/components/dashboard/focus-task";
import { TodayTaskList } from "@/components/dashboard/today-task-list";
import { TomorrowPreview } from "@/components/dashboard/tomorrow-preview";
import { MiniCalendar } from "@/components/dashboard/mini-calendar";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-8">
      <TodaySummary />
      <FocusTask />
      <TodayTaskList />
      <div className="border-t border-border/50" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_240px]">
        <TomorrowPreview />
        <MiniCalendar />
      </div>
    </div>
  );
}
