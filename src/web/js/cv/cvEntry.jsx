import React from 'react';
import Component from 'omniscient';

export const CVEducationEntry = Component('CVEntry', ({cursor}) => {
    return <tr>
        <td>
            <div className="entry">
                <h3 className="entry-org">{cursor.get('org').toUpperCase()}</h3>
                <div className="entry-city">{cursor.cursor(['location', 'city']).deref()}</div>
                <div className="entry-date">{cursor.get('from_date') + ' - ' + cursor.get('to_date')}</div>
            </div>
        </td>
        <td >
            <h3 className="entry-title">{cursor.get('title').toUpperCase()}</h3>
            <div className="entry-description">{cursor.get('descriptions')}</div>
        </td>
    </tr>
});

export const CVWorkEntry = Component('CVProjectEntry', ({cursor}) => {  
    return <tr>
        <td>
            <div className="entry">
                <h3 className="entry-title">{cursor.get('title').toUpperCase()}</h3>
                <h3 className="entry-org">{cursor.get('org').toUpperCase()}</h3>
                <div className="entry-city">{cursor.cursor(['location', 'city']).deref()}</div>
                <div className="entry-date">{cursor.get('from_date') + ' - ' + cursor.get('to_date')}</div>
            </div>
        </td>
        <td >
            <div className="entry-description">{cursor.get('descriptions')}</div>
        </td>
    </tr>
});

export const CVProjectEntry = Component('CVProjectEntry', ({cursor}) => {
    return <tr>
        <td>
            <div className="entry">
                <h3 className="entry-org">{cursor.get('org').toUpperCase()}</h3>
                <div className="entry-city">{cursor.cursor(['location', 'city']).deref()}</div>
                <div className="entry-date">{cursor.get('from_date') + ' - ' + cursor.get('to_date')}</div>
            </div>
        </td>
        <td >
            <p className="entry-title">{cursor.get('title')}</p>
            <div className="entry-description">{cursor.get('descriptions')}</div>
        </td>
    </tr>
});

export const CVInterestsEntry = Component('CVInterestsEntry', ({cursor}) => {
    return <tr>
        <td>{cursor}</td>
    </tr>
});

export const CVSkillsEntry = Component('CVSkillsEntry', ({cursor}) => {
    return <tr>
        <td>
            <div className="entry">
                <h3 className="entry-org">{cursor.get('org').toUpperCase()}</h3>
                <div className="entry-city">{cursor.cursor(['location', 'city']).deref()}</div>
                <div className="entry-date">{cursor.get('from_date') + ' - ' + cursor.get('to_date')}</div>
            </div>
        </td>
        <td >
            <p className="entry-title">{cursor.get('title')}</p>
            <div className="entry-description">{cursor.get('descriptions')}</div>
        </td>
    </tr>
});
