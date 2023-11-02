export type LoadingStatus = 'loading' | 'loaded' | 'not-loaded'; 

export interface UserState {
    role: null | string;
    loadingStatus: LoadingStatus;
};

export const initialUserState: UserState = {
    role: null,
    loadingStatus: 'loading'
};