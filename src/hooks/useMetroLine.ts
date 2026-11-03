import { RouteType } from "@/enum/RouteType";
import { StationType } from "@/types/Station";
import { groupRoutes } from "@/utils/GroupRoutes";
import { getStartEndPoint } from "@/utils/Helpers";

/**
 * Return set of metro line for SELECTED, DIM
 */
function useMetroLine() {
	const result: Record<string, { color: string; positions: StationType[][] }> =
		{};
	const { lineGroups } = groupRoutes();
	let temp: StationType[][] = [];

	lineGroups.forEach(([lineId, route]) => {
		route.segments.forEach((record) => {
			if (record.route_type === RouteType.CHANGE) {
				return;
			}

			const position = getStartEndPoint(record.source, record.target);
			temp.push(position);
		});

		result[lineId] = {
			color: route.color,
			positions: temp,
		};
		temp = [];
	});

	return {
		selected: result,
		dim: {},
	};
}

export { useMetroLine };
