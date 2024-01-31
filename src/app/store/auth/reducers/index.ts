// Reducers
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { User } from '@shared/interfaces/user/User';
import * as fromAuth from './auth.reducer';
export type AuthFeatureState = EntityDataState<User>;
export const authFeatureReducer = fromAuth.authReducer;
