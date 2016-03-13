import React from 'react';
import Component from 'omniscient';
import Moment from 'moment';
import CVHeader from './cvHeader.jsx';
import CVEntry from './cvEntry.jsx';

const CVProjectTopic = Component('CVTopic', ({cursor, className, title, image, size}) => {

  const tableData = [];

  cursor.forEach((entry, i) => {
    const toDate = entry.get('to_date');
    if(tableData.length < size) {
      tableData.push(
        <tr key={i}>
            <td><CVEntry cursor={entry}/></td>
            <td className="entry-description"><div>{entry.get('descriptions')}</div></td>
       </tr>);
    }
  });

    return <div className={'topic ' + className}>
        <CVHeader image={image}/>
        <table>
          <tbody>
            {tableData}
          </tbody>
        </table>
    </div>;
});

export default CVProjectTopic;
