import React from 'react';
import './Navbar.scss';
const Navbar = () => {
  return (
    <nav className='app__navbar'>
      <div className="app__navbar-logo">
        <h1>Shivani</h1>
      </div>
      <ul>
        {['home','about','work','skills','contact'].map((item) => (
          <li key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;