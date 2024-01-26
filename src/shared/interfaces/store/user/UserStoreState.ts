import { User } from "../../user/User";
import { EntityDataState } from "../common/EntityDataState";

export interface UserState {
  user: EntityDataState<User>
}