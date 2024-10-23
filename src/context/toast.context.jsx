import { createContext, useState } from "react";

const ToastContext = createContext();

function ToastWrapper(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [okMessage, setOkMessage] = useState("");
  

  const passedContext = {
    errorMessage: errorMessage,
    okMessage: okMessage,
    setErrorMessage: setErrorMessage,
    setOkMessage: setOkMessage
  }

  return (
    <ToastContext.Provider value={passedContext}>
      {props.children}
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastWrapper };