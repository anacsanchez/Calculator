import React from 'react';
import { InputButton } from './index';

const CalculatorButtons = ({addInput, clearInput}) => {
  return (
    <div id="buttons">
      {
      Object.keys(inputBtns).map(key => {
        return <div key={key} className="input-button"><InputButton name={key} handleInput={addInput} value={inputBtns[key]} /></div>
      })
      }
      <div>
        <button id="clear" onClick={clearInput}>AC</button>
      </div>
    </div>
  )
}

export default CalculatorButtons;

const inputBtns = {
  "zero": 0,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
  "multiply": "x",
  "divide": "/",
  "subtract":"-",
  "add":"+",
  "decimal":".",
  "equals":"="
}
