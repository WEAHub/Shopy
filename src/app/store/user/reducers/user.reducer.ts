import { createReducer, on } from "@ngrx/store";
import { EntityDataState } from "@shared/interfaces/store/common/EntityDataState";
import { User } from "@shared/interfaces/user/User";
import { login, onLoginError, onLoginSuccess } from "../actions/user.actions";

export const initialUserState: EntityDataState<User> = {}

export const userReducer = createReducer<EntityDataState<User>>(
  { ...initialUserState },
  on(login, (state) => {
    return {
      ...state,
      token: '',
      error: '',
      loading: true,
    }
  }),
  on(onLoginSuccess, (state, {userData}) => {
    return {
      ...state,
      ...userData,
      loading: false,
      error: ''
    }
  }),
  on(onLoginError, (state, action) => {
    return initialUserState
  })
)
