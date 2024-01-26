import {createFeatureSelector} from "@ngrx/store";
import { userFeatureKey } from "../feature-key";
import { UserFeatureState } from "../reducers";

export const getUserFeature = createFeatureSelector<UserFeatureState>(userFeatureKey);