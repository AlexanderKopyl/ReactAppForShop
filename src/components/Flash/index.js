import React, { useEffect, useState } from 'react';
import Bus from '../../Utils/Bus';

import './index.css';

export const Flash = () => {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');

    useEffect(() => {
        Bus.addListener('flash', ({message, type}) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setTimeout(() => {
                setVisibility(false);
            }, 8000);
        });


    }, []);

    useEffect(() => {
        if(document.querySelector('.close') !== null) {
            document.querySelector('.close').addEventListener('click', () => setVisibility(false));
        }
    });

    return (
        visibility && <div className={`alert-flash alert-${type}`}>
            <span className="close"><strong>X</strong></span>
            <p>{message}</p>
        </div>
    )
};