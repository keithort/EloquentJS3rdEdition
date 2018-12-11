async function locateScalpel(nest) {
  let currNest = nest.name;
  while (true) {
    const nextNest = await anyStorage(nest, currNest, "scalpel");
    if (currNest === nextNest) {
      return currNest;
    }
    currNest = nextNest;
  }
}

function locateScalpel2(nest) {
  function loop(currNest) {
    return anyStorage(nest, currNest, "scalpel").then(nextNest => {
      if (currNest === nextNest) {
        return currNest;
      }
      return loop(nextNest);
    });
  }
  return loop(nest.name);
}

locateScalpel(bigOak).then(console.log);
// → Butcher Shop

locateScalpel2(bigOak).then(console.log);
// → Butcher Shop
