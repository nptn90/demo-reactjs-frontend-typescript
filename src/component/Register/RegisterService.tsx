import myAPI from '../commonService/myAPI';
import * as stringConstant from '../commonService/StringConst'
import { UserPersist } from '../Login/UserModel';

const RegisterService = {

    registerUser(user: UserPersist) {
        let url = stringConstant.REGISTER_URL;
        return myAPI.post(url, JSON.stringify(user));
    }

}

export default RegisterService;