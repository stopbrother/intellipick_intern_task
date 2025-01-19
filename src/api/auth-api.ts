import {
  logindata,
  profileRequest,
  registerData,
  userInfo,
} from "../types/auth.types";
import { authClient } from "./axiosInstance";

export const register = async (authData: registerData) => {
  const { data } = await authClient.post("/register", authData);
  return data;
};

export const login = async (authData: logindata) => {
  const { data } = await authClient.post("/login", authData);
  return data;
};

export const getUserInfo = async () => {
  const { data } = await authClient.get<userInfo>("/user");
  return data;
};

export const updateProfile = async ({ avatar, nickname }: profileRequest) => {
  const formData = new FormData();

  if (avatar) formData.append("avatar", avatar);
  if (nickname) formData.append("nickname", nickname);

  const { data } = await authClient.patch("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
