import React from 'react';
import Component from 'omniscient';
import Get from '../data-request.js';
import PersonaliaColumn from './personaliaColumn.jsx';
import CVTopic from './cvTopic.jsx';
import SimpleCVTopic from './simpleCVTopic.jsx';
import {CVWorkEntry, CVEducationEntry, CVProjectEntry, CVSkillsEntry, CVInterestsEntry} from './cvEntry.jsx';

const ReactCV = Component('ReactCV', ({cursor}) => {

    if (cursor.size == null) {
        Get(cursor, '/cv');
        return <p>Laster inn CV</p>;
    } else if (cursor.get('error') != null) {
        return <p>En feil oppstod under henting av CV</p>;
    }

    const totalTopics = 4;

    const educationTopic = (table, entry) => {
      table.push(<CVEducationEntry cursor={entry}/>);
    };

    const workTopic = (table, entry) => {
      table.push(<CVWorkEntry cursor={entry}/>);
    };

    const projectTopic = (table, entry) => {
      table.push(<CVProjectEntry cursor={entry}/>);
    };

    const skillsEntry = (table, entry) => {
      table.push(<CVSkillsEntry cursor={entry}/>);
    };

    const interestsEntry = (table, entry) => {
      table.push(<CVInterestsEntry cursor={entry}/>);
    };
console.log(cursor.cursor(['profile', 'interests']).toString());
const tmp = <CVTopic handleEntry={interestsEntry} size={3} cursor={cursor.cursor(['profile', 'interests'])} image="img/comments.png"/>
    return (
        <div className="cv">
            <PersonaliaColumn cursor={cursor}/>
            <div className="cv-body">
                <CVTopic handleEntry={workTopic} size={3} cursor={cursor.get('work_experiences')} image="img/tie.png"  className="cv-body-topic-first cv-body-topic-work"/>
                <CVTopic handleEntry={educationTopic} size={2} cursor={cursor.get('educations')} image="img/education.png" className="cv-body-topic-first cv-body-topic-education"/>
                <CVTopic handleEntry={projectTopic} size={3} cursor={cursor.get('projects')} image="img/hammer.png" className="cv-body-topic-first cv-body-topic-projects"/>
                <div className="cv-body-footer">
                   <SimpleCVTopic  cursor={cursor} extract={["skills", 'software']} image="img/settings.png" className="cv-body-footer-skills"/>;
                   <SimpleCVTopic cursor={cursor.get('profile')} extract={["interests"]} image="img/comments.png" className="cv-body-footer-interests" />
                </div>
            </div>
        </div>
    )
});

export default ReactCV;
