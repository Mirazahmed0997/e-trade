import React, { useContext } from 'react';
import { Authcontext } from '../contexts/UserContext';

const About = () => {
    const {user}=useContext(Authcontext)
    return (
        <div>
            <span>
            {
                user?.email
            }
            </span>
        </div>
    );
};

export default About;