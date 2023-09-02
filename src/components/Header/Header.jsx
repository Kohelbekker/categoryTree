import React from 'react';
import classes from './Header.module.css';

const Header = () => {
  return (
    <section className={classes.header}>
      <h1 className={classes['header-text']}>Category Tree</h1>
    </section>
  );
};

export default Header;
