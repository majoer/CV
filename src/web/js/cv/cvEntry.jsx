import React from 'react';
import Component from 'omniscient';

const CVEntry = Component('CVEntry', ({cursor}) => {
    return <div className="cv-cvEntry">
      <div>{cursor.get('title')}</div>
      <div>{cursor.get('org')}</div>
      <div>{cursor.cursor(['location', 'city']).deref()}</div>
      <div>{cursor.get('from_date') + ' - ' + cursor.get('to_date')}</div>
    </div>
});

export default CVEntry;
