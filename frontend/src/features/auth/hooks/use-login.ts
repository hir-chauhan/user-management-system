import { API_ENDPOINTS } from "@/config/endpoints";
import usePostData from "@/hooks/usePostData";
import { useAuthStore, UserProfile } from "@/stores/auth-store";
import { useNavigate } from "@tanstack/react-router";
import { LoginFormValues } from "../schema";


export interface LoginResponseData {
  token: string;
  user: UserProfile;
}

interface UseLoginOptions {
  onSuccess?: (data: LoginResponseData) => void;
  onError?: (error: Error) => void;
}

export const useLogin = (options?: UseLoginOptions) => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return usePostData<LoginResponseData, LoginFormValues>({
    url: API_ENDPOINTS.AUTH.LOGIN,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      if (options?.onSuccess) {
        options.onSuccess(data);
      } else {
        navigate({ to: "/users" });
      }
    },
    onError: options?.onError,
  });
};
