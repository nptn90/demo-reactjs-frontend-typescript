import { AuthState } from "./user";
import { UserAccountState } from "./user-account-template";
import {UserAction} from './user-account-template'

export function changeAuth(authResponse: AuthState): UserAccountState {
  return {
    type: UserAction.CHANGE_AUTH_ACTION,
    payload: authResponse
  } as const
}