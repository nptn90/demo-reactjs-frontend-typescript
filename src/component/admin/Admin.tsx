import { AxiosError, AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import myAPI from '../commonService/myAPI';
import * as stringConstant from '../commonService/StringConst';
import { UserPersist } from "../Login/UserModel";
import { TReducers } from "../reducer";
import styles from "./styles.module.scss";
import classNames from 'classnames'
import { toast } from "react-toastify";

const AdminPage: FC = () => {

  const [listUser, setListUser] = useState<UserPersist[]>([]);
  const [isShowActions, setIsShowActions] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>('');

  const auth = useSelector((state: TReducers) => state.userReducer.authState);

  useEffect(() => {
    getAllUser();
  }, [auth])

  useEffect(() => {
    getAllUser();
  }, [auth])


  function getAllUser() {
    return myAPI.get(stringConstant.GET_ALL_USERS)
      .then((response: AxiosResponse<UserPersist[]>) => {
        setListUser(response.data)
      })
      .catch((err: AxiosError) => {
        toast.error("Get all user fail")
      })
  }

  function hanleDeletUser(userName: string) {
    return myAPI.delete(stringConstant.DELETE_USERS(userName))
      .then((response: AxiosResponse) => {
        setListUser(listUser.filter(item => item.name !== userName))
      })
      .catch((err: AxiosError) => {
        console.log(err)
        toast.error("cannot delete user")
      })
  }

  function handleShowAction(event: any) {
    setSelectedUser(event.currentTarget.children[0].innerText)
    setIsShowActions(true)
  }

  const actions = isShowActions 
  ? (
    <div className={styles.buttonWrapper}>
        <button className={classNames("btn btn-block", styles.buttonApp)}
        onClick={() => hanleDeletUser(selectedUser)}>Delete User: {selectedUser}</button>
    </div>
  ) 
  : null

  return (
    <>
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
              <tr key={user.email} onClick={handleShowAction}>
                <td>{user.name}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    {actions}
    </>
  )
}

export default AdminPage