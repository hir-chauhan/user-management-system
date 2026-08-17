import { useState, Dispatch, SetStateAction } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User, UserFilters } from "../types";
import { useFetchUsers, useDeleteUser } from "../hooks/use-users";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { RoleBadge, StatusBadge } from "@/components/common/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { UserFormDialog } from "./user-form-dialog";
import { UserViewDialog } from "./user-view-dialog";
import {
  Eye,
  Edit2,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface UserTableProps {
  filters: UserFilters;
  setFilters: Dispatch<SetStateAction<UserFilters>>;
}

export const UserTable = ({ filters, setFilters }: UserTableProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | null>(
    null
  );

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedUserForView, setSelectedUserForView] = useState<User | null>(
    null
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { data: userResponse, isLoading } = useFetchUsers(filters);

  const deleteMutation = useDeleteUser(userToDelete?._id || "", () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  });

  const users = userResponse?.data || [];
  const meta = userResponse?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const getInitials = (first: string, last: string) => {
    return `${(first || "U")[0]}${(last || "S")[0]}`.toUpperCase();
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const handleSort = (field: string) => {
    setFilters((prev) => {
      if (prev.sortBy === field) {
        if (prev.sortOrder === "asc") {
          return { ...prev, sortBy: field, sortOrder: "desc", page: 1 };
        } else if (prev.sortOrder === "desc") {
          return { ...prev, sortBy: undefined, sortOrder: undefined, page: 1 };
        }
      }
      return { ...prev, sortBy: field, sortOrder: "asc", page: 1 };
    });
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  const handleOpenEdit = (user: User) => {
    setSelectedUserForEdit(user);
    setEditDialogOpen(true);
  };

  const handleOpenView = (user: User) => {
    setSelectedUserForView(user);
    setViewDialogOpen(true);
  };

  const handleOpenDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate();
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "firstName",
      header: () => (
        <button
          type="button"
          onClick={() => handleSort("firstName")}
          className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-primary transition-colors cursor-pointer group select-none py-1"
        >
          <span>Full Name</span>
          {filters.sortBy === "firstName" ? (
            filters.sortOrder === "asc" ? (
              <ArrowUp className="h-3.5 w-3.5 text-primary stroke-[2.5]" />
            ) : (
              <ArrowDown className="h-3.5 w-3.5 text-primary stroke-[2.5]" />
            )
          ) : (
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
          )}
        </button>
      ),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-foreground leading-tight">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs text-muted-foreground lg:hidden">
                {user.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.getValue("email")}
        </span>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.phone || "—"}
        </span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <RoleBadge role={row.getValue("role")} />,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(row.getValue("createdAt"))}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => handleOpenView(user)}
              title="View user details"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => handleOpenEdit(user)}
              title="Edit user"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => handleOpenDelete(user)}
              title="Delete user"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">

      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        pageCount={meta.totalPages}
        pageIndex={meta.page}
        pageSize={meta.limit}
        totalRecords={meta.total}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      
      <UserFormDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        user={selectedUserForEdit}
      />

      
      <UserViewDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        user={selectedUserForView}
      />

      
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User"
        description={
          userToDelete ? (
            <span>
              Are you sure you want to delete{" "}
              <strong>
                {userToDelete.firstName} {userToDelete.lastName}
              </strong>{" "}
              ? This action cannot be reversed.
            </span>
          ) : (
            "Are you sure you want to delete this user?"
          )
        }
        confirmText="Delete User"
        cancelText="Cancel"
        variant="destructive"
        icon={<Trash2 className="h-4 w-4" />}
        iconType="danger"
        isLoading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
