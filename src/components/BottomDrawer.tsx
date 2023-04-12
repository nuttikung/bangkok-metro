import CloseIcon from "@mui/icons-material/Close";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TimelineDot from "@mui/lab/TimelineDot";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import React, { useContext, useMemo } from "react";
import { DialogContext } from "../contexts/DialogContext";
import { useStationContext } from "../contexts/StationContext";
import { useUiContext } from "../contexts/UiContext";
import { Colors } from "../utils/Color";

const BottomDrawer: React.FunctionComponent = () => {
  const { dialog, setDialog } = useContext(DialogContext);
  const { point, setPoint, isPreviewRoute } = useStationContext();
  const { isShowMainDrawer, isShowRouteDetail } = useUiContext();
  // COMMENT: iOS
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Start dot
  const startDot = useMemo(() => {
    if (point.from !== undefined) {
      const colorClass = Colors[point.from.line];
      return <TimelineDot className={colorClass} />;
    }
    return <TimelineDot />;
  }, [point?.from?.line]);
  // End dot
  const endDot = useMemo(() => {
    if (point.to !== undefined) {
      const colorClass = Colors[point.to.line];
      return <TimelineDot className={colorClass} />;
    }
    return <TimelineDot />;
  }, [point?.to?.line]);

  const handleSearchFromClick = (type: string) => () => {
    if (type === "FROM") {
      setDialog({ ...dialog, from: true });
      return;
    }

    if (type === "TO") {
      setDialog({ ...dialog, to: true });
      return;
    }
  };

  const handleFormSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
  };

  const handleOpenMainDrawer = (
    event: React.SyntheticEvent<{}, Event>
  ): void => {
    throw new Error("Function not implemented.");
  };

  const clearStartPoint = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setPoint({ ...point, from: undefined });
  };

  const clearEndPoint = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setPoint({ ...point, to: undefined });
  };

  const swapStartToEnd = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setPoint({ ...point, from: point.to, to: point.from });
  };

  const handleCloseMainDrawer = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ): void => {
    throw new Error("Function not implemented.");
  };

  return (
    <React.Fragment>
      <SwipeableDrawer
        PaperProps={{
          className: "py-2 rounded-t-xl bg-gray-500",
          elevation: 0,
        }}
        ModalProps={{ keepMounted: true }}
        onOpen={handleOpenMainDrawer}
        hideBackdrop
        anchor="bottom"
        open={isShowMainDrawer && !isPreviewRoute && !isShowRouteDetail}
        variant="persistent"
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        onClose={() => {}}
        // onClose={handleCloseMainDrawer}
      >
        <Grid
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          columns={16}
          component="form"
          container
          className="px-2"
          onSubmit={handleFormSubmit}
        >
          <Grid item xs={7}>
            <List component="div" role="group" className="w-full">
              <ListItem
                disablePadding
                secondaryAction={
                  point?.from?.id !== undefined && (
                    <IconButton
                      disableRipple
                      edge="end"
                      aria-label="clear-search-from"
                      onClick={clearStartPoint}
                    >
                      <CloseIcon className="text-gray-400" />
                    </IconButton>
                  )
                }
              >
                <ListItemButton
                  aria-haspopup="true"
                  aria-controls="search-from-menu"
                  aria-label="search-from"
                  className="rounded-md bg-gray-600 px-2 text-transparent hover:bg-gray-600"
                  onClick={handleSearchFromClick("FROM")}
                  disableRipple
                >
                  <ListItemIcon className="min-w-[20px]">
                    {startDot}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        noWrap
                        className="text-gray-300"
                      >
                        {point.from?.id === undefined
                          ? "From"
                          : point.from.name.en}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
          <Grid item>
            <IconButton
              size="small"
              disableRipple
              onClick={swapStartToEnd}
              disabled={
                point.to?.id === undefined && point.from?.id === undefined
              }
            >
              <SwapHorizIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid item xs={7}>
            <List component="div" role="group" className="w-full">
              <ListItem
                disablePadding
                secondaryAction={
                  point?.to?.id !== undefined && (
                    <IconButton
                      disableRipple
                      edge="end"
                      aria-label="clear-search-from"
                      onClick={clearEndPoint}
                    >
                      <CloseIcon className="text-gray-400" />
                    </IconButton>
                  )
                }
              >
                <ListItemButton
                  aria-haspopup="true"
                  aria-controls="search-to-menu"
                  aria-label="search-to"
                  className="rounded-md bg-gray-600 px-2 text-transparent hover:bg-gray-600"
                  disableRipple
                  onClick={handleSearchFromClick("TO")}
                >
                  <ListItemIcon className="min-w-[20px]">{endDot}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        noWrap
                        className="text-gray-300"
                      >
                        {point.to?.id === undefined ? "To" : point.to.name.en}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default React.memo(BottomDrawer);
