import { ReactComponent as Copy } from "../assets/copy.svg";
import { useSnackbar } from "react-simple-snackbar";
import "./CopyButton.css";

export default function CopyButton({ textToCopy }: any) {
  const [openSnackbar, closeSnackbar] = useSnackbar();

  const copyResult = async (result: string) => {
    if (result === undefined || null) {
      return;
    } else if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(result);
    } else {
      return document.execCommand("copy", true, result);
    }
  };

  const handleCopy = () => {
    if (textToCopy !== undefined || null) {
      copyResult(textToCopy)
        .then(() => {
          openSnackbar("Copied to clipboard");
        })
        .catch((err) => console.log(err));
    }
  };
  return <Copy className="svg-copy" onClick={handleCopy}></Copy>;
}
