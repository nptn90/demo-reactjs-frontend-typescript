import React, { Component } from 'react';
import Course from '../Course/CourseComponent';
import Title from '../Title/title-component';
import courseData from '../mockData/course.json'

class HomeComponent extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.state = {
      mainTitle: "Main Title",
      subTitle: "Sub Title"
    }
  }

  handleChangeTitle(newTitle: string) {
    this.setState ({
      mainTitle: newTitle,
      subTitle: newTitle
    })
  }

  render() {
    const items = courseData;

    const elmCourse = items.map((item, index) =>
        <Course key={index} courseId={item.id} name={item.name} time={item.time} free={item.free} lessons={item.lessons} onChangeTitle={(newTitle: string) => this.handleChangeTitle(newTitle)}> {item.desc} </Course>
      );
    return (
      <div>
        <Title mainTitle={this.state.mainTitle} subTitle = {this.state.subTitle}/>
        <div className="row">
          {elmCourse}
        </div>
      </div> 

    )  
  };
};







export default HomeComponent;
