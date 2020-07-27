import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      prevValue: 0,
      curValue: '',
      answer: 0,
      computation: '',
      operator: '+'
    }
  }

  resetCalc(state) {
    state.prevValue = 0;
    state.curValue = '';
    state.answer = 0;
    state.computation = '';
    state.operator = '+';
  }

  evaluate(a, b, operator) {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
    }
  }

  handleClickButton(buttonValue) {
    let state = Object.assign({}, this.state);
    let operators = ['+', '-', '*', '/'];

    // operators
    if (operators.indexOf(buttonValue) >= 0) {
      // if last character is operator, return
      if (operators.indexOf(state.computation.slice(-1)) >= 0) return;

      state.prevValue = state.answer;
      state.curValue = '';
      state.answer = 0;
      state.operator = buttonValue;
    }

    // numbers
    if (typeof buttonValue === 'number') {
        state.curValue += buttonValue;
        state.answer = +(this.evaluate(state.prevValue, Number(state.curValue), state.operator).toFixed(2));
    }

    // '.' operator
    if (buttonValue === '.') {
      if (state.curValue.indexOf('.') >= 0) return;
      state.curValue += buttonValue;
    }


    // other buttons
    switch(buttonValue) {
      case 'clear':
        this.resetCalc(state);
        break;
      case 'squareRoot':
        state.answer = +(Math.sqrt(state.answer).toFixed(2));
        state.computation = `√(${this.state.computation})`;
        break;
      case '=':
        let answer = state.answer;
        this.resetCalc(state);
        state.curValue = String(answer);
        state.answer = answer;
        state.computation = answer.toString();
        break;
      default:
        state.computation += buttonValue;
    }

    this.setState(state);
  }


  render() {
    return (
      <div className='calculator'>
        <div className='calculator__display'>
            {this.state.answer}
          <div className='calculator__display__computation'>
            {this.state.computation}
          </div>
        </div>
        <form className='calculator__buttons'>
          <tr> 
            <td xs={6} className='calculator__button'><button onClick={() => this.handleClickButton('clear')}>C</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton('squareRoot')}>√</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton('+')}>+</button></td>
          </tr>
          <tr> 
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton(7)}>7</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton(8)}>8</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton(9)}>9</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton('-')}>-</button></td>
          </tr>
          <tr>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton(4)}>4</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton(5)}>5</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton(6)}>6</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton('*')}>*</button></td>
          </tr>
          <tr>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton(1)}>1</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton(2)}>2</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton(3)}>3</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton('/')}>/</button></td>
          </tr>
          <tr>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton(0)}>0</button></td>
            <td xs={3} className='calculator__button'><button onClick={() => this.handleClickButton('.')}>.</button></td>
            <td xs={6} className='calculator__button'><button onClick={() => this.handleClickButton('=')}>=</button></td>
          </tr>
        </form>
      </div>
    );
  }
}

export default Calculator;