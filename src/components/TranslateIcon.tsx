import TranslateIcon from "@mui/icons-material/Translate";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { useT } from "talkr";

const FabIcon = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { setLocale } = useT();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const dialPos: SxProps<Theme> = isDesktop
    ? { position: "absolute", bottom: 16, right: 16 }
    : { position: "absolute", top: 16, right: 16 };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const changeLanguage = (ln: string) => () => {
    setLocale(ln);
    setOpen(false);
  };

  return (
    <SpeedDial
      ariaLabel="Language Switcher"
      sx={dialPos}
      classes={{ fab: "bg-gray-900 hover:bg-gray-900 focus:bg-gray-900" }}
      icon={<TranslateIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={isDesktop ? "up" : "down"}
    >
      <SpeedDialAction
        icon="EN"
        tooltipTitle="English"
        onClick={changeLanguage("en")}
      />
      <SpeedDialAction
        icon="TH"
        tooltipTitle="Thai"
        onClick={changeLanguage("th")}
      />
    </SpeedDial>
  );
};

export default FabIcon;
