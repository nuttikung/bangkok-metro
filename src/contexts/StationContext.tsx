import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import Graph from "../api/graph";
import { SectionLine } from "../data/section";
import { Station } from "../data/station";
import {
  excludeSameLine,
  getLineGroup,
  getStationGroup,
  inDurationRangeTen,
  notAllowMultipleTransfer,
  transformToSectionLine,
  useLess,
} from "../utils/Routing";

export type StationPick = {
  from: Station | undefined;
  to: Station | undefined;
};

export interface StationInterface {
  point: StationPick;
  setPoint: Dispatch<SetStateAction<StationPick>>;
  routes: SectionLine[];
  activeRoute: number;
  setActiveRoute: Dispatch<SetStateAction<number>>;
  searchDate: Date;
  setSearchDate: Dispatch<SetStateAction<Date>>;
}

const defaultValue = {
  point: {
    from: {},
    to: {},
  },
  setPoint: (station: StationPick) => {},
} as StationInterface;

export const StationContext = createContext(defaultValue);

export type StationProviderProps = {
  children: ReactNode;
};

export const StationProvider = ({ children }: StationProviderProps) => {
  const [point, setPoint] = useState<StationPick>({
    from: undefined,
    to: undefined,
  });

  const [routes, setRoutes] = useState<SectionLine[]>([]);
  const [activeRoute, setActiveRoute] = useState<number>(0);
  const [searchDate, setSearchDate] = useState<Date>(new Date());
  // COMMENT: Initialize Graph
  useEffect(() => {
    Graph.initialize();
  }, []);
  // COMMENT: Finding all possible path
  useEffect(() => {
    // TODO: re-calculate since some state change
    const findRoutes = () => {
      if (point.from?.id !== undefined && point.to?.id !== undefined) {
        // TODO: improove Big O seems bad as it like (O) = exponential n^2
        // useLess = n*n , getStationGroup = n*n, sort = log(n), getLineGroup = n*n
        // This is FP but need improve *logical*
        const routes: SectionLine[] = Graph.visit(point.to.id, [point.from.id])
          .filter(useLess)
          .map(getStationGroup)
          .sort((current, next) => current.duration - next.duration)
          .map(getLineGroup)
          .filter(excludeSameLine)
          .map(transformToSectionLine)
          .filter(notAllowMultipleTransfer)
          .filter(inDurationRangeTen);
        // Set data *ready to use*
        setRoutes(routes);
        // after search set route 0 to show as first
        if (routes.length > 0) {
          setActiveRoute(0);
        }
      } else {
        setRoutes([]);
        setActiveRoute(0);
      }
    };

    findRoutes();
  }, [point.from, point.to]);

  return (
    <StationContext.Provider
      value={{
        point,
        setPoint,
        routes,
        activeRoute,
        setActiveRoute,
        searchDate,
        setSearchDate,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};

export default StationProvider;
