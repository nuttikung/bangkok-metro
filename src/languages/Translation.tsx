import { Language } from "../contexts/LanguageContext";
import EN from "./Eng";
import TH from "./Th";

export const getTranslations = (langCode: Language) => {
  // TH or EN(Fallback is EN)
  if (langCode === Language.TH) {
    return TH;
  } else {
    return EN;
  }
};
