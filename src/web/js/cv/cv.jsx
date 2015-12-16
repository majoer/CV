import React from 'react';
import Component from 'omniscient';
import Get from '../data-request';
import PersonaliaColumn from './personaliaColumn.jsx';
import CVTopic from './cvTopic.jsx';
import SimpleCVTopic from './SimpleCVTopic.jsx';
import {CVWorkEntry, CVEducationEntry, CVProjectEntry} from './cvEntry.jsx';

const ReactCV = Component('ReactCV', ({cursor}) => {
    if (cursor.size == null) {
        Get(cursor, 'http://localhost:8081/cv');
        return <p>Laster inn CV</p>;
    } else if (cursor.get('error') != null) {
        return <p>En feil oppstod under henting av CV</p>;
    }

    const educationTopic = (table, entry) => {
      table.push(<CVEducationEntry cursor={entry}/>);
    }

    const workTopic = (table, entry) => {
      table.push(<CVWorkEntry cursor={entry}/>);
    }

    const projectTopic = (table, entry) => {
      table.push(<CVProjectEntry cursor={entry}/>);
    }

    return (
        <div className="cv">
            <PersonaliaColumn cursor={cursor}/>
            <div className="cv-body">
                <CVTopic handleEntry={educationTopic} size={3} cursor={cursor.get('educations')} image="img/education.png" className="cv-body-topic-first"/>
                <CVTopic handleEntry={workTopic} size={3} cursor={cursor.get('work_experiences')} image="img/tie.png"/>
                <CVTopic handleEntry={projectTopic} size={1} cursor={cursor.get('projects')} image="img/hammer.png"/>
                <div className="cv-body-footer">
                    <SimpleCVTopic className="cv-body-footer-skills" cursor={cursor} extract={["skills", 'software']} image="img/settings.png"/>
                    <SimpleCVTopic className="cv-body-footer-interests" cursor={cursor.get('profile')} extract={["interests"]} image="img/comments.png"/>
                </div>
            </div>
        </div>
    )
});

export default ReactCV;
