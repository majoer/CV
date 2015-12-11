import React from 'react';
import Component from 'omniscient';

const PersonaliaEntry = Component('PersonaliaEntry', ({cursor, title}) => {
    let result = [];

    cursor.forEach((entry, id) => {
      result.push(<li key={id} className='personaliaListElement'>{entry}</li>);
    })

    return (
        <ul className='personaliaList'>
            <li>
                <h3>{title}</h3>
            </li>
            {result}
        </ul>
    );
});

export default PersonaliaEntry;
