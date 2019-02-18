import React from 'react';
import Authorize from '../Authorize';
import './style.css';

const Header = props => {
  return (
    <header>
      <h2 className='title'>Test Project for BeeJee</h2>
      <Authorize />
    </header>
  );
}

export default Header;