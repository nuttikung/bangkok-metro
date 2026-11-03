import { type LatLngExpression } from "leaflet";

type MetroNodeType = {
	id: string;
	code: string;
	line: string;
	label: string;
	location: LatLngExpression;
};

export type { MetroNodeType };
