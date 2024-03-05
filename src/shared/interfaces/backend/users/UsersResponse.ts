import { User } from '@shared/interfaces/user/User';
import { ApiResponse } from '../response';

export type AllUsersResponse = User[];
export type UserResponse = ApiResponse<User>;
