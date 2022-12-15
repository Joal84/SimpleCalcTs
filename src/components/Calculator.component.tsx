import { useReducer, useEffect } from "react";
import "./calculator.css";
import DigitButton from "./DigitButton.component";
import OperationButton from "./OperationButton.component";

export enum ACTIONS {
  ADD_DIGIT = "add-digit",
  CHOOSE_OPERATION = "choose-operation",
  CLEAR = "clear",
  DELET_DIGIT = "delete-digit",
  EVALUTAE = "evaluate",
}
type addDigit = {
  type: typeof ACTIONS.ADD_DIGIT;
  payload: { digit: string };
};
type chooseOperation = {
  type: typeof ACTIONS.CHOOSE_OPERATION;
  payload: { operation: string };
};
type clear = {
  type: typeof ACTIONS.CLEAR;
  payload?: null;
};
type deleteDigit = {
  type: typeof ACTIONS.DELET_DIGIT;
  payload?: null;
};
type evaluate = {
  type: typeof ACTIONS.EVALUTAE;
  payload?: null;
};

type allActions = addDigit | chooseOperation | clear | deleteDigit | evaluate;

type State = {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite: boolean | null;
};
const initState: State = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
  overwrite: false,
};

const reducer = (state: State, { type, payload }: allActions): State => {
  const { currentOperand, previousOperand, operation } = state;

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (currentOperand && currentOperand.length >= 38) {
        return state;
      }
      if (payload.digit === "0" && currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && currentOperand?.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return initState;
    case ACTIONS.CHOOSE_OPERATION:
      if (currentOperand == null && previousOperand == null) {
        return state;
      }

      if (currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation,
      };
    case ACTIONS.EVALUTAE:
      if (
        operation == null ||
        currentOperand == null ||
        previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
      };
    case ACTIONS.DELET_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (currentOperand == null) return state;
      if (currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: currentOperand.slice(0, -1),
      };
    default:
      return state;
  }
};

const INTEGER_FORMATER = new Intl.NumberFormat("pt-PT", {
  maximumFractionDigits: 0,
});

const formatOperand = (operand: string) => {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATER.format(BigInt(integer));
  return `${INTEGER_FORMATER.format(integer)}.${decimal}`;
};

const evaluate = ({
  currentOperand,
  previousOperand,
  operation,
}: {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
}) => {
  const prev = parseFloat(previousOperand !== null ? previousOperand : "");
  const curr = parseFloat(currentOperand !== null ? currentOperand : "");
  if (isNaN(prev) || isNaN(curr)) return "";
  let computation: number | string = "";

  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "x":
      computation = prev * curr;
      break;
    case "÷":
      computation = prev / curr;
      break;
  }
  if (computation.toString().includes("e+")) {
    return BigInt(computation).toString();
  } else {
    return computation.toString();
  }
};

const Calculator = ({ setCopy }: { setCopy: (value: any) => void }) => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initState
  );

  useEffect(() => {
    setCopy(formatOperand(currentOperand !== null ? currentOperand : ""));
  }, [currentOperand]);

  return (
    <div className="container">
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formatOperand(previousOperand!)}
            {operation}
          </div>
          <div
            className={
              currentOperand && currentOperand.length >= 10
                ? "current-operand long-char"
                : "current-operand"
            }
          >
            {formatOperand(currentOperand !== null ? currentOperand : ""!)}
          </div>
        </div>
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELET_DIGIT })}>
          DEL
        </button>
        <OperationButton operation="÷" dispatch={dispatch} />

        <DigitButton digit="1" dispatch={dispatch} />

        <DigitButton digit="2" dispatch={dispatch} />

        <DigitButton digit="3" dispatch={dispatch} />

        <OperationButton operation="x" dispatch={dispatch} />

        <DigitButton digit="4" dispatch={dispatch} />

        <DigitButton digit="5" dispatch={dispatch} />

        <DigitButton digit="6" dispatch={dispatch} />

        <OperationButton operation="+" dispatch={dispatch} />

        <DigitButton digit="7" dispatch={dispatch} />

        <DigitButton digit="8" dispatch={dispatch} />

        <DigitButton digit="9" dispatch={dispatch} />

        <OperationButton operation="-" dispatch={dispatch} />

        <DigitButton digit="0" dispatch={dispatch} />

        <DigitButton digit="." dispatch={dispatch} />

        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.EVALUTAE })}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
