export type IAuthContext = {
  isAuth: boolean;
  user: UserData | null;
  loading: boolean;
  login: (token: string, userData: UserData) => void;
  logout: () => void;
};

export type UserData = {
  login: string;
  email: string;
  job: string;
  avatarUrl: string;
};

export type TAuth = {
  login: string;
  email: string;
  password: string;
};
