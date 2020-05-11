import React, { Component } from 'react';

class Lesson extends Component<any, any> {
  render() {
    return (
      React.createElement("li", {className: "list-group-item"}, this.props.lessonsName)
    )
  };
};

export default Lesson;
