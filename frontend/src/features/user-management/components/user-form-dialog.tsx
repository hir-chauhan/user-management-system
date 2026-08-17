import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, UpdateUserInput } from "../types";
import { useCreateUser, useUpdateUser } from "../hooks/use-users";
import { Loader2 } from "lucide-react";
import { FormValues, formSchema } from "../schema";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  onSuccess?: () => void;
}

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "User" as "User" | "Admin",
  status: "Active" as "Active" | "Inactive",
  password: "",
};

export function UserFormDialog({
  open,
  onOpenChange,
  user,
  onSuccess,
}: UserFormDialogProps) {
  const isEditing = Boolean(user);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(
      formSchema.refine(
        (data) => {
          if (!isEditing && (!data.password || data.password.length < 6)) {
            return false;
          }
          if (
            isEditing &&
            data.password &&
            data.password.length > 0 &&
            data.password.length < 6
          ) {
            return false;
          }
          return true;
        },
        {
          message: "Password must be at least 6 characters",
          path: ["password"],
        },
      ),
    ),
    defaultValues: emptyForm,
  });

  const selectedRole = watch("role");
  const selectedStatus = watch("status");

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        status: user.status,
        password: "",
      });
    } else {
      reset(emptyForm);
    }
  }, [user, reset, open]);

  const createMutation = useCreateUser(() => {
    onOpenChange(false);
    reset();
    if (onSuccess) onSuccess();
  });

  const updateMutation = useUpdateUser(user?._id || "", () => {
    onOpenChange(false);
    reset();
    if (onSuccess) onSuccess();
  });

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (data: FormValues) => {
    if (isEditing && user) {
      const payload: UpdateUserInput = {};

      if (data.firstName !== user.firstName) {
        payload.firstName = data.firstName;
      }
      if (data.lastName !== user.lastName) {
        payload.lastName = data.lastName;
      }
      if (data.email !== user.email) {
        payload.email = data.email;
      }
      if ((data.phone || "") !== (user.phone || "")) {
        payload.phone = data.phone;
      }
      if (data.role !== user.role) {
        payload.role = data.role;
      }
      if (data.status !== user.status) {
        payload.status = data.status;
      }
      if (data.password && data.password.trim().length >= 6) {
        payload.password = data.password;
      }

      updateMutation.mutate(payload);
    } else {
      createMutation.mutate({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        role: data.role,
        status: data.status,
        password: data.password || "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Edit User" : "Create New User"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the user details below. Leave password blank to keep existing password."
              : "Enter user information to create a new user account."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 py-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                First Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="John"
                {...register("firstName")}
                disabled={isLoading}
              />
              {errors.firstName && (
                <p className="text-[11px] text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                Last Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Doe"
                {...register("lastName")}
                disabled={isLoading}
              />
              {errors.lastName && (
                <p className="text-[11px] text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Email Address <span className="text-destructive">*</span>
            </label>
            <Input
              type="email"
              placeholder="john.doe@example.com"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-[11px] text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              {...register("phone")}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                Role
              </label>
              <Select
                value={selectedRole}
                onValueChange={(val) =>
                  setValue("role", val as "Admin" | "User")
                }
                disabled={isLoading}
              >
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                Status
              </label>
              <Select
                value={selectedStatus}
                onValueChange={(val) =>
                  setValue("status", val as "Active" | "Inactive")
                }
                disabled={isLoading}
              >
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Password{" "}
              {!isEditing ? (
                <span className="text-destructive">*</span>
              ) : (
                <span className="text-[11px] text-muted-foreground font-normal">
                  (optional)
                </span>
              )}
            </label>
            <PasswordInput
              placeholder={isEditing ? "••••••••" : "Enter a strong password"}
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-[11px] text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="w-full text-xs sm:text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="gap-1.5 w-full text-xs sm:text-sm"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEditing ? "Save Changes" : "Create User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
