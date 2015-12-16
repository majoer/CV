import React from 'react';
import Component from 'omniscient';

const CVEntry = Component('CVEntry', ({cursor}) => {
    return <div className="cv-body-entry">
      <h3 className="cv-body-entry-title">{cursor.get('title').toUpperCase()}</h3>
      <h3 className="cv-body-entry-org">{cursor.get('org').toUpperCase()}</h3>
      <div className="cv-body-entry-city">{cursor.cursor(['location', 'city']).deref()}</div>
      <div className="cv-body-entry-date">{cursor.get('from_date') + ' - ' + cursor.get('to_date')}</div>
    </div>
});

export default CVEntry;
