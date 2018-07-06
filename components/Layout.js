import React from 'react';
import Navigation from './Navigation';

export default ({children}) => (
  <div className="container-fluid">
    <Navigation />
    {children}
  </div>
);
