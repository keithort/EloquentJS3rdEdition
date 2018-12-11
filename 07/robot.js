const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("0"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map(p => {
          if (p.place !== this.place) {
            return p;
          }
          return {
            place: destination,
            address: p.address
          };
        })
        .filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }

  random(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({ place, address });
    }
    return new VillageState("Post Office", parcels);
  }
}

let first = new VillageState("Post Office", [
  { place: "Post Office", address: "Alice's House" }
]);
let next = first.move("Alice's House");

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {
    direction: randomPick(roadGraph[state.place])
  };
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (!state.parcels.length) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

runRobot(VillageState.random(), randomRobot);

const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office"
];

function routeRobot(state, memory) {
  if (!memory.length) {
    memory = mailRoute;
  }
  return {
    direction: memory[0],
    memory: memory.slice(1)
  };
}

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) {
        return route.concat(place);
      }
      if (!work.some(w => w.at == place)) {
        work.push({
          at: place,
          route: route.concat(place)
        });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (!route.length) {
    let parcel = parcels[0];
    if (parcel.place !== place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(routeGraph, place, parcel.address);
    }
  }
  return {
    direction: route[0],
    memory: route.slice(1)
  };
}

function compareRobots(robot1, memory1, robot2, memory2) {
  function runBot(state, robot, memory) {
    let steps = 0;
    for (let turn = 0; ; turn++) {
      if (!state.parcels.length) {
        break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      steps++;
    }
    return steps;
  }
  let bot1 = 0;
  let bot2 = 0;
  for (let i = 0; i < 100; i++) {
    const task = VillageState.random();
    bot1 += runBot(task, robot1, memory1);
    bot2 += runBot(task, robot2, memory2);
  }
  console.log(`Robot 1 completed in average of ${bot1 / 100} steps`);
  console.log(`Robot 2 completed in average of ${bot2 / 100} steps`);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);

function fasterRobot({ place, parcels }, route) {
  function score({ route, pickUp }) {
    return (pickUp ? 0.5 : 0) - route.length;
  }
  if (!route.length) {
    const routes = parcels.map(parcel => {
      return {
        route:
          parcel.place !== place
            ? findRoute(roadGraph, place, parcel.place)
            : findRoute(roadGraph, place, parcel.address),
        pickUp: parcel.place !== place
      };
    });
    route = routes.reduce((acc, b) => (score(acc) > score(b) ? acc : b)).route;
  }
  return {
    direction: route[0],
    memory: route.slice(1)
  };
}

class PGroup {
  constructor(group) {
    this.group = group;
  }

  has(value) {
    return this.group.includes(value);
  }

  add(value) {
    if (this.has(value)) {
      return this;
    } else {
      return new PGroup(this.group.concat([value]));
    }
  }

  delete(value) {
    if (!this.has(value)) {
      return this;
    } else {
      return new PGroup(this.group.filter(item => item !== value));
    }
  }

  static empty() {
    return new PGroup([]);
  }
}
