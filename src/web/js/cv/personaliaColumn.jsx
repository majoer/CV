import React from 'react';
import Component from 'omniscient';
import PersonaliaEntry from './personaliaEntry.jsx';
import SocialNetwork from './socialNetwork.jsx';

const PersonaliaColumn = Component('PersonaliaColumn', ({cursor}) => {
    const profile = cursor.cursor('profile');
    const personalia = profile.get('personalia');
    const socialNetworks = profile.cursor(['contact', 'networks']);


    return <div className='personaliaColumn'>
        <div className="padding">
            <div className='name'>
                <h1>{personalia.get('first_name')}</h1>
                <h2>{personalia.get('last_name')}</h2>
            </div>

            <img className='profilePicture' src='img/grayscale1.jpg' width="160px" height="160"/>

            <p className='keyQualifications'>{cursor.get('key_qualifications')}</p>

            <div className="socialNetworks">
                <SocialNetwork cursor={socialNetworks.find((o) => o.get('name') == "Github")} imgUrl="img/github.png"/>
                <p>Nettsiden er under konstuksjon</p>
            </div>
        </div>
    </div>
});

export default PersonaliaColumn;
