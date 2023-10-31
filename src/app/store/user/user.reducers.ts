import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./user.state";
import { loadUser, loadUserSuccess, removeUser } from "./user.actions";

export const userReducer = createReducer(
    initialUserState,
    on(loadUser, state => ({...state, loadingStatus: 'loading' as const})),
    on(removeUser, () => ({role: null, loadingStatus: 'not-loaded' as const})),
    on(loadUserSuccess, (state, {role}) => ({role: role, loadingStatus: 'loaded' as const}))
);