import React from 'react';
import Component from 'omniscient';
import CVTopicHeader from './cvTopicHeader.jsx';
import CVEntry from './cvEntry.jsx'

const CVTopic = Component('CVTopic', ({cursor, title}) => {

    let result = [];

    cursor.forEach((entry, id) => {
      result.push(<CVEntry key={id} cursor={entry}/>);
    });

    return <div className='topic'>
        <CVTopicHeader title={title} subHeader={false}/>
        {result}
    </div>;
});

export default CVTopic;
