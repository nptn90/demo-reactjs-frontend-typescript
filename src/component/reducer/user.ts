import { UserAccountState, UserAction } from "./user-account-template";

export interface ApplicationState {
  authState: AuthState
}

export interface AuthState {
  token: string
  currentUser: string
}

const initialState: ApplicationState = {
  authState: {
    token: '',
    currentUser: ''
  },
};

export const userReducer = (state = initialState, action: UserAccountState) => {
  switch (action.type) {
    case UserAction.CHANGE_AUTH_ACTION:
      const newState: ApplicationState = {
        ...state,
        authState: action.payload
      }
      return newState
    default:
      return state
  }
};

export default userReducer;