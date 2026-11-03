import { Fragment } from "react";
import { Marker, Popup } from "react-leaflet";
import { stations } from "@/data/station";
import type { MetroNodeType } from "@/types/MetroNode";
import { divIcon } from "leaflet";
import type { StationType } from "@/types/Station";
import Colors from "@/utils/Color";

const createStationIcon = (lineName: keyof typeof Colors) => {
	const colorClass = Colors[lineName] || "";

	return divIcon({
		className: "custom-station-icon",
		html: `<div class="w-6 h-6 ${colorClass} rounded-full border-2 border-white shadow-md flex items-center justify-center transform -translate-y-1/2">
             <div class="w-2 h-2 bg-white rounded-full"></div>
           </div>`,
		iconSize: [24, 24],
		iconAnchor: [12, 12],
	});
};

const MetroNodes = () => {
	const ALL_NODES: MetroNodeType[] = stations.map((record: StationType) => ({
		id: `${record.id}`,
		code: record.code,
		line: record.line,
		label: record.name.en,
		location: [record.lat, record.lng],
	}));

	return (
		<Fragment>
			{ALL_NODES.map((station) => (
				<Marker
					key={station.id}
					position={station.location}
					// opacity={0.7}
					icon={createStationIcon(station.line)}
				>
					<Popup>{station.label}</Popup>
				</Marker>
			))}
		</Fragment>
	);
};

export default MetroNodes;
