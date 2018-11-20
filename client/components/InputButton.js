import React from 'react';

const InputButton = ({handleInput, name, value}) => {
  return (
    <button id={name} onClick={() => handleInput(value)}>
      {value}
    </button>
  )
}

export default InputButton;
