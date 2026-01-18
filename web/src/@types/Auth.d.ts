export interface User {
  id: number;
  email: string;
  name: string;
  picture: string | null;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (googleToken: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}
