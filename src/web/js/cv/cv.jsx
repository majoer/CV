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
        <div className="cv">
            <PersonaliaColumn cursor={cursor}/>
            <div className="cv-body">
                <CVTopic className="cv-body-topic-first" cursor={cursor.get('educations')} image="img/education.png"/>
                <CVTopic cursor={cursor.get('work_experiences')} image="img/tie.png"/>
                <div className="cv-body-footer">
                    <SimpleCVTopic className="cv-body-footer-skills" cursor={cursor} extract={["skills", 'software']} image="img/settings.png"/>
                    <SimpleCVTopic className="cv-body-footer-interests" cursor={cursor.get('profile')} extract={["interests"]} image="img/comments.png"/>
                </div>
            </div>
        </div>
    )
});

export default ReactCV;
