import React from 'react';

const { createContext, Component, useContext } = React;

const initialState = {
    authState: { 
        token: '',
        currentUser: ''
    },
    displayToken: () => {},
    login: (currentUser: string, appToken: any) => {}
  };


export const AuthContext = createContext(initialState);

export default class AuthenticationProvider extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            token: null,
            currentUser: null,
        }
    }
    
    render() {
        return (
            <AuthContext.Provider value={{
                authState: {
                    token: this.state.token,
                    currentUser: this.state.currentUser
                },
                displayToken: () => {
                    console.log("Token: " + this.state.token);
                },
                login: (currentUser: string, appToken: any) => {
                    this.setState ({
                        token: appToken.token,
                        currentUser: currentUser
                    });
                }
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export const useAuth = () => {
    return useContext(AuthContext);
}; 

