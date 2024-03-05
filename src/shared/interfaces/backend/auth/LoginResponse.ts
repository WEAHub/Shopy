import { User } from '@shared/interfaces/user/User';

export interface LoginResponseBody extends User {
  accessToken: string;
  refreshToken: string;
}
