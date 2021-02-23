import {ROUTE_ID_INDEX, ROUTE_STOPS_ID_INDEX} from "../constants";
import _ from "lodash";

export const checkDirectRoutes = (routesA, routesB) => {
    let directRoutes = [];

    routesA.forEach(routeInA => {
        routesB.forEach(routeInB => {
            if (routeInA[ROUTE_ID_INDEX] === routeInB[ROUTE_ID_INDEX]) {
                directRoutes.push(routeInA);
            }
        })
    })

    return directRoutes;
}

export const getMatchingStopsInRoutes = (routesA, routesB) => {
    const stopsInPointARoutes = routesA.map(route => route[ROUTE_STOPS_ID_INDEX]);
    const stopsInPointBRoutes = routesB.map(route => route[ROUTE_STOPS_ID_INDEX]);
    return _.intersection(stopsInPointARoutes.join().split(','), stopsInPointBRoutes.join().split(','));
}

export const getMatchingStopInRoutes = (routeA, routeB) => {
    const stopsInPointARoute = routeA[ROUTE_STOPS_ID_INDEX];
    const stopsInPointBRoute = routeB[ROUTE_STOPS_ID_INDEX];
    return _.intersection(stopsInPointARoute.split(','), stopsInPointBRoute.split(','))[0];
}

export const getPossibleRoutes = (stops, routes) => {
    let possibleRoutes = [];
    stops.forEach(stop => {
        routes.forEach(route => {
            route[ROUTE_STOPS_ID_INDEX].includes(stop) && possibleRoutes.push(route)
        })
    })
    return possibleRoutes;
}

export const chooseRouteByTime = (routes) => { // it doesn't work yet
    return routes[0]
}