import React, { Component } from 'react';
import { CalculatorButtons } from './index';
import { calcEquation, isOperator } from '../functions'

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
      <div id="calculator">
        <div id="equation">
          <p>{this.state.equation}</p>
        </div>
        <div id="display">
          <p>{this.state.input}</p>
        </div>
        <CalculatorButtons addInput={this.addInput} clearInput={this.clearInput} />
      </div>
    )
  }
}

export default Calculator;

