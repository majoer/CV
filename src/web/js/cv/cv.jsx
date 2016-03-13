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
      table.push(<CVEducationEntry key={entry} cursor={entry}/>);
    };

    const workTopic = (table, entry) => {
      table.push(<CVWorkEntry key={entry}  cursor={entry}/>);
    };

    const projectTopic = (table, entry) => {
      table.push(<CVProjectEntry key={entry}  cursor={entry}/>);
    };

    const skillsEntry = (table, entry) => {
      table.push(<CVSkillsEntry key={entry}  cursor={entry}/>);
    };

    const interestsEntry = (table, entry) => {
      table.push(<CVInterestsEntry key={entry}  cursor={entry}/>);
    };

    const tmp = <CVTopic handleEntry={interestsEntry} size={3} cursor={cursor.cursor(['profile', 'interests'])} image="img/comments.png"/>

    return (
        <div className="cv">
            <div className="cv-body">

                <PersonaliaColumn cursor={cursor}/>
                <div className="bod">
                    <CVTopic handleEntry={workTopic} size={3} cursor={cursor.get('work_experiences')} image="img/tie.png"  className="topic-first topic-work"/>
                    <CVTopic handleEntry={educationTopic} size={2} cursor={cursor.get('educations')} image="img/education.png" className="topic-first topic-education"/>
                    <CVTopic handleEntry={projectTopic} size={3} cursor={cursor.get('projects')} image="img/hammer.png" className="topic-first topic-projects"/>
                    <div className="footer">
                       <SimpleCVTopic  cursor={cursor} extract={[{name: "Ferdigheter", cursor: "skills"}, {name: "Software", cursor: 'software'}]} image="img/settings.png" className="footer-skills"/>
                       <SimpleCVTopic cursor={cursor.get('profile')} extract={[{name: "Interesser", cursor: "interests"}]} image="img/comments.png" className="footer-interests" />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ReactCV;
