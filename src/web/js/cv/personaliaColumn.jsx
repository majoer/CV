import React from 'react';
import Component from 'omniscient';
import PersonaliaEntry from './personaliaEntry.jsx';

const SocialNetwork = Component('SocialNetwork', ({cursor, imgUrl}) => {
    const url = cursor.get('url');
    const profile = cursor.get('profile');
    const link = 'http://' + url + profile;

    return <div className="personaliaColumn-contact socialNetwork">
        <a href={link}>
            <img className="socialNetwork-icon" src={imgUrl}/>
            <div className="socialNetwork-text">
                <h3 className="socialNetwork-text-url">{cursor.get('url').toUpperCase()}</h3>
                <h3 className="socialNetwork-text-profile">{cursor.get('profile').toUpperCase()}</h3>
            </div>
        </a>
    </div>
});

const PersonaliaColumn = Component('PersonaliaColumn', ({cursor}) => {
    const profile = cursor.cursor('profile');
    const personalia = profile.get('personalia');
    const socialNetworks = profile.cursor(['contact', 'networks']);

    return <div className='personaliaColumn'>
        <div className="personaliaColumn-padding">
            <div className='personaliaColumn-name'>
                <h1>{personalia.get('first_name')}</h1>
                <h2>{personalia.get('last_name')}</h2>
            </div>

            <img className='personaliaColumn-profilePicture' src='img/grayscale1.jpg' width="160px" height="160"/>

            <p className='personaliaColumn-keyQualifications'>{cursor.get('key_qualifications')}</p>

            <div className="personaliaColumn-socialNetworks">
                <SocialNetwork cursor={socialNetworks.find((o) => o.get('name') == "Github")} imgUrl="img/github.png"/>
            </div>
        </div>;
    </div>
});

export default PersonaliaColumn;
