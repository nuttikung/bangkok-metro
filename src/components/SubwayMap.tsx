import CancelIcon from "@mui/icons-material/Cancel";
import SwipeDownAltIcon from "@mui/icons-material/SwipeDownAlt";
import SwipeUpAltIcon from "@mui/icons-material/SwipeUpAlt";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import { Core, ElementDefinition } from "cytoscape";
import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { useStationContext } from "../contexts/StationContext";
import { useUiContext } from "../contexts/UiContext";
import { subwayLines as lines } from "../data/line";
import { Route, RouteType, routes } from "../data/route";
import { Station, stations } from "../data/station";

const findNodeStation = (id: string): Station | undefined => {
  if (id !== "") {
    const found = stations.find(
      (station: Station) => station.id === parseInt(id)
    );
    if (found !== undefined) {
      return found;
    }
  }
  return undefined;
};

// TODO: Implement Hight light Nodes and Edge base on active/current routes (main concept is opacity)
const SubwayMap = () => {
  const { point, setPoint } = useStationContext();
  const { isSwipeDrawer, setIsSwipeDrawer, nodeId, setNodeId } = useUiContext();
  let cy: Core;
  // COMMENT: Prepare Nodes
  const nodes: ElementDefinition[] = stations.map(
    (record: Station): ElementDefinition => {
      return {
        data: {
          id: `${record.id}`,
          label: record.name.en,
          // lat: record.lat,
          // lon: record.lng,
          // station_name: record.name.th,
        },
        position: {
          x: record.lng * 20000,
          y: record.lat * -20000,
        },
        grabbable: false,
      };
    }
  );
  // Prepare Edge
  const edges: ElementDefinition[] = routes.map(
    (record: Route): ElementDefinition => {
      return {
        data: {
          source: `${record.id_from}`,
          target: `${record.id_to}`,
          route_type: record.route_type,
        },
      };
    }
  );
  const layout = { name: "preset" };
  // Combine Element
  const elements: ElementDefinition[] = [...nodes, ...edges];
  const pickStation = findNodeStation(nodeId);

  // COMMENT: handle node/edge action
  const handleCy = (cy: Core): void => {
    if (cy !== undefined) {
      cy.on("tap", "node", (event) => {
        const node = event.target;
        // Hold node id ไว้ด้วย
        setIsSwipeDrawer(true);
        if (node !== undefined && node.data()?.id !== undefined) {
          setNodeId(node.data().id);
        }
      });
    }
    return;
  };

  // COMMENT: Swipe drawer action
  const handleCloseSwipeDrawer = (
    event: React.SyntheticEvent<{}, Event>
  ): void => {
    setIsSwipeDrawer(false);
  };
  // COMMENT: Not implement yet depending on usecase.
  const handleOpenSwipeDrawer = (
    event: React.SyntheticEvent<{}, Event>
  ): void => {
    throw new Error("Function not implemented.");
  };
  // COMMENT: Handle station pick to start point
  const handleSetFrom = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (pickStation?.id === point.to?.id) {
      setPoint({ ...point, to: point.from, from: pickStation });
    } else {
      setPoint({ ...point, from: pickStation });
    }
    setIsSwipeDrawer(false);
  };
  // COMMENT: Handle station pick to end point
  const handleSetTo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (pickStation?.id === point.from?.id) {
      setPoint({ ...point, from: point.to, to: pickStation });
    } else {
      setPoint({ ...point, to: pickStation });
    }
    setIsSwipeDrawer(false);
  };

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="bottom"
        open={isSwipeDrawer}
        onClose={handleCloseSwipeDrawer}
        onOpen={handleOpenSwipeDrawer}
        disableSwipeToOpen={true}
        PaperProps={{
          classes: {
            root: "rounded-t-lg",
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className="bg-gray-600 rounded-t-lg">
          <Stack
            direction="row"
            spacing={0}
            justifyContent="space-between"
            alignItems="center"
            className="my-2"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={0}
            >
              <Typography variant="body1" className="px-2 py-1 text-white">
                {pickStation && `${pickStation.name.en}`}
              </Typography>
              <Typography variant="body1" className="px-2 py-1 text-white">
                {pickStation && `${pickStation.name.th}`}
              </Typography>
            </Stack>
            <IconButton disableRipple onClick={handleCloseSwipeDrawer}>
              <CancelIcon />
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            spacing={0}
            justifyContent="space-between"
            alignItems="center"
            className="my-2"
          >
            <Button
              variant="contained"
              className="m-2 bg-white hover:bg-white text-gray-600 normal-case"
              startIcon={<SwipeUpAltIcon />}
              fullWidth
              disableRipple
              onClick={handleSetFrom}
            >
              From
            </Button>
            <Button
              variant="contained"
              className="m-2 bg-white hover:bg-white text-gray-600 normal-case"
              startIcon={<SwipeDownAltIcon />}
              fullWidth
              disableRipple
              onClick={handleSetTo}
            >
              To
            </Button>
          </Stack>
        </div>
      </SwipeableDrawer>
      <CytoscapeComponent
        elements={elements}
        layout={layout}
        className="w-screen h-screen bg-gray-600"
        cy={handleCy}
        stylesheet={[
          {
            selector: "node",
            style: {
              width: 20,
              height: 20,
              label: "data(label)",
              "background-color": "white",
              "border-color": "black",
              color: "#fff",
              "z-index": 1,
            },
          },
          {
            selector: "node.start",
            style: {
              height: 60,
              width: 60,
              "font-size": 48,
              "min-zoomed-font-size": 0,
              "border-color": "#000",
              "border-width": "10px",
              "text-outline-color": "#000",
              "text-outline-width": "10px",
              "z-index": 9999,
              "background-color": "#FC4C4C",
              color: "#FC4C4C",
            },
          },
          {
            selector: "node.end",
            style: {
              height: 60,
              width: 60,
              "min-zoomed-font-size": 0,
              "font-size": 48,
              "border-color": "#000",
              "border-width": "10px",
              "text-outline-color": "#000",
              "text-outline-width": "10px",
              "z-index": 9999,
              "background-color": "#FC4C4C",
              color: "#FC4C4C",
            },
          },
          {
            selector: "node:selected",
            style: {
              height: 60,
              width: 60,
              "min-zoomed-font-size": 0,
              "font-size": 48,
              "border-color": "#000",
              "border-width": "10px",
              "text-outline-color": "#000",
              "text-outline-width": "10px",
              "z-index": 9999,
            },
          },
          {
            selector: "edge",
            style: {
              // minZoomedFontSize: 12,
              // fontSize: 8,
              color: "#fff",
              "line-color": (element: any) => {
                let color = "#808080";
                if (RouteType.DRIVE === element.data("route_type")) {
                  // หาสีของสายตัวเอง
                  const foundColor = lines.find(
                    (line) =>
                      line.stations.indexOf(
                        parseInt(element.data("source"))
                      ) !== -1
                  );
                  if (foundColor?.color !== undefined) {
                    color = foundColor?.color;
                  }
                }
                return color;
              },
              width: 20,
              "curve-style": "haystack",
              "haystack-radius": 0,
              opacity: 0.5,
            },
          },
        ]}
      />
    </React.Fragment>
  );
};

export default React.memo(SubwayMap);
