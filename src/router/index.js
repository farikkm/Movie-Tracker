import { Route } from "../utils/route.js";

const routes = [
  new Route("/", "home"),
  new Route("/movie", "movie"),
  new Route("/favorites", "favorites"),
];

const page404 = new Route("/page-not-found", "404");

let currentModule;

const router = async () => {
  const path = window.location.pathname;
  const match = findMatch(path) || page404;

  await match.loadView();
  match.loadStyles();

  currentModule?.destroy?.();

  if (match.filename) {
    import(`../scripts/${match.filename}.js`)
      .then((module) => {
        module.init?.();
        currentModule = module;
      })
      .catch(() => {
        console.log("Error: Script file is not loaded");
      });
  }
};

const navigateTo = (url) => {
  window.history.pushState(null, null, url);
  router();
};

function findMatch(path) {
  return routes.find((route) => route.path === path);
}

export { router, navigateTo };
