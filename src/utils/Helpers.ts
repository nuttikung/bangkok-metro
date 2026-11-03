import { subwayLines } from "@/data/line";
import type { Route } from "@/data/route";
import { RouteType } from "@/enum/RouteType";
import type { StationType } from "@/types/Station";
import { stations as STATIONS } from "@/data/station";

// ----------------------------------------------------------------------

const STATION_MAP = new Map<string, StationType>(
	STATIONS.map((station) => [`${station.id}`, station]),
);

// ----------------------------------------------------------------------

function getRouteLine(route: Route) {
	if (route.route_type !== RouteType.DRIVE) return undefined;

	return subwayLines.find(
		(line) =>
			line.stations.includes(route.id_from) &&
			line.stations.includes(route.id_to),
	);
}

// ----------------------------------------------------------------------

function getStartEndPoint(source: string, target: string) {
	const start = STATION_MAP.get(source)!;
	const end = STATION_MAP.get(target)!;
	return [start, end];
}

// ----------------------------------------------------------------------

export { getRouteLine, getStartEndPoint };
