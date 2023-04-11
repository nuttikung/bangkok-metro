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
  isSwipeDrawer: boolean;
};

type Context = {
  isShow: boolean;
  isSwipeDrawer: boolean;
  nodeId: string;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  setIsSwipeDrawer: Dispatch<SetStateAction<boolean>>;
  setNodeId: Dispatch<SetStateAction<string>>;
};

const defaultValue = {
  isShow: false,
  isSwipeDrawer: false,
  nodeId: "",
  setIsShow: (isShow: boolean) => {},
  setIsSwipeDrawer: (isSwipeDrawer: boolean) => {},
  setNodeId: (id: string) => {},
} as Context;

export const UiContext = createContext<Context>(defaultValue);

type Props = {
  children: ReactNode;
};

export const UiProvider = ({ children }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSwipeDrawer, setIsSwipeDrawer] = useState<boolean>(false);
  const [nodeId, setNodeId] = useState<string>("");
  return (
    <UiContext.Provider
      value={{
        isShow,
        setIsShow,
        isSwipeDrawer,
        setIsSwipeDrawer,
        nodeId,
        setNodeId,
      }}
    >
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
