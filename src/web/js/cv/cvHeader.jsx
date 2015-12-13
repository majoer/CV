import React from 'react';
import Component from 'omniscient';

export const CVHeader = Component('CVHeader', ({image}) => {

  return <div className="cv-header">
    <img className="cv-header-icon" src="img/grayscale1.jpg" width="24px" height="24px"/>
    <div className="test"><div className="cv-header-line"/></div>
  </div>
});

export default CVHeader;
