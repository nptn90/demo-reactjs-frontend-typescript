import React, { FC } from 'react';

const Detail: FC = (props: any) => {
  let courseId = props.match.params.cid;
  return (
    <div>
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">{courseId}</h3>
        </div>
        <div className="panel-body">

        </div>
      </div>
    </div>
  );
}

export default Detail;