import { type LatLngExpression } from "leaflet";

type MetroNodeType = {
	id: string;
	line: string;
	label: string;
	location: LatLngExpression;
};

export type { MetroNodeType };
