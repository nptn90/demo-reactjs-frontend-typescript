import LoginService from '../Login/LoginService';

const threshold = 1 * 60 * 1000;
class IntervalService {

    loginService: LoginService = new LoginService();

    intervalRefreshToken(expirationDate: number) {
        let timeOut = expirationDate - new Date().getTime() - (1 * 60 * 1000);
        timeOut = threshold > timeOut ? threshold : timeOut;
        console.log(timeOut);
        setInterval(() => {
            let refrestTokenApi = this.loginService.refreshToken();
            if(refrestTokenApi) {
                refrestTokenApi
                .then(response => {
                    let resData = response.data;
                    console.log('new Token: ' + resData.token);
                    console.log('ntokenExpirationTime: ' + resData.expirationDate);
                    sessionStorage.setItem('token', resData.token);
                    sessionStorage.setItem('tokenExpirationTime', resData.expirationDate)
                })
                .catch(err => {
                    console.log(err);
                })
            } else {
                console.log('Cannot refresh token');
            }
        }, timeOut);
    }
}

export default IntervalService;