import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type Ui = {
  isShow: boolean;
};

type Context = {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
};

const defaultValue = {
  isShow: false,
  setIsShow: (isShow: boolean) => {},
} as Context;

export const UiContext = createContext<Context>(defaultValue);

type Props = {
  children: ReactNode;
};

export const UiProvider = ({ children }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <UiContext.Provider value={{ isShow, setIsShow }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => {
  const context = useContext(UiContext);
  if (!context)
    throw new Error(
      "UiContext must be called from within the UiContextProvider"
    );
  return context;
};

export default UiProvider;
