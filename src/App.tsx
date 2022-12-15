import Calculator from "./components/Calculator.component";
import { useState } from "react";
import SwitchButton from "./components/SwitchButton.component";
import CopyButton from "./components/CopyButton.component";
import SnackbarProvider from "react-simple-snackbar";

function App() {
  const [theme, setTheme] = useState("light");
  const [copy, setCopy] = useState("");

  const toggleTheme = () => {
    setTheme((curr: string) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <SnackbarProvider>
      <div className="app" id={theme}>
        <Calculator setCopy={setCopy} />

        <div className="button-container">
          <SwitchButton toggleTheme={toggleTheme} theme={theme} />
          <CopyButton textToCopy={copy} />
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
