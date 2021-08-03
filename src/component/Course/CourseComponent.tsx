import React, { FC, useRef, useState } from 'react';
import Lesson from '../Lesson/LessonComponent';
import { Link, Prompt, Redirect } from 'react-router-dom';
import toast from '../commonService/toastConfig'

const Course: FC<CourseProps> = ({ name, onChangeTitle, free, lessons, time, children, courseId }) => {

  const userNameRef: any = useRef()
  const [isShowOutline, setIsShowOutline] = useState(false)
  const [isBlocking, setIsBlocking] = useState(false)
  const [reDirectToRegisterPage, setReDirectToRegisterPage] = useState(false)

  const handleClick1 = () => {
    alert("click1");
  }

  const handleClick2 = (input: string) => {
    alert(input);
  }

  const handleClick3 = () => {
    alert(name);
  }

  const register = (event: any) => {
    let usernameValue = userNameRef.current.value;
    event.preventDefault();
    //event.target.reset();
    if (usernameValue) {
      setIsBlocking(false)
      setReDirectToRegisterPage(true)
    } else {
      toast.error("Cannot leave username!!");
    }

  }

  const handleToogleOutline = () => {
    setIsShowOutline(!isShowOutline)
  }

  const handleClickTitle = () => {
    onChangeTitle(name);
  }

  const setIsBlockingState = (event: any) => {
    setIsBlocking(event.target.value.length > 0)
  }

  const showButtonFree = () => {
    const isFree = free;
    if (isFree) {
      return (
        <div className="btn-group">
          <button type="button" onClick={handleClick1} className="btn btn-danger">Left</button>
          <button type="button" onClick={() => handleClick2("View 2")} className="btn btn-warning">Middle</button>
          <button type="button" onClick={handleClick3} className="btn btn-info">Right</button>
          <button type="button" onClick={handleClickTitle} className="btn btn-success">ChangeTitle</button>
        </div>
      )
    } else {
      return (
        <form onSubmit={(event) => register(event)}>
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-info" type="submit">Register!</button>
            </span>
            <input type="text" onChange={(event) => setIsBlockingState(event)} className="form-control" placeholder="UserName" ref={userNameRef} />
          </div>
        </form>

      )
    }
  }

  let outline;
  if (reDirectToRegisterPage) {
    return (<Redirect to={"/register/" + userNameRef.current.value} />);
  }
  if (isShowOutline) {
    const lessonesElm = lessons.map((value: any, key: any) => {
      return <Lesson key={key} lessonsName={value.name}></Lesson>
    });
    outline = <ul className="list-group">
      {lessonesElm}
    </ul>;
  }
  return (
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
      <Prompt when={isBlocking} message={(location: any) => `Are you sure you want to go to ${location.pathname}`} />
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">{name}</h3>
        </div>

        <div className="panel-body">
          <p>{time}</p>
          <p>{children}</p>
          <div className="btn-group">
            <p>
              <button type="button" onClick={handleToogleOutline} className="btn btn-success">Toogle outline</button>
              <Link to={"/detail/" + courseId} className="btn btn-default">See details</Link>
            </p>
          </div>
          {outline}
        </div>
        <div className="panel-footer">
          {showButtonFree()}
        </div>
      </div>
    </div>
  )
};

type CourseProps = {
  courseId: string
  name: string
  onChangeTitle: Function
  free: boolean
  lessons: Lesson[]
  time: string
}

type Lesson = {
  id: string,
  name: string
}

export default Course;
