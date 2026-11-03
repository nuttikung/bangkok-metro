import { MapContainer, TileLayer } from "react-leaflet";
import MetroNodes from "@/components/MetroNodes";
import MetroLines from "@/components/MetroLines";
import { type LatLngExpression } from "leaflet";

// ----------------------------------------------------------------------

const MAP_CONFIG = {
	preferCanvas: true,
	scrollWheelZoom: false,
	center: [13.745611433340166, 100.53414740687204] as LatLngExpression,
	zoom: 13,
	maxZoom: 16,
} as const;

// ----------------------------------------------------------------------

const MetroMap = () => {
	return (
		<MapContainer
			className="w-full h-full"
			preferCanvas={MAP_CONFIG.preferCanvas}
			center={MAP_CONFIG.center}
			zoom={MAP_CONFIG.zoom}
			maxZoom={MAP_CONFIG.maxZoom}
			scrollWheelZoom={MAP_CONFIG.scrollWheelZoom}
		>
			<TileLayer
				className="my-clean-white-map"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* Put the lines before nodes */}
			<MetroLines />

			<MetroNodes />
		</MapContainer>
	);
};

export default MetroMap;
