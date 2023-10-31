import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

export const userStateSelector = createFeatureSelector<UserState>('userState');
export const roleSelector = createSelector(
    userStateSelector,
    (state: UserState) => state.role
);
export const statusSelector = createSelector(
    userStateSelector,
    (state: UserState) => state.loadingStatus
)