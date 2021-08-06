import { AxiosError, AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import myAPI from '../commonService/myAPI';
import * as stringConstant from '../commonService/StringConst';
import { UserPersist } from "../Login/UserModel";
import { TReducers } from "../reducer";

const AdminPage: FC = () => {

  const [listUser, setListUser] = useState<UserPersist[]>([]);

  const auth = useSelector((state: TReducers) => state.userReducer.authState);

  useEffect(() => {
    getAllUser();
  }, [auth])

  function getAllUser() {
    return myAPI.get(stringConstant.GET_ALL_USERS)
      .then((response: AxiosResponse<UserPersist[]>) => {
        setListUser(response.data)
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>UserName</th>
          <th>Full Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {
          listUser.map((user: UserPersist) => {
            return (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default AdminPage