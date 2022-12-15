import { ACTIONS } from "./Calculator.component";

type PassedProps = {
  dispatch: (event: any) => void;
  operation?: string;
};

export default function OperationButton({ dispatch, operation }: PassedProps) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
