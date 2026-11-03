import type { RouteType } from "@/enum/RouteType";

type MetroLineType = {
	refer: string;
	source: string;
	target: string;
	route_type: RouteType;
};

type LineGroupType = {
	color: string;
	segments: MetroLineType[];
};

export type { MetroLineType, LineGroupType };
