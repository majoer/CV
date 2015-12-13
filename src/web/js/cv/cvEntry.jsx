import React from 'react';
import Component from 'omniscient';

const CVEntry = Component('CVEntry', ({cursor}) => {
    return <div className="cv-entry">
      <h3 className="cv-entry-title">{cursor.get('title')}</h3>
      <h3 className="cv-entry-org">{cursor.get('org')}</h3>
      <div className="cv-entry-city">{cursor.cursor(['location', 'city']).deref()}</div>
      <div className="cv-entry-date">{cursor.get('from_date') + ' - ' + cursor.get('to_date')}</div>
    </div>
});

export default CVEntry;
