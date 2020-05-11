import * as stringConstant from '../commonService/StringConst';
import myAPI from '../commonService/myAPI';
import {UserLogin} from './UserModel'

class LoginService {
    login(user: UserLogin) {
        return myAPI.post(stringConstant.LOGIN_URL, JSON.stringify(user))
        // return $.ajax({
        //     type: "POST",
        //     url: stringConstant.LOGIN_URL,
        //     data:  JSON.stringify(user),
        //     dataType: "json",
        //     contentType: "application/json; charset=utf-8"
        // });
    }
    refreshToken() {
        let token = sessionStorage.getItem('token');
        if(token) {
            return myAPI.post(stringConstant.REFRESH_URL, token);
        }
        return null;
    }
}

export default LoginService;