import { createReducer } from '@ngrx/store';
import { EntityDataState } from '@shared/interfaces/store/common/EntityDataState';
import { User } from '@shared/interfaces/user/User';

export const initialCartState: EntityDataState<User> = {};

export const cartReducer = createReducer<EntityDataState<User>>({
  ...initialCartState,
});
