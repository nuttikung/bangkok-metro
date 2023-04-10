export type Line = {
  id: number;
  name: string;
  color: string;
  code: string;
  stations: number[];
};

export const subwayLines: Line[] = [
  {
    id: 1,
    name: "ARL",
    color: "#761f21",
    code: "SUBWAY-ARL",
    stations: [1, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 2,
    name: "Blue",
    color: "#1964b7",
    code: "SUBWAY-BLUE",
    stations: [
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
      29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
      47, 48,
    ],
  },
  {
    id: 3,
    name: "Dark green",
    color: "#02817d",
    code: "SUBWAY-DARK-GREEN",
    stations: [
      73, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337,
    ],
  },
  {
    id: 4,
    name: "Light green",
    color: "#76b729",
    code: "SUBWAY-LIGHT-GREEN",
    stations: [
      74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 96,
      97, 98, 99, 100, 101, 102, 148, 149, 150, 151, 152, 153, 154, 155, 156,
      157, 158, 159, 160, 161, 162, 163, 164, 169, 170, 171, 173, 174, 175,
    ],
  },
  {
    id: 5,
    name: "Gold",
    color: "#A58704",
    code: "SUBWAY-GOLD",
    stations: [103, 104, 105],
  },
  {
    id: 6,
    name: "Purple",
    color: "#660066",
    code: "SUBWAY-PURPLE",
    stations: [
      234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248,
      249,
    ],
  },
  {
    id: 7,
    name: "Red north",
    color: "#E10506",
    code: "SUBWAY-RED-NORTH",
    stations: [274, 275, 276, 277, 278, 279, 280, 281, 282, 283],
  },
  {
    id: 8,
    name: "Red west",
    color: "#FD5353",
    code: "SUBWAY-RED-WEST",
    stations: [311, 312, 315, 316],
  },
];

export default subwayLines;
