import React, { useState } from "react";
import audioFile from "./assets/aa.wav";
import Button from "./components/Button";
import "./style.css";
function App() {
  const [strToDisplay, setStrToDisplay] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [isPrank, setIsPrank] = useState(false);

  const operators = ["+", "-", "*", "/", "%"];

  const handleOnClick = (val) => {
    // Reset to initial state
    setIsPrank(false);

    // If a user pressed operator before any numbers
    if (operators.includes(val) && !strToDisplay.length) {
      return;
    }

    // Simply clear the string to display
    if (val === "AC") {
      setStrToDisplay("");
      return;
    }

    // Remove the last value from string to display
    if (val === "C") {
      setStrToDisplay(strToDisplay.slice(0, -1));
      return;
    }

    // Do not allow user to input any operator if the last char is "."
    const lastChar = strToDisplay.slice(-1);
    if (lastChar === "." && operators.includes(val)) {
      return;
    }

    // Handle operator is passed
    if (operators.includes(val)) {
      // Always capture the last operator to use it later on "." condition
      setLastOperator(val);

      const lastChar = strToDisplay.slice(-1);
      // Replace the last character with new operator if operator already exists
      if (operators.includes(lastChar)) {
        setStrToDisplay(strToDisplay.slice(0, -1) + val);
      } else {
        setStrToDisplay(strToDisplay + val);
      }
      return;
    }

    // Handle the total value generator
    if (val === "=") {
      // If the last character is a operator, ignore it and calculate the total
      const lastChar = strToDisplay.slice(-1);
      if (operators.includes(lastChar)) {
        total(strToDisplay.slice(0, -1));
        return;
      }
      total(strToDisplay);
      return;
    }

    if (val === ".") {
      // Do not allow user to start with "."
      if (!strToDisplay.length) {
        return;
      }
      // Do not allow user to input multiple "." in a row
      const lastChar = strToDisplay.slice(-1);
      if (lastChar === ".") {
        return;
      }

      // Do not allow user to input multiple "." without operator like 1.1.1
      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }

      // If the operator exists on the string, then check the last part of it after operator and then handle
      // it accordingly. 1.1+2.3
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = strToDisplay.slice(lastOperatorIndex);
      if (lastNumberSet.includes(".")) {
        return;
      }
    }

    // If a user just press on numbers, add the string and display
    setStrToDisplay(strToDisplay + val);
  };

  const randomNum = () => {
    const num = Math.round(Math.random() * 10);
    return num <= 3 ? num : 0;
  };

  const total = (displayValue) => {
    const prankVal = randomNum();
    if (prankVal) {
      setIsPrank(true);
      const audio = new Audio(audioFile);
      audio.play();
      const newValue = eval(displayValue) + prankVal;
      setStrToDisplay(newValue.toString());
    } else {
      setStrToDisplay(eval(displayValue).toString());
    }
  };

  const buttons = [
    { cls: "btn btn-ac", label: "AC" },
    { cls: "btn btn-c", label: "C" },
    { cls: "btn btn-per", label: "%" },
    { cls: "btn btn-divide", label: "/" },
    { cls: "btn btn-7", label: "7" },
    { cls: "btn btn-8", label: "8" },
    { cls: "btn btn-9", label: "9" },
    { cls: "btn btn-x", label: "*" },
    { cls: "btn btn-4", label: "4" },
    { cls: "btn btn-5", label: "5" },
    { cls: "btn btn-6", label: "6" },
    { cls: "btn btn-minus", label: "-" },
    { cls: "btn btn-1", label: "1" },
    { cls: "btn btn-2", label: "2" },
    { cls: "btn btn-3", label: "3" },
    { cls: "btn btn-plus", label: "+" },
    { cls: "btn btn-0", label: "0" },
    { cls: "btn btn-dot", label: "." },
    { cls: "btn btn-equals", label: "=" },
  ];
  return (
    <div className="wrapper">
      <div className="calculator">
        <div className={isPrank ? "display prank" : "display"}>
          {strToDisplay}
        </div>
        {buttons.map((item, index) => {
          return (
            <Button
              key={index}
              cls={item.cls}
              label={item.label}
              handler={handleOnClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
