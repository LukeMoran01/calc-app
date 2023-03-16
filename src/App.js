import './App.css';
import { useState } from 'react';

/*
Need to refactor all code to treat number as a string just for this decimal test

*/

function Calculator() {
  const [number, setNumber] = useState('0');
  const [calc, setCalc] = useState('0');
  const [currentOp, setCurrentOp] = useState('');
  // Use to determine when to overwrite display number such as at start and after equals
  const [returned, setReturned] = useState(true); 

  // Seems to work in the new string system with decimals working
  // Next is operations
  function handleNumberPress(num) {
    if (returned && num === '0') {
      return;
    } else if(returned) {
      setNumber(num);
      setReturned(false);
    } else {
      setNumber([number, num].join(''));
    }
  }

  function performOperation(op) {
    switch(op) {
      case '+':
        setCalc(calc+number);
        break;
      case '-':
        setCalc(calc-number);
        break;
      case '*':
        setCalc(calc*number);
        break;
      case '/':
        setCalc(calc/number);
        break;
      default:
        setCalc(number)
        break;
    }
  }

  // Refactor ^^ this mess with the function at the bottom
  function handleOperatorPress(op) {
    performOperation(currentOp)
    setNumber('0');
    setCurrentOp(op)
    setReturned(true);
  }

  function handleClear() {
    setNumber('0');
    setCalc('0');
    setCurrentOp('');
    setReturned(true);
  }

  function handleEquals() {
    if (currentOp) {
      setNumber(performOp(number, calc, currentOp));
    } else {
      setNumber(calc);
    }
    setCalc(0);
    setCurrentOp('');
    setReturned(true);
  }

  function handleDecimal() {
    if (number.includes('.')) {
      return;
    } else {
      setNumber(`${number}.`);
    }
  }

  return (
    <div className="calculator">
      <SecDisplay secDisplay={calc} />
      <Display primDisplay={number}/>
      <div className="numpad">
        {Array(10).fill(null).map((_, i) =>
          <Number identity={idArray[i]} key={i} num={`${i}`} press={() => handleNumberPress(`${i}`)} />)}
        <Decimal decimalPress={handleDecimal} />
      </div>
      <div className="opspad">
        <Clear clear={handleClear} />
        <Operator identity='add' operation={() => handleOperatorPress("+")} operator="+" />
        <Operator identity='subtract' operation={() => handleOperatorPress("-")} operator="-" />
        <Operator identity='multiply' operation={() => handleOperatorPress("*")} operator="*" />
        <Operator identity='divide' operation={() => handleOperatorPress("/")} operator="/" />
        <Equals equals={handleEquals}/>
      </div>
    </div>
  );
}

function Number({identity, num, press }) {
  return (
    <button id={identity} onClick={press} className="number">{num}</button>
  );
}

function Decimal({decimalPress}) {
  return (
    <button onClick={decimalPress} id="decimal" className="decimal">.</button>
  )
}

function SecDisplay({secDisplay}) {
  return (
    <p id="secondary-display" className="display">{secDisplay}</p>
  )
}

function Display({ primDisplay}) {
  return (
      <p id="display" className="display">{primDisplay}</p>
  )
}

function Operator({ identity ,operator, operation }) {
  return (
    <button id={identity} onClick={operation} className="operator">{operator}</button>
  )
}

function Equals({equals}) {
  return (
    <button onClick={equals} id="equals" className="equals">=</button>
  )
}

function Clear({clear}) {
  return (
    <button onClick={clear} id="clear" className="clear">C</button>
  )
}

const idArray = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

function performOp(number, calc, op) {
  switch(op) {
    case '+':
      return calc+number;
    case '-':
      return calc-number;
    case '*':
      return calc*number;
    case '/':
      return calc/number;
    default:
      return number;
  }
}

export default Calculator;