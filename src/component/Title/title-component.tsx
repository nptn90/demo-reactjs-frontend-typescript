import React, { Component } from 'react';

class Title extends Component<any, any> {
  
  render() {
    return (
      <div className="page-header">
        <h1>{this.props.mainTitle}
          <br/>
          <small>{this.props.subTitle}</small>
        </h1>
      </div>
    )
  };
};

export default Title;
