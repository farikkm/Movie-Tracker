import { Route } from "../utils/route.js";

const routes = [
  new Route("/", "home"),
  new Route("/movie", "movie"),
  new Route("/favorites", "favorites"),
];

const page404 = new Route("/page-not-found", "404");

const router = () => {
  const path = window.location.pathname;
  const match = findMatch(path) || page404;

  match.loadView();
  match.loadStyles();
};

const navigateTo = (url) => {
  window.history.pushState(null, null, url);
  router();
};

function findMatch(path) {
  return routes.find((route) => route.path === path);
}

export { router, navigateTo };
