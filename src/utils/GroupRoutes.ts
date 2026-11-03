import { routes as ROUTES } from "@/data/route";
import { RouteType } from "@/enum/RouteType";
import type { MetroLineType, LineGroupType } from "@/types/MetroLine";
import { getRouteLine } from "@/utils/Helpers";

function groupRoutes() {
	const lineGroups = new Map<number, LineGroupType>();
	const changeSegments: MetroLineType[] = [];

	ROUTES.forEach((route) => {
		const segment: MetroLineType = {
			refer: `${route.key}`,
			source: `${route.id_from}`,
			target: `${route.id_to}`,
			route_type: route.route_type,
		};

		if (route.route_type === RouteType.CHANGE) {
			changeSegments.push(segment);
			return;
		}

		const line = getRouteLine(route);

		if (!line) {
			// no route should be ignore
			return;
		}

		let group = lineGroups.get(line.id);

		if (!group) {
			group = { color: line.color, segments: [] };
			lineGroups.set(line.id, group);
		}

		group.segments.push(segment);
	});

	const convertLineGroups = Array.from(lineGroups);

	return { lineGroups: convertLineGroups, changeSegments };
}

export { groupRoutes };
