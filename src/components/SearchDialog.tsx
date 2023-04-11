import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import TrainIcon from "@mui/icons-material/Train";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar/Avatar";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";
import React, { useContext, useMemo, useRef } from "react";
import { DialogContext } from "../contexts/DialogContext";
import { SearchContext } from "../contexts/SearchContext";
import { StationContext } from "../contexts/StationContext";
import { Station } from "../data/station";
import { Colors } from "../utils";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SearchDialog = React.memo(() => {
  const { dialog, setDialog } = useContext(DialogContext);
  const { search, setSearch, result } = useContext(SearchContext);
  const { point, setPoint } = useContext(StationContext);
  const dialogFrom = useMemo(() => dialog.from, [dialog]);
  const dialogTo = useMemo(() => dialog.to, [dialog]);
  const searchTextField = useRef<HTMLLinkElement>(null);

  let searchValue: string;
  let title: string;
  if (dialogFrom) {
    title = "สถานีต้นทาง";
    searchValue = search.from;
  } else {
    title = "สถานีปลายทาง";
    searchValue = search.to;
  }

  const handleCloseDialog = () => {
    if (dialogFrom) {
      setDialog({ ...dialog, from: false });
      setSearch({ ...search, from: "" });
    } else {
      setDialog({ ...dialog, to: false });
      setSearch({ ...search, to: "" });
    }
  };

  const handleTextfieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (dialogFrom) {
      setSearch({ ...search, from: event.target.value });
    } else {
      setSearch({ ...search, to: event.target.value });
    }
  };

  const handleClearTextfield = () => {
    if (dialogFrom) {
      setSearch({ ...search, from: "" });
    } else {
      setSearch({ ...search, to: "" });
    }
  };

  const handlePickStation = (record: Station) => () => {
    // มาจาก FROM แล้วค่า === TO (Switch Station)
    if (dialogFrom && record.id === point.to?.id) {
      setPoint({ ...point, to: point.from, from: record });
    } else if (dialogTo && record.id === point.from?.id) {
      setPoint({ ...point, from: point.to, to: record });
    } else if (dialogFrom) {
      setPoint({ ...point, from: record });
    } else {
      setPoint({ ...point, to: record });
    }
    handleCloseDialog();
  };

  const handleFormSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13 && searchTextField.current !== null) {
      searchTextField.current.blur();
    }
  };

  return (
    <Dialog
      fullScreen
      open={dialogFrom || dialogTo}
      onClose={handleCloseDialog}
      TransitionComponent={Transition}
    >
      <AppBar position="sticky" className="bg-primary">
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="mt-3"
        component="form"
        noValidate
        onSubmit={handleFormSubmit}
      >
        <Grid item xs={12} className="px-2 py-1">
          <TextField
            fullWidth
            label={title}
            placeholder="พิมพ์เพื่อค้นหา"
            value={searchValue}
            onChange={handleTextfieldChange}
            onKeyDown={handleKeyPress}
            type="text"
            autoComplete="off"
            inputRef={searchTextField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchValue !== "" && (
                <InputAdornment position="start">
                  <IconButton onClick={handleClearTextfield}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <List className="mt-0 pt-0">
        {result.map((station, index) => {
          const colorClass = Colors[station.line];
          return (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemButton onClick={handlePickStation(station)}>
                  <ListItemAvatar>
                    <Avatar component="div" className={colorClass}>
                      <TrainIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={station.name.en}
                    secondary={station.name.th}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </Dialog>
  );
});

export default SearchDialog;
