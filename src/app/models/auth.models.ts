export interface LoginRequest {
  email: string;
  password: string;
  deviceFingerprintHash?: string;
  deviceName?: string;
}

export interface LoginResponse {
  token: string;
  expiresAt?: string;
  user: UserDto;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: 'STUDENT'|'INSTRUCTOR'|'FACULTY'|'ADMIN';
}

export interface UserDto {
  id: string;
  fullName: string;
  email: string;
  role: 'STUDENT'|'INSTRUCTOR'|'FACULTY'|'ADMIN';
}
