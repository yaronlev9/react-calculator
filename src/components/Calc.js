import React, { useState, useEffect } from 'react';
import { MathOperation, operationTypes } from './MathOperation';
import DigitButton from './DigitButton';

/**
 * A basic switch calcuation function
 * @param {*} operation The name or type of the operation used, for ex. : "sqrt" / "+"
 * @param {*} num1 The first num to use in the calculation
 * @param {*} num2 The second num to use in the calculation
 */
const numbers = ['0','1','2','3','4','5','6','7','8','9'];
function calculate(operation, num1, num2 = 0) {
  switch (operation) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    case '%':
      return num1 % num2;
    case 'x²':
      return Math.pow(num1, 2);
    case '√':
      return Math.sqrt(num1);
  }
}

function Calc() {
  /**
   * Add (0-9) to <DigitButton /> with value and onClick function as exlplained in the requirements
   * Add the correct types to MathOperation, if you are having problem make sure its written correctly compared to operationTypes array
   * This is a state machine, you'll need to work wisely with React.js State and Lifecycle functionality
   * You can use calculate function for your aid
   */
  const [firstNum, setFirstNum] = useState('');
  const [secondNum, setSecondNum] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState();

  function setNum(value){
    if (!secondNum){
      if (!operation){
        if (firstNum.toString()[0] === '0' && value.toString() === '0' && firstNum.toString().indexOf('.') === -1){
          return;
        }
        const num1 = firstNum.toString() + value.toString();
        setFirstNum(num1);
      }
      else {
        if (secondNum.toString()[0] === '0' && value.toString() === '0' && firstNum.toString().indexOf('.') === -1){
          return;
        }
        const num2 = secondNum.toString() + value.toString();
        setSecondNum(num2);
      }
    }
    else {
      if (secondNum.toString()[0] === '0' && value.toString() === '0' && firstNum.toString().indexOf('.') === -1){
        return;
      }
      const num2 = secondNum.toString() + value.toString();
      setSecondNum(num2);
      }
  }

  function handleOperation(value){
    if (!firstNum){
      return;
    }
    if (value === '√' || value === 'x²'){
      const res = calculate(value, parseFloat(firstNum));
      setFirstNum(res);
    }
    else if (value === 'AC'){
      setFirstNum('');
      setSecondNum('');
      setOperation('');
    }
    else if (value === '.'){
      if(!operation){
        const num1 = firstNum + '.';
        setFirstNum(num1);
      }
      else {
        if (!secondNum){
          setSecondNum('0.');
        }
        else {
          const num2 = secondNum + '.';
          setSecondNum(num2);
        }
      }
    }
    else if (value === '='){
      if (operation === '/' && parseFloat(secondNum) === 0){
        setFirstNum('Error');
        setSecondNum('');
        setOperation('');
        return;
      }
      const res = calculate(operation, parseFloat(firstNum), parseFloat(secondNum));
      setFirstNum(res);
      setSecondNum('');
      setOperation('');
    }
    else {
      setOperation(value);
    }
  }

  function showResult(){
    const first = firstNum === undefined ? '' : firstNum.toString();
    const second = secondNum === undefined ? '' : secondNum.toString();
    const res = first + operation + second;
    if (!res){
      setResult('0');
      return;
    }
    if (res === NaN){
      setResult(Infinity);
      return;
    }
    setResult(res);
  }
  useEffect( () => { showResult()})

  return (
    <div className='calculator'>
      <div className='result'>
        {result}
      </div>
      <div className='calculator-digits'>
      {operationTypes.map((item,i)=> 
        <MathOperation key = {i} type = {item} onClick = {handleOperation}/>
      )}
      {numbers.map((item,i)=> 
        <DigitButton key = {i} value = {i} onClick = {setNum}/>
      )}
    </div>
  </div>
  )};

export default Calc;
