import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type Dialog = {
  from: boolean;
  to: boolean;
};

export interface DialogInterface {
  dialog: Dialog;
  setDialog: Dispatch<SetStateAction<Dialog>>;
}

const defaultValue = {
  dialog: {
    from: false,
    to: false,
  },
  setDialog: (dialog: Dialog) => {},
} as DialogInterface;

export const DialogContext = createContext(defaultValue);

export type DialogProviderProps = {
  children: ReactNode;
};

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [dialog, setDialog] = useState<Dialog>({
    from: false,
    to: false,
  });

  return (
    <DialogContext.Provider value={{ dialog, setDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error(
      "DialogContext must be called from within the DialogContextProvider"
    );
  return context;
};

export default DialogProvider;
