import React from 'react';
import Component from 'omniscient';
import PersonaliaEntry from './personaliaEntry.jsx';

const SocialNetwork = Component('SocialNetwork', ({cursor, imgUrl}) => {
    const url = cursor.get('url');
    const profile = cursor.get('profile');
    const link = 'http://' + url + profile;

    return <a href={link} className="socialNetwork">
        <img className="socialNetwork-icon" src={imgUrl}/>
        <div className="socialNetwork-text">
                <p>{cursor.get('url')}</p>
                <p>{cursor.get('profile')}</p>
        </div>
    </a>
});

const PersonaliaColumn = Component('PersonaliaColumn', ({cursor}) => {
    const viewSocialNetworks = [
        {
            name: 'Github',
            url: 'github.png'
        }
    ];
    const profile = cursor.cursor('profile');
    const personalia = profile.get('personalia');
    const socialNetworks = profile.cursor(['contact', 'networks']);
    console.log(socialNetworks);
    console.log();

    return <div className='personaliaColumn'>

        <h1>{personalia.get('first_name')}</h1>
        <h2>{personalia.get('last_name')}</h2>

        <img className='profilePicture' src='img/grayscale1.jpg' width="160px" height="160"/>

        <p>{cursor.get('key_qualifications')}</p>

        <SocialNetwork cursor={socialNetworks.find((o) => o.get('name') == "Github")} imgUrl="img/github.png"/>
    </div>;
});

export default PersonaliaColumn;
