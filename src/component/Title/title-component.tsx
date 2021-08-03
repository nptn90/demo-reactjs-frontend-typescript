import React, { FC } from 'react';

const Title: FC<TitleProps> = ({mainTitle, subTitle}) => {
  return (
    <div className="page-header">
      <h1>{mainTitle}
        <br />
        <small>{subTitle}</small>
      </h1>
    </div>
  )
};

type TitleProps = {
  mainTitle: string,
  subTitle: string
}

export default Title;
