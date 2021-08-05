import {AuthState} from './user'

export type UserAccountState = ChangeAuthTemplate

export enum UserAction {
    CHANGE_AUTH_ACTION,
}

export interface ChangeAuthTemplate {
    type: UserAction.CHANGE_AUTH_ACTION
    payload: AuthState
}