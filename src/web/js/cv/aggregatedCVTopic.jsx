import React from 'react';
import Component from 'omniscient';
import CVTopicHeader from './cvTopicHeader.jsx';
import CVEntry from './cvEntry.jsx';

const AggregatedCVTopic = Component('CollapsibleCVTopic', ({cursor, title, aggregatedBy}) => {
    let result = [];
    let subTopics = [];
    result.push(<CVTopicHeader key="header" title={title} subHeader={false}/>);

    cursor.forEach((entry, id) => {
        const test = entry.get(aggregatedBy);
        if (subTopics.indexOf(test) == -1) {
            subTopics.push(test);
            result.push(<CVTopicHeader key={'topic-' + id} title={test} subHeader={true}/>);
        }
        result.push(<CVEntry key={'entry' + id} cursor={entry} aggregated={true}/>);
    });

    return <div>
        {result}
    </div>;
});

export default AggregatedCVTopic;
