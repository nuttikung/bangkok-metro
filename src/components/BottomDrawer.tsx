import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MobileStepper from "@mui/material/MobileStepper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import addSeconds from "date-fns/addSeconds";
import prettyMilliseconds from "pretty-ms";
import React, { useContext, useMemo } from "react";
import { DialogContext } from "../contexts/DialogContext";
import { StationContext } from "../contexts/StationContext";
import { useUiContext } from "../contexts/UiContext";
import { JourneyType } from "../data/journey";
import { subwayLines } from "../data/line";
import { Colors } from "../utils/Color";
import JourneyTimeline from "./Journey";

const BottomDrawer: React.FunctionComponent = () => {
  const { dialog, setDialog } = useContext(DialogContext);
  const { point, routes, activeRoute, setActiveRoute, setPoint, searchDate } =
    useContext(StationContext);
  const { isShow, setIsShow, isSwipeDrawer } = useUiContext();
  const currentRoute = routes[activeRoute];
  const travelTime = prettyMilliseconds((currentRoute?.duration || 0) * 1000);
  const startTime = useMemo(() => format(searchDate, "HH:mm"), [searchDate]);
  const endTime = useMemo(
    () => format(addSeconds(searchDate, currentRoute?.duration || 0), "HH:mm"),
    [searchDate, currentRoute?.duration]
  );
  const transferAmount: number =
    currentRoute?.journey.filter((value) => value.type === JourneyType.TRANSFER)
      .length || 0;

  // Drawer open temporary
  let routePreview: JSX.Element | JSX.Element[] | null = null;
  let timePreview: JSX.Element | null = null;
  let trasnferText =
    transferAmount > 1
      ? `${transferAmount} transfers`
      : `${transferAmount} transfer`;

  if (currentRoute !== undefined) {
    if (currentRoute.lines.length === 0) {
      routePreview = <DirectionsWalkIcon />;
    } else {
      routePreview = currentRoute.lines.map((line, index, self) => {
        const lineName = subwayLines.find((record) => record.id === line);
        const dotClass =
          "flex w-6 h-6 rounded-full mr-1.5 flex-shrink-0 " +
          Colors[lineName?.name || ""];
        return (
          <React.Fragment key={index}>
            <span className="flex items-center text-sm font-medium dark:text-white">
              <span className={dotClass} />
            </span>
            {index !== self.length - 1 && (
              <ArrowForwardIcon className="text-gray-900 mr-2" />
            )}
          </React.Fragment>
        );
      });
    }
    timePreview = (
      <React.Fragment>
        <Typography variant="caption" className="text-gray-600 font-semibold">
          {startTime} - {endTime} ({travelTime}), {trasnferText}
        </Typography>
      </React.Fragment>
    );
  } else {
    routePreview = null;
  }

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

  const handleNextCLick = () => {
    setActiveRoute(activeRoute + 1);
  };

  const handlePrevClick = () => {
    setActiveRoute(activeRoute - 1);
  };

  const handleClearStation = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setPoint({ from: undefined, to: undefined });
  };

  const handleRouteDetailClick = () => {
    setIsShow(true);
  };

  const handleCloseRouteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsShow(false);
  };

  return (
    <React.Fragment>
      <Drawer
        PaperProps={{
          className: !isShow
            ? "py-2 rounded-t-xl bg-white transition-transform ease-in-out duration-300"
            : "h-[90%] md:h-[70%] rounded-t-xl bg-white transition-transform ease-in-out duration-300",
        }}
        ModalProps={{
          keepMounted: true,
        }}
        hideBackdrop
        anchor="bottom"
        open={!isSwipeDrawer}
        variant="persistent"
        className="transition-transform ease-in-out duration-300"
        onClose={() => {}}
      >
        {isShow && (
          <React.Fragment>
            <div className="sticky top-0 bg-white z-50">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="p-2"
              >
                <Typography
                  variant="button"
                  className="text-gray-600 font-semibold normal-case"
                >
                  {currentRoute.duration / 60} minutes
                </Typography>
                <Button
                  variant="text"
                  disableRipple
                  className="text-primary normal-case"
                  onClick={handleCloseRouteClick}
                >
                  Close
                </Button>
              </Stack>
              <Divider />
            </div>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
              className="mt-0"
            >
              <JourneyTimeline {...currentRoute} />
            </Timeline>
          </React.Fragment>
        )}
        {routes.length > 0 && !isShow && (
          <React.Fragment>
            <MobileStepper
              variant="dots"
              steps={routes.length}
              position="static"
              activeStep={activeRoute}
              className="flex-1"
              classes={{ dotActive: "bg-primary" }}
              nextButton={
                <Button
                  size="small"
                  className="text-primary"
                  disableRipple
                  onClick={handleNextCLick}
                  disabled={activeRoute === routes.length - 1}
                >
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  className="text-primary"
                  disableRipple
                  onClick={handlePrevClick}
                  disabled={activeRoute === 0}
                >
                  <KeyboardArrowLeft />
                </Button>
              }
            />
          </React.Fragment>
        )}
        {!isShow && (
          <React.Fragment>
            {currentRoute !== undefined && (
              <Grid
                container
                spacing={0}
                className="p-2"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid
                  item
                  xs={12}
                  className="flex items-center flex-wrap gap-1"
                >
                  {routePreview}
                </Grid>
              </Grid>
            )}
            <Grid
              container
              spacing={0}
              className="p-2"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={12} className="flex items-center flex-wrap">
                {timePreview}
              </Grid>
            </Grid>
            {currentRoute !== undefined && !isShow && (
              <React.Fragment>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item className="mx-2">
                    <Typography
                      component={Button}
                      variant="caption"
                      display="block"
                      className="text-primary font-semibold"
                      onClick={handleRouteDetailClick}
                    >
                      Route details
                    </Typography>
                  </Grid>
                  <Grid item className="mx-2">
                    <Typography
                      component={Button}
                      variant="caption"
                      display="block"
                      className="text-gray-600 font-semibold"
                      onClick={handleClearStation}
                    >
                      Clear
                    </Typography>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
            <Grid
              container
              spacing={0}
              component="form"
              noValidate
              onSubmit={handleFormSubmit}
              className="mt-1"
            >
              <Grid item xs={6} className="px-2">
                <List component="div" role="group">
                  <ListItemButton
                    divider
                    aria-haspopup="true"
                    aria-controls="search-from-menu"
                    aria-label="search-from"
                    className="rounded-md border-[1px] border-solid border-gray-300 px-2"
                    onClick={handleSearchFromClick("FROM")}
                  >
                    <ListItemText
                      primary="สถานีต้นทาง"
                      secondary={
                        point.from?.id === undefined ? (
                          <Typography
                            variant="subtitle2"
                            noWrap
                            className="text-gray-500"
                          >
                            เลือกที่นี่
                          </Typography>
                        ) : (
                          <Typography variant="subtitle2" noWrap>
                            {point.from.name.en}
                          </Typography>
                        )
                      }
                    />
                  </ListItemButton>
                </List>
              </Grid>
              <Grid item xs={6} className="px-2">
                <List component="div" role="group">
                  <ListItemButton
                    divider
                    aria-haspopup="true"
                    aria-controls="search-to-menu"
                    aria-label="search-to"
                    className="rounded-md border-[1px] border-solid border-gray-300 px-2"
                    onClick={handleSearchFromClick("TO")}
                  >
                    <ListItemText
                      primary="สถานีปลายทาง"
                      secondary={
                        point.to?.id === undefined ? (
                          <Typography
                            variant="subtitle2"
                            noWrap
                            className="text-gray-500"
                          >
                            เลือกที่นี่
                          </Typography>
                        ) : (
                          <Typography variant="subtitle2" noWrap>
                            {point.to.name.en}
                          </Typography>
                        )
                      }
                    />
                  </ListItemButton>
                </List>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </Drawer>
    </React.Fragment>
  );
};

export default React.memo(BottomDrawer);
