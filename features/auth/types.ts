enum Role {
  "ADMIN",
  "USER"
}

export interface UserPayload {
  sub: string;
  id: string;
  email: string;
  name: string;
  roles: Role[];
  iat: number;
  exp: number;
}