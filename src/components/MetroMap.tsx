import { MapContainer, TileLayer } from "react-leaflet";
import MetroNodes from "@/components/MetroNodes";
import MetroLines from "@/components/MetroLines";

const MetroMap = () => {
	return (
		<MapContainer
			center={[13.697907419545665, 100.75224930065019]}
			zoom={13}
			scrollWheelZoom={false}
			className="w-full h-full"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<MetroLines />
			{/*<Polyline positions={mockPosition} pathOptions={example} />*/}

			<MetroNodes />
		</MapContainer>
	);
};

export default MetroMap;
