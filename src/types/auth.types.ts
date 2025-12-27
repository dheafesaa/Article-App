export interface SignInRequest {
  identifier: string;
  password: string;
}

export interface AuthUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface SignInResponse {
  jwt: string;
  user: AuthUser;
}
