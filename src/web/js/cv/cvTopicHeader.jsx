import React from 'react';
import Component from 'omniscient';

const CVTopicHeader = Component('CVTopicHeader', ({subHeader, title}) => {

  let className;
  let content;

  if (subHeader) {
    className = 'topic-subheader';
    content = <h3>{title}</h3>
  } else {
    className = 'topic-header';
    content = <h2>{title}</h2>
  }

  return <div className={className}>
    {content}
  </div>
});

export default CVTopicHeader;
