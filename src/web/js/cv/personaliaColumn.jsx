import React from 'react';
import Component from 'omniscient';
import PersonaliaEntry from './personaliaEntry.jsx';

let PersonaliaColumn = Component('PersonaliaColumn', ({cursor}) => {
    return (
        <div className='personaliaColumn'>
            <img className='profilePicture' src='img/color.jpg' width="160px"/>
              <PersonaliaEntry title='Adresse' cursor={cursor.get('address')}/>
              <PersonaliaEntry title='Kontaktinformasjon' cursor={cursor.get('contact')}/>
              <PersonaliaEntry title='Fødselsdato' cursor={cursor.get('personalia').cursor('birth_date')}/>
              <PersonaliaEntry title='Språk' cursor={cursor.get('languages')}/>
        </div>
    );
});

export default PersonaliaColumn;
