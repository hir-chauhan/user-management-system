import { useState } from "react";
import { UserFilters } from "./types";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { UserStatCard } from "./components/user-stat-card";
import { UserTable } from "./components/user-table";
import { UserFormDialog } from "./components/user-form-dialog";

export function UserManagementFeature() {
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
    search: "",
    role: "",
    status: "",
    sortBy: undefined,
    sortOrder: undefined,
  });

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleRoleFilterChange = (role: string) => {
    setFilters((prev) => ({
      ...prev,
      role: role === "ALL" ? "" : role,
      page: 1,
    }));
  };

  const handleStatusFilterChange = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: status === "ALL" ? "" : status,
      page: 1,
    }));
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Users
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
            Keep track of your users, manage their access, and update account
            details from one place.
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="gap-2 shrink-0 shadow-xs"
          size="sm"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </div>


      <UserStatCard />


      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg bg-card border shadow-xs">
        <Search
          value={filters.search || ""}
          onChange={handleSearchChange}
          placeholder="Search by name or email..."
          className="w-full sm:max-w-xs"
        />

        <div className="flex items-center gap-3">
          <div className="w-[130px] sm:w-[140px]">
            <Select
              value={filters.role || "ALL"}
              onValueChange={handleRoleFilterChange}
            >
              <SelectTrigger className="h-9 w-full">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-[130px] sm:w-[140px]">
            <Select
              value={filters.status || "ALL"}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="h-9 w-full">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>


      <UserTable filters={filters} setFilters={setFilters} />


      <UserFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}
