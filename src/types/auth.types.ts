export interface registerData {
  id: string;
  password: string;
  nickname: string;
}

export interface userInfo {
  id: string;
  nickname: string;
  avatar: string | null;
  success: boolean;
}

export type logindata = Omit<registerData, "nickname">;

export interface profileRequest {
  avatar?: File;
  nickname: string;
}

export interface profileResponse extends Omit<registerData, "password"> {
  avatar: string;
  message: string;
  success: boolean;
}
