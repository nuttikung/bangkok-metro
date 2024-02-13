export enum RouteType {
	DRIVE = "drive",
	CHANGE = "change",
}

export type Route = {
	key: number;
	id_from: number;
	id_to: number;
	route_type: RouteType;
	delay: number;
};

export const routes: Route[] = [
	{ key: 1, id_from: 1, id_to: 3, route_type: RouteType.DRIVE, delay: 300 },
	{ key: 2, id_from: 3, id_to: 4, route_type: RouteType.DRIVE, delay: 300 },
	{ key: 3, id_from: 4, id_to: 5, route_type: RouteType.DRIVE, delay: 240 },
	{ key: 4, id_from: 5, id_to: 6, route_type: RouteType.DRIVE, delay: 240 },
	{ key: 5, id_from: 6, id_to: 7, route_type: RouteType.DRIVE, delay: 240 },
	{ key: 6, id_from: 7, id_to: 8, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 7, id_from: 8, id_to: 9, route_type: RouteType.DRIVE, delay: 60 },
	{ key: 8, id_from: 11, id_to: 12, route_type: RouteType.DRIVE, delay: 60 },
	{ key: 9, id_from: 11, id_to: 42, route_type: RouteType.DRIVE, delay: 240 },
	{ key: 10, id_from: 11, id_to: 43, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 11, id_from: 12, id_to: 13, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 12, id_from: 13, id_to: 14, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 13, id_from: 14, id_to: 15, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 14, id_from: 15, id_to: 16, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 15, id_from: 16, id_to: 17, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 16, id_from: 17, id_to: 18, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 17, id_from: 18, id_to: 19, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 18, id_from: 19, id_to: 20, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 19, id_from: 20, id_to: 21, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 20, id_from: 21, id_to: 22, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 21, id_from: 22, id_to: 23, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 22, id_from: 23, id_to: 24, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 23, id_from: 24, id_to: 25, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 24, id_from: 25, id_to: 26, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 25, id_from: 26, id_to: 27, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 26, id_from: 27, id_to: 28, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 27, id_from: 28, id_to: 29, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 28, id_from: 29, id_to: 30, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 29, id_from: 30, id_to: 31, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 30, id_from: 31, id_to: 32, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 31, id_from: 32, id_to: 33, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 32, id_from: 33, id_to: 34, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 33, id_from: 34, id_to: 35, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 34, id_from: 35, id_to: 36, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 35, id_from: 36, id_to: 37, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 36, id_from: 37, id_to: 38, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 37, id_from: 38, id_to: 39, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 38, id_from: 39, id_to: 40, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 39, id_from: 40, id_to: 41, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 40, id_from: 41, id_to: 42, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 41, id_from: 43, id_to: 44, route_type: RouteType.DRIVE, delay: 60 },
	{ key: 42, id_from: 44, id_to: 45, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 43, id_from: 45, id_to: 46, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 44, id_from: 46, id_to: 47, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 45, id_from: 47, id_to: 48, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 46, id_from: 337, id_to: 73, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 47, id_from: 73, id_to: 325, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 48, id_from: 74, id_to: 75, route_type: RouteType.DRIVE, delay: 60 },
	{ key: 49, id_from: 75, id_to: 86, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 50, id_from: 86, id_to: 96, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 51, id_from: 96, id_to: 97, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 52, id_from: 97, id_to: 98, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 53, id_from: 98, id_to: 99, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 54, id_from: 99, id_to: 100, route_type: RouteType.DRIVE, delay: 120 },
	{
		key: 55,
		id_from: 100,
		id_to: 101,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 56,
		id_from: 101,
		id_to: 102,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{ key: 57, id_from: 102, id_to: 76, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 58, id_from: 76, id_to: 77, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 59, id_from: 77, id_to: 78, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 60, id_from: 78, id_to: 79, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 61, id_from: 79, id_to: 80, route_type: RouteType.DRIVE, delay: 60 },
	{ key: 62, id_from: 80, id_to: 81, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 63, id_from: 81, id_to: 82, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 64, id_from: 82, id_to: 83, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 65, id_from: 83, id_to: 84, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 66, id_from: 84, id_to: 85, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 67, id_from: 85, id_to: 87, route_type: RouteType.DRIVE, delay: 180 },
	{ key: 68, id_from: 87, id_to: 88, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 69, id_from: 88, id_to: 89, route_type: RouteType.DRIVE, delay: 120 },
	{ key: 70, id_from: 89, id_to: 90, route_type: RouteType.DRIVE, delay: 120 },
	{
		key: 71,
		id_from: 103,
		id_to: 104,
		route_type: RouteType.DRIVE,
		delay: 240,
	},
	{
		key: 72,
		id_from: 104,
		id_to: 105,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 73,
		id_from: 164,
		id_to: 163,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 74,
		id_from: 163,
		id_to: 162,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 75,
		id_from: 162,
		id_to: 161,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 76,
		id_from: 161,
		id_to: 160,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 77,
		id_from: 160,
		id_to: 158,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{ key: 78, id_from: 158, id_to: 157, route_type: RouteType.DRIVE, delay: 60 },
	{
		key: 79,
		id_from: 157,
		id_to: 156,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 80,
		id_from: 156,
		id_to: 155,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 81,
		id_from: 155,
		id_to: 154,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 82,
		id_from: 154,
		id_to: 153,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 83,
		id_from: 153,
		id_to: 152,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{ key: 84, id_from: 152, id_to: 151, route_type: RouteType.DRIVE, delay: 60 },
	{
		key: 85,
		id_from: 151,
		id_to: 150,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{ key: 86, id_from: 150, id_to: 149, route_type: RouteType.DRIVE, delay: 60 },
	{
		key: 87,
		id_from: 149,
		id_to: 175,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 88,
		id_from: 175,
		id_to: 174,
		route_type: RouteType.DRIVE,
		delay: 240,
	},
	{ key: 89, id_from: 174, id_to: 173, route_type: RouteType.DRIVE, delay: 60 },
	{
		key: 90,
		id_from: 173,
		id_to: 171,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{ key: 91, id_from: 171, id_to: 170, route_type: RouteType.DRIVE, delay: 60 },
	{
		key: 92,
		id_from: 170,
		id_to: 169,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{
		key: 93,
		id_from: 169,
		id_to: 159,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 94,
		id_from: 159,
		id_to: 148,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{ key: 95, id_from: 148, id_to: 74, route_type: RouteType.DRIVE, delay: 120 },
	{
		key: 96,
		id_from: 234,
		id_to: 235,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 97,
		id_from: 235,
		id_to: 236,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{
		key: 98,
		id_from: 236,
		id_to: 237,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 99,
		id_from: 237,
		id_to: 238,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 100,
		id_from: 238,
		id_to: 239,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{
		key: 101,
		id_from: 239,
		id_to: 240,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 102,
		id_from: 240,
		id_to: 241,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 103,
		id_from: 241,
		id_to: 242,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{
		key: 104,
		id_from: 242,
		id_to: 243,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 105,
		id_from: 243,
		id_to: 244,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 106,
		id_from: 244,
		id_to: 245,
		route_type: RouteType.DRIVE,
		delay: 240,
	},
	{
		key: 107,
		id_from: 245,
		id_to: 246,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 108,
		id_from: 246,
		id_to: 247,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{
		key: 109,
		id_from: 247,
		id_to: 248,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 110,
		id_from: 248,
		id_to: 249,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 111,
		id_from: 274,
		id_to: 275,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{
		key: 112,
		id_from: 275,
		id_to: 276,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 113,
		id_from: 276,
		id_to: 277,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 114,
		id_from: 277,
		id_to: 278,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 115,
		id_from: 278,
		id_to: 279,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{
		key: 116,
		id_from: 279,
		id_to: 280,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 117,
		id_from: 280,
		id_to: 281,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 118,
		id_from: 281,
		id_to: 282,
		route_type: RouteType.DRIVE,
		delay: 240,
	},
	{
		key: 119,
		id_from: 282,
		id_to: 283,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{
		key: 120,
		id_from: 311,
		id_to: 312,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{
		key: 121,
		id_from: 312,
		id_to: 315,
		route_type: RouteType.DRIVE,
		delay: 420,
	},
	{
		key: 122,
		id_from: 315,
		id_to: 316,
		route_type: RouteType.DRIVE,
		delay: 420,
	},
	{
		key: 123,
		id_from: 325,
		id_to: 329,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{
		key: 124,
		id_from: 329,
		id_to: 330,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 125,
		id_from: 330,
		id_to: 331,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 126,
		id_from: 331,
		id_to: 332,
		route_type: RouteType.DRIVE,
		delay: 60,
	},
	{
		key: 127,
		id_from: 332,
		id_to: 333,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 128,
		id_from: 333,
		id_to: 334,
		route_type: RouteType.DRIVE,
		delay: 180,
	},
	{
		key: 129,
		id_from: 334,
		id_to: 335,
		route_type: RouteType.DRIVE,
		delay: 60,
	},
	{
		key: 130,
		id_from: 335,
		id_to: 336,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 131,
		id_from: 336,
		id_to: 326,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 132,
		id_from: 326,
		id_to: 327,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 133,
		id_from: 327,
		id_to: 328,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 134,
		id_from: 44,
		id_to: 328,
		route_type: RouteType.CHANGE,
		delay: 180,
	},
	{
		key: 135,
		id_from: 73,
		id_to: 74,
		route_type: RouteType.CHANGE,
		delay: 120,
	},
	{
		key: 136,
		id_from: 248,
		id_to: 312,
		route_type: RouteType.CHANGE,
		delay: 240,
	},
	{
		key: 137,
		id_from: 249,
		id_to: 20,
		route_type: RouteType.CHANGE,
		delay: 240,
	},
	{
		key: 138,
		id_from: 21,
		id_to: 274,
		route_type: RouteType.CHANGE,
		delay: 420,
	},
	{
		key: 139,
		id_from: 21,
		id_to: 311,
		route_type: RouteType.CHANGE,
		delay: 420,
	},
	{
		key: 140,
		id_from: 274,
		id_to: 311,
		route_type: RouteType.CHANGE,
		delay: 420,
	},
	{
		key: 141,
		id_from: 23,
		id_to: 174,
		route_type: RouteType.CHANGE,
		delay: 180,
	},
	{
		key: 142,
		id_from: 24,
		id_to: 175,
		route_type: RouteType.CHANGE,
		delay: 180,
	},
	{
		key: 143,
		id_from: 9,
		id_to: 159,
		route_type: RouteType.CHANGE,
		delay: 180,
	},
	{
		key: 144,
		id_from: 36,
		id_to: 329,
		route_type: RouteType.CHANGE,
		delay: 180,
	},
	{
		key: 145,
		id_from: 103,
		id_to: 334,
		route_type: RouteType.CHANGE,
		delay: 180,
	},
	{
		key: 146,
		id_from: 32,
		id_to: 97,
		route_type: RouteType.CHANGE,
		delay: 180,
	},
	{ key: 147, id_from: 7, id_to: 31, route_type: RouteType.CHANGE, delay: 300 },
	{
		key: 148,
		id_from: 204,
		id_to: 244,
		route_type: RouteType.CHANGE,
		delay: 300,
	},
	{
		key: 149,
		id_from: 204,
		id_to: 205,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 150,
		id_from: 205,
		id_to: 206,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 151,
		id_from: 206,
		id_to: 207,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 152,
		id_from: 207,
		id_to: 208,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 153,
		id_from: 208,
		id_to: 209,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 154,
		id_from: 209,
		id_to: 210,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 155,
		id_from: 210,
		id_to: 211,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 156,
		id_from: 211,
		id_to: 212,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 157,
		id_from: 212,
		id_to: 213,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 158,
		id_from: 213,
		id_to: 214,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 159,
		id_from: 214,
		id_to: 215,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 160,
		id_from: 215,
		id_to: 216,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 161,
		id_from: 216,
		id_to: 217,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 162,
		id_from: 217,
		id_to: 279,
		route_type: RouteType.CHANGE,
		delay: 300,
	},
	{
		key: 163,
		id_from: 217,
		id_to: 218,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 164,
		id_from: 218,
		id_to: 219,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 165,
		id_from: 219,
		id_to: 156,
		route_type: RouteType.CHANGE,
		delay: 300,
	},
	{
		key: 166,
		id_from: 219,
		id_to: 220,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 167,
		id_from: 220,
		id_to: 221,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 168,
		id_from: 221,
		id_to: 222,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 169,
		id_from: 222,
		id_to: 223,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 170,
		id_from: 223,
		id_to: 224,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 171,
		id_from: 224,
		id_to: 225,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 172,
		id_from: 225,
		id_to: 226,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 173,
		id_from: 226,
		id_to: 227,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 174,
		id_from: 227,
		id_to: 228,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 175,
		id_from: 228,
		id_to: 229,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 176,
		id_from: 229,
		id_to: 230,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 177,
		id_from: 230,
		id_to: 231,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 178,
		id_from: 231,
		id_to: 232,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
	{
		key: 179,
		id_from: 232,
		id_to: 233,
		route_type: RouteType.DRIVE,
		delay: 120,
	},
];

export default routes;
