import React from 'react';
import Component from 'omniscient';

export const CVHeader = Component('CVHeader', ({image}) => {

    return <div className="cv-body-header">
        <div className="cv-body-header-icon">
            <img src={image} width="40px" height="40px"/>
        </div>
        <div className="cv-body-header-line"/>
    </div>
});

export default CVHeader;
