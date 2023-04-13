import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { Button, Grid, MobileStepper, Typography } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Core } from "cytoscape";
import { addSeconds, format } from "date-fns";
import prettyMilliseconds from "pretty-ms";
import React, { forwardRef, useMemo } from "react";
import { useStationContext } from "../contexts/StationContext";
import { useUiContext } from "../contexts/UiContext";
import { JourneyType } from "../data";
import { subwayLines } from "../data/line";
import { Colors } from "../utils/Color";

type Props = {};
const RoutePreviewDrawer = forwardRef<Core, Props>(
  (props: Props, ref: React.Ref<Core>) => {
    const {
      routes,
      activeRoute,
      setActiveRoute,
      setPoint,
      searchDate,
      isPreviewRoute,
      setIsPreviewRoute,
    } = useStationContext();
    const { setIsShowRouteDetail } = useUiContext();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const currentRoute = routes[activeRoute];
    const travelTime = prettyMilliseconds((currentRoute?.duration || 0) * 1000);
    const startTime = useMemo(() => format(searchDate, "HH:mm"), [searchDate]);
    const endTime = useMemo(
      () =>
        format(addSeconds(searchDate, currentRoute?.duration || 0), "HH:mm"),
      [searchDate, currentRoute?.duration]
    );

    // iOS
    const iOS =
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent);

    const transferAmount: number =
      currentRoute?.journey.filter(
        (value) => value.type === JourneyType.TRANSFER
      ).length || 0;

    let trasnferText =
      transferAmount > 1
        ? `${transferAmount} transfers`
        : `${transferAmount} transfer`;

    let routePreview: JSX.Element | JSX.Element[] | null = null;
    let timePreview: JSX.Element | null = null;

    // time preview is base only currentRoute
    if (currentRoute !== undefined) {
      timePreview = (
        <React.Fragment>
          <Typography variant="caption" className="text-white font-semibold">
            {startTime} - {endTime} ({travelTime}), {trasnferText}
          </Typography>
        </React.Fragment>
      );
    }

    if (currentRoute?.lines?.length === 0) {
      routePreview = <DirectionsWalkIcon className="text-gray-800" />;
    } else if (currentRoute?.lines?.length > 0) {
      routePreview = currentRoute.lines.map((line, index, self) => {
        const lineName = subwayLines.find((record) => record.id === line);
        const dotClass =
          "flex w-5 h-5 rounded-full mr-1.5 flex-shrink-0 " +
          Colors[lineName?.name || ""];
        return (
          <React.Fragment key={index}>
            <span className="flex items-center text-sm font-medium dark:text-white">
              <span className={dotClass} />
            </span>
            {index !== self.length - 1 && (
              <ArrowForwardIcon className="text-gray-800 mr-2" />
            )}
          </React.Fragment>
        );
      });
    } else {
      routePreview = null;
    }

    // COMMENT: Handler here below
    const handleNextCLick = () => {
      setActiveRoute(activeRoute + 1);
    };

    const handlePrevClick = () => {
      setActiveRoute(activeRoute - 1);
    };

    const handleCloseRoutePreview = (
      event: React.SyntheticEvent<{}, Event>
    ): void => {
      setPoint({ from: undefined, to: undefined });
    };

    const handleShowRouteDetail = (
      event: React.SyntheticEvent<{}, Event>
    ): void => {
      setIsPreviewRoute(false);
      setIsShowRouteDetail(true);
    };

    const handleClearSearch = (
      event: React.SyntheticEvent<{}, Event>
    ): void => {
      setPoint({ from: undefined, to: undefined });
      setIsPreviewRoute(false);
    };

    return (
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor="bottom"
        open={isPreviewRoute && !isDesktop}
        variant="persistent"
        hideBackdrop
        allowSwipeInChildren
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          className: "py-2 rounded-t-xl bg-gray-500",
          elevation: 0,
        }}
        onClose={handleCloseRoutePreview}
        onOpen={() => {}}
      >
        <MobileStepper
          variant="dots"
          steps={routes.length}
          position="static"
          activeStep={activeRoute}
          className="flex-1 bg-transparent"
          classes={{ dotActive: "bg-gray-800" }}
          backButton={
            <Button
              size="small"
              className="text-gray-800"
              disableRipple
              onClick={handlePrevClick}
              disabled={activeRoute === 0}
            >
              <ChevronLeftIcon />
            </Button>
          }
          nextButton={
            <Button
              size="small"
              className="text-gray-800"
              disableRipple
              onClick={handleNextCLick}
              disabled={activeRoute === routes.length - 1}
            >
              <ChevronRightIcon />
            </Button>
          }
        />
        <Grid
          container
          spacing={0}
          className="px-2 py-1"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} className="flex items-center flex-wrap gap-1">
            {routePreview}
          </Grid>
          <Grid item xs={12} className="flex items-center flex-wrap mt-2">
            {timePreview}
          </Grid>
          <Grid item xs={6} className="px-2 mt-2">
            <Button
              variant="contained"
              className="bg-gray-700 text-gray-300 hover:bg-gray-700 normal-case"
              fullWidth
              disableElevation
              disableRipple
              onClick={handleShowRouteDetail}
            >
              Detail
            </Button>
          </Grid>
          <Grid item xs={6} className="px-2 mt-2">
            <Button
              variant="contained"
              className="bg-gray-200 text-gray-900 hover:bg-gray-200 normal-case"
              fullWidth
              disableElevation
              disableRipple
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </SwipeableDrawer>
    );
  }
);

export default RoutePreviewDrawer;
