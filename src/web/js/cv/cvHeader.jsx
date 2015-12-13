import React from 'react';
import Component from 'omniscient';

export const CVHeader = Component('CVHeader', ({image}) => {

  return <div className="cv-header">
    <img src="img/grayscale1.jpg" width="24px" height="24px"/>
    <span className="cv-header-line"/>
  </div>
});

export default CVHeader;
