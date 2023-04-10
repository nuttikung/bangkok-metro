import { routes } from "../data/route";
import { stations } from "../data/station";

class Graph {
  AdjList: Map<number, number[]>;
  constructor() {
    this.AdjList = new Map();
  }

  addVertex(vertex: number) {
    this.AdjList.set(vertex, []);
  }

  addEdge(v1: number, v2: number) {
    this.AdjList.get(v1)?.push(v2);
    this.AdjList.get(v2)?.push(v1);
  }

  initialize() {
    stations.forEach((station) => this.addVertex(station.id));
    routes.forEach((route) => this.addEdge(route.id_from, route.id_to));
  }

  visit(end: number, path: number[]) {
    const paths: number[][] = [];
    const current = path[path.length - 1];
    const neighbors = this.AdjList.get(current);
    if (current === end) {
      return [path];
    }
    if (!!neighbors) {
      neighbors.forEach((neighbor) => {
        if (!path.includes(neighbor)) {
          paths.push(...this.visit(end, path.concat(neighbor)));
        }
      });
    }
    return paths;
  }
}

export default new Graph();
