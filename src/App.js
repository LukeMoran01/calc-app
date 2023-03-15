import './App.css';
import { useState } from 'react';

function Calculator() {
  const [number, setNumber] = useState(0);
  const [calc, setCalc] = useState(0);
  const [currentOp, setCurrentOp] = useState('');
  // Use to determine when to overwrite display number such as at start and after equals
  const [returned, setReturned] = useState(true); 

  function handleNumberPress(num) {
    if (returned) {
      setNumber(num);
      setReturned(false);
    } else {
      setNumber(+[number, num].join(''))
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
    setNumber(0);
    setCurrentOp(op)
  }

  function handleClear() {
    setNumber(0);
    setCalc(0);
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

  return (
    <div className="calculator">
      <Display primDisplay={number} secDisplay={calc} />
      <div className="numpad">
        {Array(10).fill(null).map((_, i) =>
          <Number key={i} num={i} press={() => handleNumberPress(i)} />)}
        <Decimal />
      </div>
      <div className="opspad">
        <Clear clear={handleClear} />
        <Operator operation={() => handleOperatorPress("+")} operator="+" />
        <Operator operation={() => handleOperatorPress("-")} operator="-" />
        <Operator operation={() => handleOperatorPress("*")} operator="*" />
        <Operator operation={() => handleOperatorPress("/")} operator="/" />
        <Equals equals={handleEquals}/>
      </div>
    </div>
  );
}

function Number({ num, press }) {
  return (
    <button onClick={press} className="number">{num}</button>
  );
}

function Decimal() {
  return (
    <button id="decimal" className="decimal">.</button>
  )
}

function Display({ primDisplay, secDisplay }) {
  return (
    <div id="display">
      <p id="secondary-display" className="display">{secDisplay}</p>
      <p id="primary-display" className="display">{primDisplay}</p>
      </div>
  )
}

function Operator({ operator, operation }) {
  return (
    <button onClick={operation} className="operator">{operator}</button>
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
