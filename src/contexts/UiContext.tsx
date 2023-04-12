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
  isShowMainDrawer: boolean;
  isShowRouteDetail: boolean;
  isShowPickNode: boolean;
  setIsShowMainDrawer: Dispatch<SetStateAction<boolean>>;
  setIsShowRouteDetail: Dispatch<SetStateAction<boolean>>;
  setIsShowPickNode: Dispatch<SetStateAction<boolean>>;
  nodeId: string;
  setNodeId: Dispatch<SetStateAction<string>>;
};

const defaultValue = {
  isShowPickNode: false,
  isShowMainDrawer: false,
  isShowRouteDetail: false,
  nodeId: "",
  setIsShowMainDrawer: (show: boolean) => {},
  setIsShowRouteDetail: (show: boolean) => {},
  setIsShowPickNode: (show: boolean) => {},
  setNodeId: (id: string) => {},
} as Context;

export const UiContext = createContext<Context>(defaultValue);

type Props = {
  children: ReactNode;
};

export const UiProvider = ({ children }: Props) => {
  const [isShowMainDrawer, setIsShowMainDrawer] = useState<boolean>(true);
  const [isShowPickNode, setIsShowPickNode] = useState<boolean>(false);
  const [nodeId, setNodeId] = useState<string>("");
  const [isShowRouteDetail, setIsShowRouteDetail] = useState<boolean>(false);
  return (
    <UiContext.Provider
      value={{
        isShowMainDrawer,
        setIsShowMainDrawer,
        isShowRouteDetail,
        setIsShowRouteDetail,
        isShowPickNode,
        setIsShowPickNode,
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
