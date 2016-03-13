import React from 'react';
import Component from 'omniscient';
import Moment from 'moment';
import CVHeader from './cvHeader.jsx';
import CVEntry from './cvEntry.jsx';

const CVTopic = Component('CVTopic', ({cursor, className, title, image, size, height, handleEntry}) => {

  const tableData = [];
  // const scale = downscale == undefined ? 1 : parseFloat(downscale);
  // const height = (100 * (1 / topics) * (size / topics) * scale) + '%';

  cursor.forEach((entry, i) => {
    if(tableData.length < size) {
      handleEntry(tableData, entry);
    }
  });


    return <div className={'topic ' + className} style={{height: height}}>
        <CVHeader image={image}/>
        <table>
          <tbody>
            {tableData}
          </tbody>
        </table>
    </div>;
});

export default CVTopic;
