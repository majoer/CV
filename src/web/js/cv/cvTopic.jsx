import React from 'react';
import Component from 'omniscient';
import Moment from 'moment';
import CVHeader from './cvHeader.jsx';
import CVEntry from './cvEntry.jsx';

const CVTopic = Component('CVTopic', ({cursor, title}) => {

  const tableData = [];

  cursor.forEach((entry, i) => {
    const toDate = entry.get('to_date');
    if(tableData.length < 3) {
      tableData.push(
        <tr key={i}>
            <td><CVEntry cursor={entry}/></td>
            <td className="cv-entry-description"><div>{entry.get('descriptions')}</div></td>
       </tr>);
    }
  });

    return <div className='cv-topic'>
        <CVHeader img=""/>
        <table>
          <tbody>
            {tableData}
          </tbody>
        </table>
    </div>;
});

export default CVTopic;
