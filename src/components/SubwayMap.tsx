import CancelIcon from "@mui/icons-material/Cancel";
import SwipeDownAltIcon from "@mui/icons-material/SwipeDownAlt";
import SwipeUpAltIcon from "@mui/icons-material/SwipeUpAlt";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Core, ElementDefinition } from "cytoscape";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { useT } from "talkr";
import { useStationContext } from "../contexts/StationContext";
import { useUiContext } from "../contexts/UiContext";
import { subwayLines as lines } from "../data/line";
import { Route, RouteType, routes as subwayRoutes } from "../data/route";
import { Station, stations } from "../data/station";
import RoutePreviewDrawer from "./RoutePreviewDrawer";

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
  const { point, setPoint, routes, activeRoute } = useStationContext();
  const {
    nodeId,
    setNodeId,
    isShowPickNode,
    setIsShowPickNode,
    isShowRouteDetail,
  } = useUiContext();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { T, locale } = useT();

  const cyRef = useRef<null | Core>(null);
  const currentRoute = routes[activeRoute];
  // COMMENT: Prepare Nodes
  const nodes: ElementDefinition[] = useMemo(
    () =>
      stations.map((record: Station): ElementDefinition => {
        return {
          data: {
            id: `${record.id}`,
            label: locale === "en" ? record.name.en : record.name.th,
            // lat: record.lat,
            // lon: record.lng,
            // station_name: record.name.th,
          },
          renderedPosition: {
            x: record.lng * 20000,
            y: record.lat * -20000,
          },
          grabbable: false,
        };
      }),
    [locale]
  );
  // Prepare Edge
  const edges: ElementDefinition[] = subwayRoutes.map(
    (record: Route): ElementDefinition => {
      return {
        data: {
          refer: `${record.key}`,
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
  // COMMENT: Swipe drawer action
  const handleCloseSwipeDrawer = (
    event: React.SyntheticEvent<{}, Event>
  ): void => {
    setIsShowPickNode(false);
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
    setIsShowPickNode(false);
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
    setIsShowPickNode(false);
  };
  // COMMENT: cleanup cytoscape listeners on unmount
  useEffect(() => {
    return () => {
      if (cyRef.current) {
        cyRef.current.removeAllListeners();
        cyRef.current = null;
      }
    };
  }, []);
  // COMMENT: Cytoscape is ready to use
  const cyCallback = useCallback((cy: Core): void => {
    // this is called each render of the component, don't add more listeners
    if (cyRef.current) return;
    cyRef.current = cy;
    cyRef.current.ready(() => {
      // console.log("ready to search");
    });
    const node = cyRef.current?.elements("node#21");
    cyRef.current?.fit(node);
    cyRef.current?.on("tap", "node", (event) => {
      const node = event.target;
      // Hold node id ไว้ด้วย
      setIsShowPickNode(true);
      if (node !== undefined && node.data()?.id !== undefined) {
        setNodeId(node.data().id);
      }
    });
  }, []);
  // COMMENT: handle effect once point is changed
  useEffect(() => {
    if (cyRef !== null) {
      // COMMENT: clear start and end then reapply
      cyRef.current?.elements().removeClass("start end");
      if (point?.from?.id !== undefined) {
        cyRef.current?.getElementById(`${point.from.id}`).addClass("start");
      }
      if (point?.to?.id !== undefined) {
        cyRef.current?.getElementById(`${point.to.id}`).addClass("end");
      }
    }
  }, [point?.from, point?.to, cyRef, locale]);
  // COMMENT: set nodes to be path by current route
  useEffect(() => {
    if (cyRef !== null && currentRoute !== undefined) {
      const node = cyRef.current?.elements(`node#${point?.from?.id}`);
      const nodes = cyRef.current?.elements(
        `node#${point?.to?.id}, node#${point?.from?.id}`
      );
      cyRef.current?.fit(nodes);
      const edges = currentRoute.edges.map((record) => `${record.key}`);
      cyRef.current?.startBatch();
      cyRef.current?.elements().removeClass("path");
      currentRoute.stations
        .filter((id) => !(point.from?.id === id || point.to?.id === id))
        .map((nodeId) =>
          cyRef.current?.elements(`node#${nodeId}`).addClass("path")
        );
      cyRef.current?.edges().forEach((edge) => {
        if (edges.indexOf(edge.data("refer")) !== -1) {
          edge.addClass("path");
        } else {
          edge.addClass("not-path");
        }
      });
      cyRef.current?.endBatch();
    } else {
      // COMMENT: clear all preview route
      if (cyRef !== null) {
        cyRef.current?.elements().removeClass("path");
      }
    }
  }, [cyRef, currentRoute, point, isDesktop, locale, isShowPickNode]);
  // COMMENT: Work around -> path highlight
  useEffect(() => {
    if (cyRef !== null && currentRoute !== undefined) {
      const node = cyRef.current?.elements(`node#${point?.from?.id}`);
      const edges = currentRoute.edges.map((record) => `${record.key}`);
      cyRef.current?.startBatch();
      cyRef.current?.elements().removeClass("path");
      currentRoute.stations
        .filter((id) => !(point.from?.id === id || point.to?.id === id))
        .map((nodeId) =>
          cyRef.current?.elements(`node#${nodeId}`).addClass("path")
        );
      cyRef.current?.edges().forEach((edge) => {
        if (edges.indexOf(edge.data("refer")) !== -1) {
          edge.addClass("path");
        } else {
          edge.addClass("not-path");
        }
      });
      cyRef.current?.endBatch();
    }
  }, [isShowRouteDetail, locale]);

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="bottom"
        open={isShowPickNode}
        onClose={handleCloseSwipeDrawer}
        onOpen={handleOpenSwipeDrawer}
        disableSwipeToOpen={true}
        PaperProps={{
          classes: {
            root: "rounded-t-lg bg-gray-600",
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className="rounded-t-lg p-1 bg-transparent">
          <Stack
            direction="row"
            spacing={0}
            justifyContent="space-between"
            alignItems="start"
            className="m-2"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={0}
            >
              <Typography variant="body1" className="text-white" gutterBottom>
                {locale === "en" && pickStation !== undefined
                  ? `${pickStation?.name.en}`
                  : `${pickStation?.name.th}`}
              </Typography>
              <Typography variant="body1" className="text-white"></Typography>
            </Stack>
            <IconButton
              className="p-0"
              size="large"
              disableRipple
              onClick={handleCloseSwipeDrawer}
            >
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
              {T("label.from")}
            </Button>
            <Button
              variant="contained"
              className="m-2 bg-white hover:bg-white text-gray-600 normal-case"
              startIcon={<SwipeDownAltIcon />}
              fullWidth
              disableRipple
              onClick={handleSetTo}
            >
              {T("label.to")}
            </Button>
          </Stack>
        </div>
      </SwipeableDrawer>
      <CytoscapeComponent
        elements={elements}
        layout={layout}
        panningEnabled
        zoomingEnabled
        minZoom={0.2}
        maxZoom={0.8}
        className="w-screen h-[100svh] bg-gray-600"
        cy={cyCallback}
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
              color: "#FFF",
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
              color: "#FFF",
            },
          },
          {
            selector: "node.path",
            style: {
              width: 20,
              height: 20,
              "min-zoomed-font-size": 0,
              "border-color": "#000",
              "border-width": "10px",
              "text-outline-color": "#000",
              "text-outline-width": "10px",
              "z-index": 9999,
              "background-color": "#FC4C4C",
              color: "#FFF",
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
          {
            selector: "edge.path",
            style: {
              opacity: 0.8,
              "line-color": "#000",
            },
          },
        ]}
      />
      <RoutePreviewDrawer ref={cyRef} />
    </React.Fragment>
  );
};

export default React.memo(SubwayMap);
