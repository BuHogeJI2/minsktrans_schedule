import React from "react";
import {
    COORD_MEASURE,
    ROUTE_NAME_INDEX,
    ROUTE_STOPS_ID_INDEX,
    STOP_COORDS_INDEX,
    STOP_ID_INDEX,
    STOP_INFO_LENGTH,
    STOP_NAME_INDEX
} from "./constants";

export const splitData = (file) => {
    const splitedData = file.split('\n');
    return splitedData.map(line => line.split(';'))
}

export const getStopMarkerData = (stopsTxt) => {
    const splitStopsData = splitData(stopsTxt);

    return splitStopsData.map(stopInfo => {
        if (stopInfo.length === STOP_INFO_LENGTH) {
            const stopName = stopInfo[STOP_NAME_INDEX];
            const stopCoords = {
                lat: +stopInfo[STOP_COORDS_INDEX.lat] / COORD_MEASURE,
                lng: +stopInfo[STOP_COORDS_INDEX.lng] / COORD_MEASURE
            }
            const stopId = stopInfo[STOP_ID_INDEX]

            return {
                id: stopId,
                name: stopName,
                position: stopCoords
            }
        }
    }).filter(item => !!item);
}

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
