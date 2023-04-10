import TranslateIcon from "@mui/icons-material/Translate";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Typography from "@mui/material/Typography";
import React, { FunctionComponent, useContext } from "react";
import LanguageProvider, {
  Language,
  LanguageContext,
} from "../contexts/LanguageContext";

const LanguageSwitcher: React.FunctionComponent = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  console.log("🚀 ~ file: LanguageSwitcher.tsx:14 ~ language:", language);
  const handleClickLanguage = (lang: Language) => () => {
    setLanguage(lang);
  };

  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        className="absolute top-[10px] left-[10px]"
        direction="down"
        ariaLabel="language-switcher"
        icon={<TranslateIcon />}
      >
        <SpeedDialAction
          icon={<Typography variant="body1">EN</Typography>}
          tooltipTitle="English"
          onClick={handleClickLanguage(Language.EN)}
        />
        <SpeedDialAction
          icon={<Typography variant="body1">TH</Typography>}
          tooltipTitle="Thai"
          onClick={handleClickLanguage(Language.TH)}
        />
      </SpeedDial>
    </Box>
  );
};

const LanguageSwitcherProvider: FunctionComponent = () => (
  <LanguageProvider>
    <LanguageSwitcher />
  </LanguageProvider>
);

export default LanguageSwitcherProvider;
