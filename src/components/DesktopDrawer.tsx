import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import InfoIcon from "@mui/icons-material/Info";
import Timeline from "@mui/lab/Timeline";
import TimelineDot from "@mui/lab/TimelineDot";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import Autocomplete from "@mui/material/Autocomplete";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { addSeconds, format } from "date-fns";
import humanizeDuration from "humanize-duration";
import React, { useRef } from "react";
import { useT } from "talkr";
import Journey from "../components/Journey";
import { useStationContext } from "../contexts/StationContext";
import { JourneyType } from "../data/journey";
import { subwayLines } from "../data/line";
import { Station, stations } from "../data/station";
import { Colors } from "../utils/Color";

const DesktopDrawer = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { T, locale } = useT();
  const { point, setPoint, routes, activeRoute, setActiveRoute, searchDate } =
    useStationContext();
  const ref = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const currentRoute = routes[activeRoute];
  // COMMENT: Color of dot
  let renderIconFromAutocomplete: JSX.Element | null = null;
  let renderIconToAutocomplete: JSX.Element | null = null;

  if (point?.from?.line !== undefined) {
    const colorToClass = Colors[point?.from?.line] || "";
    renderIconFromAutocomplete = (
      <IconButton disabled>
        <TimelineDot className={colorToClass} />
      </IconButton>
    );
  } else {
    renderIconFromAutocomplete = (
      <IconButton disabled>
        <TimelineDot />
      </IconButton>
    );
  }

  if (point?.to?.line !== undefined) {
    const colorToClass = Colors[point?.to?.line] || "";
    renderIconToAutocomplete = (
      <IconButton disabled>
        <TimelineDot className={colorToClass} />
      </IconButton>
    );
  } else {
    renderIconToAutocomplete = (
      <IconButton disabled>
        <TimelineDot />
      </IconButton>
    );
  }

  const handleFromSelectOption = (event: any, newValue: Station | null) => {
    if (newValue === null) {
      setPoint({ ...point, from: undefined });
      return;
    }
    if (newValue.id === point.to?.id) {
      setPoint({ ...point, to: point.from, from: newValue });
      return;
    }
    setPoint({ ...point, from: newValue });
    return;
  };

  const handleToSelectOption = (event: any, newValue: Station | null) => {
    if (newValue === null) {
      setPoint({ ...point, to: undefined });
      return;
    }
    // COMMENT: swap from/to because station cannot be start and end similar spot.
    if (newValue.id === point.from?.id) {
      setPoint({ ...point, from: point.to, to: newValue });
      return;
    }
    setPoint({ ...point, to: newValue });
    return;
  };

  const handleShowRouteDetail =
    (routeIndex: number) =>
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      setActiveRoute(routeIndex);
      ref?.current?.scrollIntoView({ behavior: "smooth" });
    };

  return (
    <Drawer
      className="max-w-[310px]"
      PaperProps={{
        className: "rounded-r-xl bg-gray-500 p-2 max-w-[310px] mb-5",
        elevation: 0,
      }}
      variant="persistent"
      hideBackdrop
      open={isDesktop}
      ref={drawerRef}
    >
      <Grid
        container
        spacing={0}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} className="p-1">
          <Autocomplete
            classes={{
              paper: "bg-gray-700",
              focused: "border-gray-700",
              expanded: "border-gray-700",
              noOptions: "text-white",
              clearIndicator: "text-white",
              popupIndicator: "text-white",
              hasPopupIcon: "border-gray-700",
            }}
            value={point.from === undefined ? null : point.from}
            openOnFocus={true}
            options={stations}
            onChange={handleFromSelectOption}
            getOptionLabel={(option) =>
              typeof option === "string"
                ? option
                : `${option.name.en} (${option.line})`
            }
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label={T("label.from")}
                  fullWidth
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    classes: {
                      outlined: "!text-white",
                      focused: "text-white",
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    className: "text-white",
                    classes: {
                      notchedOutline: "!border-gray-700",
                      colorSecondary: "border-gray-700",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        {renderIconFromAutocomplete}
                      </InputAdornment>
                    ),
                  }}
                />
              );
            }}
            renderOption={(props, option) => {
              const colorClass = Colors[option.line] || "";
              return (
                <li {...props} className="bg-gray-700 cursor-pointer">
                  <Grid container alignItems="center">
                    <Grid item sx={{ display: "flex", width: 44 }}>
                      <IconButton disabled>
                        <TimelineDot className={colorClass} />
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "calc(100% - 44px)",
                        wordWrap: "break-word",
                      }}
                    >
                      <Typography variant="body2" color="white">
                        {option.name.en}
                      </Typography>
                      <Typography variant="body2" color="white">
                        {option.name.th}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} className="p-1">
          <Autocomplete
            classes={{
              paper: "bg-gray-700",
              focused: "border-gray-700",
              expanded: "border-gray-700",
              noOptions: "text-white",
              clearIndicator: "text-white",
              popupIndicator: "text-white",
              hasPopupIcon: "border-gray-700",
            }}
            value={point.to === undefined ? null : point.to}
            openOnFocus={true}
            options={stations}
            onChange={handleToSelectOption}
            getOptionLabel={(option) =>
              typeof option === "string"
                ? option
                : `${option.name.en} (${option.line})`
            }
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label={T("label.to")}
                  fullWidth
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    classes: {
                      outlined: "!text-white",
                      focused: "text-white",
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    className: "text-white",
                    classes: {
                      notchedOutline: "!border-gray-700",
                      colorSecondary: "border-gray-700",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        {renderIconToAutocomplete}
                      </InputAdornment>
                    ),
                  }}
                />
              );
            }}
            renderOption={(props, option) => {
              const colorClass = Colors[option.line] || "";
              return (
                <li {...props} className="bg-gray-700 cursor-pointer">
                  <Grid container alignItems="center">
                    <Grid item sx={{ display: "flex", width: 44 }}>
                      <IconButton disabled>
                        <TimelineDot className={colorClass} />
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "calc(100% - 44px)",
                        wordWrap: "break-word",
                      }}
                    >
                      <Typography variant="body2" color="white">
                        {option.name.en}
                      </Typography>
                      <Typography variant="body2" color="white">
                        {option.name.th}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            }}
          />
        </Grid>
      </Grid>
      {routes.length > 0 && (
        <Grid container spacing={0} className="my-2">
          {routes.map((record, index: number) => {
            // TODO: Extract to new component to manager this.
            const travelTime = humanizeDuration(record.duration * 1000, {
              language: locale,
            });
            const startTime = format(searchDate, "HH:mm");
            const endTime = format(
              addSeconds(searchDate, record?.duration || 0),
              "HH:mm"
            );
            const transferAmount: number =
              record.journey.filter(
                (value) => value.type === JourneyType.TRANSFER
              ).length || 0;
            const transferText = T("label.transfer-count", {
              count: transferAmount,
            });
            const routePreview =
              record.lines?.length === 0 ? (
                <DirectionsWalkIcon className="text-gray-800" />
              ) : (
                record.lines.map((line, index, self) => {
                  const lineName = subwayLines.find(
                    (record) => record.id === line
                  );
                  const dotClass =
                    "inline-flex w-5 h-5 rounded-full mr-1.5 " +
                    Colors[lineName?.name || ""];
                  return (
                    <React.Fragment key={index}>
                      <span className="inline-flex items-center text-sm font-medium dark:text-white ">
                        <span className={dotClass} />
                      </span>
                      {index !== self.length - 1 && (
                        <ArrowForwardIcon className="text-gray-800 mr-2" />
                      )}
                    </React.Fragment>
                  );
                })
              );

            return (
              <Grid
                item
                xs={12}
                key={index}
                className="border-gray-700 border-solid my-1"
              >
                <ListItemButton onClick={handleShowRouteDetail(index)}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Typography
                        variant="caption"
                        className="text-white font-semibold"
                        gutterBottom
                      >
                        {startTime} - {endTime} ({travelTime}), {transferText}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className="mt-2">
                      {routePreview}
                    </Grid>
                  </Grid>
                  {activeRoute !== index && <InfoIcon />}
                </ListItemButton>
                <Collapse
                  in={activeRoute === index}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding></List>
                </Collapse>
              </Grid>
            );
          })}
        </Grid>
      )}
      {currentRoute !== undefined && (
        <Grid container spacing={0} className="my-2" ref={ref}>
          <Grid item xs={12}>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
              className="mt-0"
            >
              <Journey {...currentRoute} />
            </Timeline>
          </Grid>
        </Grid>
      )}
    </Drawer>
  );
};

export default DesktopDrawer;
