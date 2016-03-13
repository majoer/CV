import React from 'react';
import Component from 'omniscient';

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

export default SocialNetwork;
