import { API_ENDPOINTS } from "@/config/endpoints";
import useFetchData from "@/hooks/useFetchData";
import usePostData from "@/hooks/usePostData";
import usePatchData from "@/hooks/usePatchData";
import useDeleteData from "@/hooks/useDeleteData";
import {
  User,
  UserFilters,
  UserListResponse,
  UserStatsResponse,
  CreateUserInput,
  UpdateUserInput,
} from "../types";

export const useFetchUsers = (filters: UserFilters = {}) => {
  return useFetchData<UserListResponse, UserFilters>({
    url: API_ENDPOINTS.USERS.BASE,
    params: filters,
  });
};

export const useFetchUserStats = () => {
  return useFetchData<UserStatsResponse>({
    url: API_ENDPOINTS.USERS.STATS,
  });
};

export const useUserDetails = (id?: string) => {
  return useFetchData<{ statusCode: number; data: User }>({
    url: id ? API_ENDPOINTS.USERS.GET_BY_ID(id) : "",
    enabled: Boolean(id),
  });
};

export const useCreateUser = (onSuccess?: (data: User) => void) => {
  return usePostData<User, CreateUserInput>({
    url: API_ENDPOINTS.USERS.CREATE,
    refetchQueries: [API_ENDPOINTS.USERS.BASE, API_ENDPOINTS.USERS.STATS],
    onSuccess,
  });
};

export const useUpdateUser = (id: string, onSuccess?: (data: User) => void) => {
  return usePatchData<User, UpdateUserInput>({
    url: API_ENDPOINTS.USERS.UPDATE(id),
    refetchQueries: [API_ENDPOINTS.USERS.BASE, API_ENDPOINTS.USERS.STATS],
    onSuccess,
  });
};

export const useDeleteUser = (id: string, onSuccess?: () => void) => {
  return useDeleteData<void>({
    url: API_ENDPOINTS.USERS.DELETE(id),
    refetchQueries: [API_ENDPOINTS.USERS.BASE, API_ENDPOINTS.USERS.STATS],
    onSuccess,
  });
};
