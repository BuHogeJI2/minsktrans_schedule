import {
    COORD_MEASURE,
    ROUTE_NAME_INDEX,
    ROUTE_STOPS_ID_INDEX,
    STOP_COORDS_INDEX,
    STOP_ID_INDEX,
    STOP_NAME_INDEX
} from "../constants";
import {splitData} from "./common";

export const getSearchingRoutes = (request, routesTxt, stopsTxt) => {
    const routes = splitData(routesTxt);
    let searchingRoutes = [];

    routes.forEach(route => {
        let routeName = route[ROUTE_NAME_INDEX];
        if (routeName !== 'RouteName') {
            routeName && routeName.includes(request) && searchingRoutes.push(route);
        }
    })

    if (!searchingRoutes.length) {
        const stops = splitData(stopsTxt);
        stops.forEach(stop => {
            const stopName = stop[STOP_NAME_INDEX];
            if (stopName && stopName.includes(request)) {
                routes.forEach(route => {
                    const stopsIdInRoute = route[ROUTE_STOPS_ID_INDEX]
                    if (stopsIdInRoute && stopsIdInRoute.includes(stop[STOP_ID_INDEX])) {
                        searchingRoutes.push(route)
                    }
                })
            }
        })
    }

    return searchingRoutes;
}

export const getRoutesWithCurrentStop = (stop, routesTxt) => {
    const routes = splitData(routesTxt);
    let searchingRoutes = [];
    if (stop.name) {
        routes.forEach(route => {
            const routeName = route[ROUTE_NAME_INDEX];
            const stopsIdInRoute = route[ROUTE_STOPS_ID_INDEX]
            if (stopsIdInRoute && (stopsIdInRoute.includes(stop.id) || routeName.includes(stop.name))) {
                searchingRoutes.push(route)
            }
        })
    }
    return searchingRoutes;
}

export const getDirectionData = (route, stopsTxt) => {
    const stops = splitData(stopsTxt);
    const stopsIdInRoute = route[ROUTE_STOPS_ID_INDEX].split(',');
    let stopsInRoute = [];

    stopsIdInRoute.forEach(stopId => {  // double loop, for save queue;
        stops.forEach(stop => {
            if (stop[STOP_ID_INDEX] === stopId) {
                stopsInRoute.push(stop);
            }
        })
    })

    console.log(stopsInRoute)
    const waypointsStops = stopsInRoute.slice(1, -2); // except first and last stop;
    let waypointsObjects = waypointsStops.map(stop => {
        return {
            location: {
                lat: +stop[STOP_COORDS_INDEX.lat] / COORD_MEASURE,
                lng: +stop[STOP_COORDS_INDEX.lng] / COORD_MEASURE
            }
        }
    })

    return {
        origin: {
            lat: +stopsInRoute[0][STOP_COORDS_INDEX.lat] / COORD_MEASURE,
            lng: +stopsInRoute[0][STOP_COORDS_INDEX.lng] / COORD_MEASURE
        },
        destination: {
            lat: +stopsInRoute[stopsInRoute.length - 1][STOP_COORDS_INDEX.lat] / COORD_MEASURE,
            lng: +stopsInRoute[stopsInRoute.length - 1][STOP_COORDS_INDEX.lng] / COORD_MEASURE
        },
        waypoints: waypointsObjects
    }
}

export const makeDirectionFormat = (origin, destination, waypoints) => {

    return {
        origin: origin.position,
        destination: destination.position,
        waypoints: waypoints
    }
}

export const setDirectionsData = (direction, setDirections) => {

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route({
        origin: direction.origin,
        destination: direction.destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints: direction.waypoints
    }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result)
        } else {
            console.error('Direction Error:', result)
        }
    })
}