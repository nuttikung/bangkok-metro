import { CHNAGE_PATH_OPTION } from "@/config/ChnagePathOption";
import { groupRoutes } from "@/utils/GroupRoutes";
import { Fragment } from "react";
import { Polyline } from "react-leaflet";
import { getStartEndPoint } from "@/utils/Helpers";
import { useMetroLine } from "@/hooks/useMetroLine";
import { BASE_PATH_OPTION } from "@/config/BasePathOption";

// ----------------------------------------------------------------------
const { changeSegments } = groupRoutes();

const changeLine = changeSegments.map((change) =>
	getStartEndPoint(change.source, change.target),
);

// ---------------------------------------

// Active Route -> Per line color
// Dim Route - Per line coloe
// Change Route - All

const MetroLines = () => {
	const { selected } = useMetroLine();
	const lineGroup = Object.entries(selected);

	return (
		<Fragment>
			{/* Change line should be dash style */}
			<Polyline positions={changeLine} pathOptions={CHNAGE_PATH_OPTION} />

			{lineGroup.map(([id, { color, positions }]) => {
				const PATH_OPTION = { ...BASE_PATH_OPTION, color };

				return (
					<Polyline key={id} positions={positions} pathOptions={PATH_OPTION} />
				);
			})}
		</Fragment>
	);
};

export default MetroLines;
