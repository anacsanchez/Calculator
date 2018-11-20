import React, { Component } from 'react';
import { InputButton } from './index';

class Calculator extends Component {
  constructor(props) {
    super(props);
      this.state = {
        equation: '',
        input: '0'
      }
  }

  clearInput = () => {
    this.setState({
      equation: '',
      input: 0
    })
  }

  addInput = (val) => {

    let { input } = this.state;
    let value = val.toString();
    if(value == '=') {
      if (!input.length || this.state.equation.indexOf('=') !== -1) {
        return;
      }
      else {
        let result = calcEquation(this.state.equation).toString();
        this.setState({
          equation: this.state.equation + "=" + result,
          input: result
        })
      }
    }
    else if(this.state.equation.indexOf('=') !== -1) {
      if (isOperator(value)) {
        this.setState({
          equation: this.state.input + value,
          input: value
        })
      }
      else {
        this.setState({
          equation: value,
          input: value
        })
      }
    }
    else if(value == '.') {
      if (input.indexOf('.') == -1) {
        this.setState({
          equation: this.state.equation + value,
          input: input + value
        })
      }
    }
    else if(input == '0' && value == '0') {
      return;
    }
    else if((input == '0') || (isOperator(this.state.input) && !isOperator(value)) || (isOperator(value) && !isOperator(input[input.length -1]))){
      this.setState({
        equation: this.state.equation + value,
        input: value
      })
    }
    else if(isOperator(input) && isOperator(value)) {
      this.setState({
        equation: this.state.equation.slice(0, -1) + value,
        input: value
      })
    }
    else {
      this.setState({
        equation: this.state.equation + value,
        input: input + value
      })
    }
  }

  render() {
    return (
      <div>
        <div>Equation: {this.state.equation}</div>
        <div>Input: {this.state.input}</div>
        <ul>
        {
          Object.keys(inputBtns).map(key => <li key={key}><InputButton name={key} handleInput={this.addInput} value={inputBtns[key]} /></li>)
        }
        <li><button onClick={this.clearInput}>AC</button></li>
        </ul>
      </div>
    )
  }
}

export default Calculator;

function calcEquation(equation) {

  let operands = equation.split(/[/x+-]/g).filter(el=> el !== '').map(el => Number.parseFloat(el));
  let operators = equation.split(/[^/x+-]/g).filter(el => el !== '');
  if (!operators.length || operands.length<2) {
    return equation;
  }
  const allOps = ['/','x','+','-'];
  let i = 0;
  let j = 0;
  let result;
  while (j < allOps.length) {
    if (operators[i] == allOps[j]) {
      if(allOps[j] == '/') {
        result = operands[i]/operands[i+1]
      }
      else if (allOps[j] == 'x') {
        result = operands[i]*operands[i+1]
      }
      else if (allOps[j] == '+') {
        result = operands[i]+operands[i+1]
      }
      else if (allOps[j] == '-') {
        result = operands[i]-operands[i+1]
      }
      operands.splice(i, 2, result)
      operators.splice(i, 1);
    }
    ++i;
    if (i >= operands.length) {
      j++
      i=0;
    }
  }
  return Number.parseFloat(result.toPrecision(4));
}

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

function isOperator(input) {
  return input == '+' || input == '-' || input == 'x' || input == '/';
}
