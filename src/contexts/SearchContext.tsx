import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { Station, stations } from "../data/station";

export type Search = {
  from: string;
  to: string;
};

export interface SearchContextInterface {
  search: Search;
  result: Station[];
  setSearch: Dispatch<SetStateAction<Search>>;
}

const defaultValue = {
  search: { from: "", to: "" },
  setSearch: (search: Search) => {},
} as SearchContextInterface;

export const SearchContext = createContext(defaultValue);

type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [search, setSearch] = useState<Search>({ from: "", to: "" });
  const [result, setResult] = useState<Station[]>([]);

  useEffect(() => {
    const getStations = (word: string): Station[] =>
      stations
        .filter(
          (record) =>
            record.name.en.toLowerCase().includes(word.toLowerCase()) ||
            record.name.th.includes(word)
        )
        .sort((a, b) =>
          a.name.en.toUpperCase() < b.name.en.toUpperCase() ? -1 : 0
        );
    setResult(getStations(search.from || search.to));
  }, [search.from, search.to]);

  return (
    <SearchContext.Provider value={{ search, setSearch, result }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
