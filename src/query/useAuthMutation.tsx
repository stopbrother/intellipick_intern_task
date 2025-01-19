import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register, updateProfile } from "../api/auth-api";
import { QUERY_KEYS } from "./queryKeys";
import { profileRequest } from "../types/auth.types";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      alert(data.message);
      window.location.href = "/login";
    },
    onError: (error) => {
      console.error("회원가입실패", error);
      alert(error.message);
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH],
      });
      window.location.href = "/";
    },
  });
};

export const useProfileMutation = () => {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: (profileData: profileRequest) => updateProfile(profileData),
    onSuccess: (data) => {
      alert(data.message);
      queryclient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH],
      });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("accessToken");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH],
      });
      window.location.href = "/";
    },
  });
};
