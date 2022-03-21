import { createContext, useContext, useReducer } from "react";

const MessageObject = {
  message: null,
  action: null,
};
const SHOW_MESSAGE = "SHOW_MESSAGE";
const CLOSE_MESSAGE = "CLOSE_MESSAGE";
const SnackMessage = createContext(MessageObject);

const useSnackBar = () => useContext(SnackMessage);

const SnackProvider = ({ children }) => {
  const SnackReducer = (state = MessageObject, action) => {
    switch (action.type) {
      case SHOW_MESSAGE:
        return {
          ...state,
          message: action.data.message,
          action: action.data.action ? action.data.action : null,
        };
      case CLOSE_MESSAGE:
        return {
          ...state,
          message: null,
          action: null,
        };
      default:
        return { ...state };
    }
  };
  const [state, dispatch] = useReducer(SnackReducer, MessageObject);
  return (
    <SnackMessage.Provider value={{ ...state, dispatch }}>
      {children}
    </SnackMessage.Provider>
  );
};

export { useSnackBar, SnackProvider, SHOW_MESSAGE, CLOSE_MESSAGE };
