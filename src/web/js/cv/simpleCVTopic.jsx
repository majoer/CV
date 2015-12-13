import React from 'react';
import Component from 'omniscient';
import Moment from 'moment';
import CVHeader from './cvHeader.jsx';
import CVEntry from './cvEntry.jsx';

const SimpleCVTopic = Component('SimpleCVTopic', ({cursor, extract, className}) => {

  const result = [];

    extract.forEach((title, i) => {
      const list = [];
      cursor.get(title).forEach((entry, j) => {
        list.push(<li key={j}>{entry}</li>);
      });

      result.push(
        <div className="cv-simpleTopic" key={'list' + i}>
          <h2 key={'h2' + i}>{title.capitalizeFirstLetter()}</h2>
          <ul>
            {list}
          </ul>
        </div>);
    });
    return <div className={className}>
        <CVHeader img=""/>
        {result}
    </div>;
});

export default SimpleCVTopic;
