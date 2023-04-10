// import { routes } from "../data/route";
// import { stations } from "../data/station";
// import Graph from "./graph";

// class API {
//   graph: Graph;
//   constructor() {
//     this.graph = new Graph();
//   }

//   async initialGraph() {
//     try {
//       stations.forEach((station) => {
//         this.graph.addVertex(station.id);
//       });
//       routes.forEach((route) => {
//         this.graph.addEdge(route.id_from, route.id_to);
//       });
//       return;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async check_connected_change(section) {
//     try {
//       let connected = false
//       for (let index = 0; index <= section.length - 2; index++) {
//         if (
//           section[index].mode === 'walking' &&
//           section[index + 1].mode === 'walking'
//         ) {
//           connected = true
//           break
//         }
//       }
//       return connected
//     } catch (error) {
//       throw error
//     }
//   }

// }

// export default new API();
