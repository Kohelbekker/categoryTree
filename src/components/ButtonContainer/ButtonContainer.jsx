import React from 'react';
import classes from './ButtonContainer.module.css';

const ButtonContainer = ({ setReload, onTreeSave }) => {
  const handleResetClick = () => {
    setReload((prevState) => !prevState);
  };

  return (
    <div className={classes['button-container']}>
      <button className={classes.button} onClick={onTreeSave}>
        Save
      </button>
      <button className={classes.button} onClick={handleResetClick}>
        Reset
      </button>
    </div>
  );
};

export default ButtonContainer;
