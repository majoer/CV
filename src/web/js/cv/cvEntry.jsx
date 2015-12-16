import React from 'react';
import Component from 'omniscient';

export const CVWorkEntry = Component('CVProjectEntry', ({cursor}) => {
    return <tr>
        <td className="cv-body-entry">
            <h3 className="cv-body-entry-title">{cursor.get('title').toUpperCase()}</h3>
            <h3 className="cv-body-entry-org">{cursor.get('org').toUpperCase()}</h3>
            <div className="cv-body-entry-city">{cursor.cursor(['location', 'city']).deref()}</div>
            <div className="cv-body-entry-date">{cursor.get('from_date') + ' - ' + cursor.get('to_date')}</div>
        </td>
        <td className="cv-body-entry-description">
            <div>{cursor.get('descriptions')}</div>
        </td>
    </tr>
});

export const CVProjectEntry = Component('CVProjectEntry', ({cursor}) => {
    return <tr>
        <td className="cv-body-entry">
            <h3 className="cv-body-entry-title"></h3>
            <h3 className="cv-body-entry-org">{cursor.get('org').toUpperCase()}</h3>
            <div className="cv-body-entry-city">{cursor.cursor(['location', 'city']).deref()}</div>
            <div className="cv-body-entry-date">{cursor.get('from_date') + ' - ' + cursor.get('to_date')}</div>
        </td>
        <td className="cv-body-entry-description">
          {cursor.get('title').toUpperCase()}
            <div>{cursor.get('descriptions')}</div>
        </td>
    </tr>
});

export const CVEducationEntry = Component('CVEntry', ({cursor}) => {
    return <tr>
        <td className="cv-body-entry">
            <h3 className="cv-body-entry-title">{cursor.get('title').toUpperCase()}</h3>
            <h3 className="cv-body-entry-org">{cursor.get('org').toUpperCase()}</h3>
            <div className="cv-body-entry-city">{cursor.cursor(['location', 'city']).deref()}</div>
            <div className="cv-body-entry-date">{cursor.get('from_date') + ' - ' + cursor.get('to_date')}</div>
        </td>
        <td className="cv-body-entry-description">
            <div>{cursor.get('descriptions')}</div>
        </td>
    </tr>
});
