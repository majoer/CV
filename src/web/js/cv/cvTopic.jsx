import React from 'react';
import Component from 'omniscient';
import Moment from 'moment';
import CVHeader from './cvHeader.jsx';
import CVEntry from './cvEntry.jsx';

const CVTopic = Component('CVTopic', ({cursor, className, title, image, size, handleEntry}) => {

  const tableData = [];

  cursor.forEach((entry, i) => {
    if(tableData.length < size) {
      handleEntry(tableData, entry);
    }
  });

    return <div className={'cv-body-topic ' + className}>
        <CVHeader image={image}/>
        <table>
          <tbody>
            {tableData}
          </tbody>
        </table>
    </div>;
});

export default CVTopic;
