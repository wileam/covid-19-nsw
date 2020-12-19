import React from 'react';
import { formatNewNumber } from '../../utils';

export const NewNumber = ({ newNumber, showZero, showDonut, className }) => {
  if (newNumber === '') {
    // means not updated yet
    return <></>;
  } else {
    return (
      <small className={className || 'small ui today-new-number'}>
        {formatNewNumber(newNumber, showZero, showDonut)}
      </small>
    );
  }
};
