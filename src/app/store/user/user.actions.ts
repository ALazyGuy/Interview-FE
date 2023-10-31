import { createAction, props } from "@ngrx/store";

export const loadUser = createAction('[User] Load');
export const loadUserSuccess = createAction('[User] Load success', props<{role: string}>());
export const removeUser = createAction('[User] Remove');