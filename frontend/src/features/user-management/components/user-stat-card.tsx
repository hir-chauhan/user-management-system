import { StatCard } from "@/components/common/stat-card";
import { CheckCircle, ShieldCheck, Users, XCircle } from "lucide-react";
import { useFetchUserStats } from "../hooks/use-users";

export const UserStatCard = () => {
  const { data: statsResponse } = useFetchUserStats();

  const totalCount = statsResponse?.data?.totalUsers ?? 0;
  const activeCount = statsResponse?.data?.activeUsers ?? 0;
  const adminCount = statsResponse?.data?.adminUsers ?? 0;
  const inactiveCount = statsResponse?.data?.inactiveUsers ?? 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 w-full">
      <StatCard
        title="Total Users"
        value={totalCount}
        description="Registered in database"
        icon={Users}
        iconClassName="text-muted-foreground"
      />

      <StatCard
        title="Active Users"
        value={activeCount}
        description="Active accounts"
        icon={CheckCircle}
        iconClassName="text-emerald-500"
        descriptionClassName="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        title="Admins"
        value={adminCount}
        description="Full access roles"
        icon={ShieldCheck}
        iconClassName="text-primary"
      />

      <StatCard
        title="Inactive"
        value={inactiveCount}
        description="Restricted accounts"
        icon={XCircle}
        iconClassName="text-rose-500"
        descriptionClassName="text-rose-600 dark:text-rose-400"
      />
    </div>
  );
};
