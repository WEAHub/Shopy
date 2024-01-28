import { createReducer, on } from "@ngrx/store";
import { EntityDataState } from "@shared/interfaces/store/common/EntityDataState";
import { User } from "@shared/interfaces/user/User";
import { login, onLoginError, onLoginSuccess } from "../actions/auth.actions";

export const initialAuthState: EntityDataState<User> = {}

export const authReducer = createReducer<EntityDataState<User>>(
  { ...initialAuthState },
  on(login, (state) => {
    return {
      ...state,
      error: '',
      entity: undefined,
      loading: true,
    }
  }),
  on(onLoginSuccess, (state, {userData}) => {
    return {
      ...state,
      entity: userData,
      loading: false,
      error: ''
    }
  }),
  on(onLoginError, (state, action) => {
    return {
      ...initialAuthState,
      error: action.error
    }
  })
)
