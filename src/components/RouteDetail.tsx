import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import Journey from "../components/Journey";
import { useStationContext } from "../contexts/StationContext";
import { useUiContext } from "../contexts/UiContext";

const RouteDetail = () => {
  const { isShowRouteDetail, setIsShowRouteDetail } = useUiContext();
  const { routes, activeRoute, setIsPreviewRoute } = useStationContext();
  const currentRoute = routes[activeRoute];
  // iOS
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  //   close drawer to show preview
  const handleCloseRouteDetail = (
    event: React.SyntheticEvent<{}, Event>
  ): void => {
    setIsShowRouteDetail(false);
    setIsPreviewRoute(true);
  };

  if (currentRoute === undefined) {
    return null;
  }

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="bottom"
      disableSwipeToOpen={true}
      open={isShowRouteDetail}
      PaperProps={{
        className: "rounded-t-xl bg-gray-600 max-h-[85%] overflow-visible",
        elevation: 0,
      }}
      ModalProps={{ keepMounted: true }}
      onOpen={() => {}}
      onClose={handleCloseRouteDetail}
    >
      <div className="sticky bg-gray-600 z-50 w-full rounded-t-xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="p-2"
        >
          <Typography variant="body1" className="text-white normal-case px-2">
            {currentRoute.duration / 60} minutes
          </Typography>
          <IconButton
            aria-label="close"
            className="text-white normal-case"
            disableRipple
            onClick={handleCloseRouteDetail}
          >
            <CloseSharpIcon />
          </IconButton>
        </Stack>
        <Divider />
      </div>
      <div className="mt-2 overflow-auto">
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
      </div>
    </SwipeableDrawer>
  );
};

export default RouteDetail;

//       <div className="sticky top-0 bg-white z-50">
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//           className="p-2"
//         >
//           <Typography
//             variant="button"
//             className="text-gray-600 font-semibold normal-case"
//           >
//             {currentRoute.duration / 60} minutes
//           </Typography>
//           <Button
//             variant="text"
//             disableRipple
//             className="text-primary normal-case"
//             onClick={handleCloseRouteClick}
//           >
//             Close
//           </Button>
//         </Stack>
//         <Divider />
//       </div>
//       <Timeline
//         sx={{
//           [`& .${timelineItemClasses.root}:before`]: {
//             flex: 0,
//             padding: 0,
//           },
//         }}
//         className="mt-0"
//       >
//         <JourneyTimeline {...currentRoute} />
//       </Timeline>
//     </React.Fragment>
