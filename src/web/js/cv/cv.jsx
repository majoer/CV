import React from 'react';
import Component from 'omniscient';
import Get from '../data-request';
import PersonaliaColumn from './personaliaColumn.jsx';
import CVTopic from './cvTopic.jsx';
import SimpleCVTopic from './SimpleCVTopic.jsx';

const ReactCV = Component('ReactCV', ({cursor}) => {
    if (cursor.size == null) {
        Get(cursor, 'http://localhost:8081/cv');
        return <p>Laster inn CV</p>;
    } else if (cursor.get('error') != null) {
        return <p>En feil oppstod under henting av CV</p>;
    }

    return (
        <div>
            <PersonaliaColumn cursor={cursor}/>
            <div className="cv">
                <CVTopic cursor={cursor.get('educations')}/>
                <CVTopic cursor={cursor.get('work_experiences')}/>
                <div className="cv-footer">
                    <SimpleCVTopic className="cv-footer-skills" cursor={cursor} extract={["skills", 'software']}/>
                    <SimpleCVTopic className="cv-footer-interests" cursor={cursor.get('profile')} extract={["interests"]}/>
                </div>
            </div>
        </div>
    )
});

export default ReactCV;
