import React from 'react';
import Navigation from '../components/navigation';
import styles from './app.css';

export default ({children}) => (
    <div className={`container-fluid ${styles.app}`}>
        <Navigation />
        {children}
    </div>
);
