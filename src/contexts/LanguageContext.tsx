import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export enum Language {
  EN = "EN",
  TH = "TH",
}

export interface LanguageInterface {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

const defaultValue = {
  language: Language.EN,
  setLanguage: (lang: Language) => {},
} as LanguageInterface;

export const LanguageContext = createContext(defaultValue);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState(Language.EN);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
