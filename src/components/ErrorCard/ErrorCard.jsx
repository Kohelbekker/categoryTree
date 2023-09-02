import React from 'react';
import classes from './ErrorCard.module.css';

const ErrorCard = ({ errMessage }) => {
  const msgArray = errMessage.split('\n');

  return (
    <section className={classes.section}>
      <div className={classes.alert}>
        <h2 className={classes['alert-title']}>Error</h2>
        {msgArray.map((msg) => {
          return <p className={classes['alert-content']}>{msg}</p>;
        })}
      </div>
    </section>
  );
};

export default ErrorCard;
