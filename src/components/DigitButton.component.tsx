import { ACTIONS } from "./Calculator.component";

type PassedProps = {
  dispatch: (event: any) => void;
  digit?: string;
};

export default function DigitButton({ dispatch, digit }: PassedProps) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
