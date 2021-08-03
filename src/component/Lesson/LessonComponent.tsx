import React, { FC } from 'react';

const Lesson: FC<{ lessonsName: string }> = ({ lessonsName }) => {
  return (
    <li className="list-group-item">
      {lessonsName}
    </li>
  )
};

export default Lesson;
