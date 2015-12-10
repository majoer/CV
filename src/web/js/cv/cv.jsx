import React from 'react';
import Component from 'omniscient';
import Get from '../data-request';
import PersonaliaColumn from './personaliaColumn.jsx';
import CVTopic from './cvTopic.jsx';
import AggregatedCVTopic from './aggregatedCVTopic.jsx';

const ReactCV = Component('ReactCV', ({cursor}) => {
    if (cursor.size == null) {
        Get(cursor, 'http://localhost:8081/cv');
        return <p>Laster inn CV</p>;
    } else if (cursor.get('error') != null) {
        return <p>En feil oppstod under henting av CV</p>;
    }

    return (
        <div>
          <PersonaliaColumn cursor={cursor.get('profile')}/>
            <div className="cv">
                <h1>{cursor.get('cv_title')}</h1>
                <CVTopic cursor={cursor.get('educations')} title='Utdanning'/>
                <CVTopic cursor={cursor.get('work_experiences')} title='Arbeidserfaring'/>
                <AggregatedCVTopic cursor={cursor.get('projects')} title='Prosjekter' aggregatedBy='org'/>
            </div>
        </div>
    )
});

export default ReactCV;
