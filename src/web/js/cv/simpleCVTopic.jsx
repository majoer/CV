import React from 'react';
import Component from 'omniscient';
import Moment from 'moment';
import CVHeader from './cvHeader.jsx';
import CVEntry from './cvEntry.jsx';

const SimpleCVTopic = Component('SimpleCVTopic', ({cursor, extract, className, image}) => {

  const result = [];

    extract.forEach((title, i) => {
      const list = [];
      cursor.get(title).forEach((entry, j) => {
        list.push(<li key={j}>{entry}</li>);
      });

      result.push(
        <div className="cv-body-simpleTopic" key={'list' + i}>
          <h2 key={'h2' + i}>{title.capitalizeFirstLetter()}</h2>
          <ul>
            {list}
          </ul>
        </div>);
    });
    return <div className={className}>
        <CVHeader image={image}/>
        {result}
    </div>;
});

export default SimpleCVTopic;
