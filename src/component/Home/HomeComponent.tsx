import React, { FC, useState } from 'react';
import Course from '../Course/CourseComponent';
import Title from '../Title/title-component';
import courseData from '../mockData/course.json'

const HomeComponent: FC = () => {

  const [mainTitle, setMainTitle] = useState("Main Title")
  const [subTitle, setSubTitle] = useState("Sub Title")

  const handleChangeTitle = (newTitle: string) => {
    setMainTitle(newTitle)
    setSubTitle(newTitle)
  }

    const items = courseData;

    const elmCourse = items.map((item, index) =>
        <Course key={index} courseId={item.id} name={item.name} time={item.time} free={item.free} lessons={item.lessons} onChangeTitle={(newTitle: string) => handleChangeTitle(newTitle)}> {item.desc} </Course>
      );
    return (
      <div>
        <Title mainTitle={mainTitle} subTitle = {subTitle}/>
        <div className="row">
          {elmCourse}
        </div>
      </div> 

    )  
};







export default HomeComponent;
