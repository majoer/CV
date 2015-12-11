import React from 'react';
import Component from 'omniscient';
import PersonaliaEntry from './personaliaEntry.jsx';

const PersonaliaColumn = Component('PersonaliaColumn', ({cursor}) => {

    const personalia = cursor.get('personalia');

    return <div className='personaliaColumn'>

        <h1>{personalia.get('first_name')}</h1>
        <h2>{personalia.get('last_name')}</h2>


        <img className='profilePicture' src='img/grayscale1.jpg' width="160px" height="160"/>


    </div>;
});

export default PersonaliaColumn;
