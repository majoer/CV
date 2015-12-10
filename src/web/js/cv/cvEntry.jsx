import React from 'react';
import Component from 'omniscient';

let CVEntry = Component('CVEntry', ({cursor, aggregated}) => {
    let result = [];
    let header = '';
    if(!aggregated) {
      header = cursor.get('org') + ', ';
    }
    header += cursor.get('title');

    cursor.get('descriptions').forEach((entry, id) => {
      result.push(<li key={id} className='contentLine'>{entry}</li>);
    });

    return (
        <table className="entry">
            <tbody>
                <tr className='headline'>
                    <td>{cursor.get('from_date')}-{cursor.get('to_date')}</td>
                    <td>{header}</td>
                </tr>
                <tr>
                    <td className='field'>{cursor.get('field')}</td>
                    <td className='content'>
                        {result}
                    </td>
                </tr>
            </tbody>
        </table>
    );
});

export default CVEntry;
