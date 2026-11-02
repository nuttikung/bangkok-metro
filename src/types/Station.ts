import { STATUS } from "@/enum/StationStatus";

type StationType = {
	id: number;
	line: string;
	status: STATUS;
	code: string;
	name: {
		en: string;
		th: string;
	};
	lat: number;
	lng: number;
};

export type { StationType };
