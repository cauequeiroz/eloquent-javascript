const { bigOak, everywhere, defineRequestType } = require("./crow-tech");

/*  Errors
----------------------------------------------------- */

class Timeout extends Error {}


/*  Message types
----------------------------------------------------- */

function requestType(name, handler) {
  defineRequestType(name, (nest, content, source, callback) => {

    try {
      Promise.resolve(handler(nest, content, source))
        .then(response => callback(null, response),
              failure => callback(failure));
    } catch (exception) {
      callback(exception);
    }

  });
}

requestType("note", (nest, content, source) => {
  console.log(`${nest.name} receive message from ${source}: ${content}`);
});

requestType("ping", () => "pong");

requestType("gossip", (nest, message, source) => {
  if (nest.state.gossip.includes(message)) return;

  console.log(`${nest.name} received gossip '${message}' from ${source}`);
  sendGossip(nest, message, source);
});

requestType("connections", (nest, { name, neighbors }, source) => {
  let connections = nest.state.connections;

  if (JSON.stringify(connections.get(name)) ==
      JSON.stringify(neighbors)) return;

  connections.set(name, neighbors);
  broadcastConnections(nest, name, source);
});

requestType("route", (nest, { target, type, content }) => {
  return routeRequest(nest, target, type, content);
});

requestType("storage", (nest, name) => storage(nest, name));


/*  Network
----------------------------------------------------- */

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;

    const attempt = n => {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) reject(failed);
        else resolve(value);
      });

      setTimeout(() => {
        if (done) return;
        else if (n < 3) attempt(n + 1);
        else reject(new Timeout("Timed out."));
      }, 250);
    };

    attempt(1);
  });
}

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  } else {
    let via = findRoute(nest.name, target, nest.state.connections);
    if (!via) throw new Error(`No route to ${target}`);
    return request(nest, via, "route", { target, type, content });
  }
}


/*  Utils
----------------------------------------------------- */

everywhere(nest => {
  nest.state.gossip = [];
  nest.state.connections = new Map;
  nest.state.connections.set(nest.name, nest.neighbors);
  broadcastConnections(nest, nest.name);
});

function network(nest) {
  return Array.from(nest.state.connections.keys());
}

function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

async function findInStorage(nest, name) {
  let local = await storage(nest, name);
  if (local != null) return local;

  let sources = network(nest).filter(n => n != nest.name);
  
  while(sources.length > 0) {
    let source = sources[Math.floor(Math.random() * sources.length)];
    sources = sources.filter(n => n != source);

    try {
      let found = await routeRequest(nest, source, "storage", name);
      if (found != null) return found;
    } catch (_) {}
  }
}

function findInRemoteStorage(nest, name) {
  let sources = network(nest).filter(n => n != nest.name);

  function next() {
    if (sources.length == 0) {
      return Promise.reject(new Error("Not found"));
    } else {
      let source = sources[Math.floor(Math.random() * sources.length)];
      sources = sources.filter(n => n != source);
      return routeRequest(nest, source, "storage", name)
        .then(value => value != null ? value : next(), next);
    }
  }

  next();
}

function anyStorage(nest, source, name) {
  if (source == nest.name) return storage(nest, name);
  else return routeRequest(nest, source, 'storage', name);
}

function availableNeighbors(nest) {
  let requests = nest.neighbors.map(neighbor => {
    return request(nest, neighbor, "ping")
      .then(() => true, () => false);
  });

  return Promise.all(requests).then(result => {
    return nest.neighbors.filter((_, i) => result[i]);
  });
};

function sendGossip(nest, message, exceptFor = null) {
  nest.state.gossip.push(message);

  for (neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, "gossip", message);
  }
}

function broadcastConnections(nest, name, exceptFor = null) {
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;

    request(nest, neighbor, "connections", {
      name,
      neighbors: nest.state.connections.get(name)
    });
  }
}

function findRoute(from, to, connections) {
  let work = [{at: from, via: null}];
  for (let i = 0; i < work.length; i++) {
    let {at, via} = work[i];
    for (let next of connections.get(at) || []) {
      if (next == to) return via;
      if (!work.some(w => w.at == next)) {
        work.push({at: next, via: via || next});
      }
    }
  }
  return null;
}

async function chicks(nest, year) {
  let lines = network(nest).map(async name => {
    return name + ":" + await anyStorage(nest, name, `chicks in ${year}`);
  });
  return (await Promise.all(lines)).join("\n");
}

async function locateScalpel(nest) {
  let name = nest.name;
  let local;
  
  do {
    local = await anyStorage(nest, name, "scalpel");
    if (local == name) return local;
    name = local;
  } while (true)
}

function locateScalpel2(nest) {
  function next(name) {    
    return anyStorage(nest, name, "scalpel").then(value => {
      return value == name ? value : next(value);
    });
  }

  return next(nest.name);
}

setTimeout(() => {

  locateScalpel(bigOak).then(console.log);
  locateScalpel2(bigOak).then(console.log);

}, 500)