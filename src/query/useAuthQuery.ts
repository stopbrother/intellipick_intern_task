import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { getUserInfo } from "../api/auth-api";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["authState"],
    queryFn: () => {
      const accessToken = localStorage.getItem("accessToken");
      return accessToken ? { accessToken } : null;
    },
    enabled: !!localStorage.getItem("accessToken"),
  });
};

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: getUserInfo,
    enabled: !!localStorage.getItem("accessToken"),
  });
};
