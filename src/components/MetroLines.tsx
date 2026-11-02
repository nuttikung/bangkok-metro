import { routes as ROUTES } from "@/data/route";
import { stations as STATIONS } from "@/data/station";
import type { MetroLineType } from "@/types/MetroLine";
import type { StationType } from "@/types/Station";
import { Fragment } from "react";
import { Polyline } from "react-leaflet";

const LINE_CONFIG = {
	color: "white",
	weight: 5,
	// opacity: 0.7,
};

const MetroLines = () => {
	const stationMap = new Map<string, StationType>(
		STATIONS.map((station) => [`${station.id}`, station]),
	);

	const routes: Array<MetroLineType> = ROUTES.map((record) => ({
		refer: `${record.key}`,
		source: `${record.id_from}`,
		target: `${record.id_to}`,
		route_type: record.route_type,
	}));

	const polyLine = routes.map((route) => {
		const start = stationMap.get(route.source)!;
		const end = stationMap.get(route.target)!;
		return [start, end];
	});

	return (
		<Fragment>
			<Polyline positions={polyLine} pathOptions={LINE_CONFIG} />
		</Fragment>
	);
};

export default MetroLines;
