import { useAuthStore } from "@/stores/auth-store";
import { useFetchUsers } from "@/features/user-management/hooks/use-users";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoleBadge, StatusBadge } from "@/components/common/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function DashboardPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { data: userResponse, isLoading } = useFetchUsers({ limit: 10 });

  const users = userResponse?.data || [];

  const getInitials = (first?: string, last?: string) => {
    return `${(first || "U")[0]}${(last || "S")[0]}`.toUpperCase();
  };

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "User";

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-4 sm:p-8 text-primary-foreground shadow-md">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {fullName}!
          </h2>
          <p className="text-primary-foreground/85 text-xs sm:text-sm leading-relaxed">
            Manage users, keep track of account activity, and handle user access
            with ease.
          </p>
          <div className="pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate({ to: "/users" })}
              className="gap-2 font-semibold shadow-xs text-xs sm:text-sm w-full sm:w-auto justify-center"
            >
              <span>Go to User Management</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between gap-2 p-4 sm:p-6">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base font-bold truncate">
              Recent Users
            </CardTitle>
            <CardDescription className="text-xs truncate">
              Recently registered or modified accounts
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/users" })}
            className="text-xs gap-1.5 shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          {isLoading ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Loading recent users...
            </div>
          ) : users.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No users registered yet.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {users.slice(0, 5).map((u) => (
                <div
                  key={u._id}
                  className="flex items-center justify-between gap-2 py-3 hover:bg-muted/30 px-1 sm:px-2 rounded-md transition-colors min-w-0"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <Avatar className="h-8 w-8 shrink-0 border border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                        {getInitials(u.firstName, u.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium leading-tight truncate">
                        {u.firstName} {u.lastName}
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                        {u.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                    <RoleBadge
                      role={u.role}
                      className="text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5"
                    />
                    <StatusBadge
                      status={u.status}
                      className="text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
