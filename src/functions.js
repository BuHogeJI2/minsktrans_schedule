import React from "react";
import {
    COORD_MEASURE,
    ROUTE_ID_INDEX,
    ROUTE_NAME_INDEX,
    ROUTE_STOPS_ID_INDEX,
    STOP_COORDS_INDEX,
    STOP_ID_INDEX,
    STOP_INFO_LENGTH,
    STOP_NAME_INDEX
} from "./constants";
import {decode_times} from "./parser_times";

export const splitData = (file) => {
    const splitedData = file.split('\n');
    return splitedData.map(line => line.split(';'))
}

export const getStopMarkerData = (stopsTxt) => {
    const splitStopsData = splitData(stopsTxt);

    return splitStopsData.map(stopInfo => {
        if (stopInfo.length === STOP_INFO_LENGTH) {
            const stopName = stopInfo[STOP_NAME_INDEX];
            if (stopName) {
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

export const getRoutesWithStop = (stop, routesTxt) => {
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

export const getTimes = (times) => {
    const splitedTimes = times.split('\n');
    return splitedTimes.map(timeLine => decode_times(timeLine))
}

export const getStopNumberInRoutes = (routes, stop) => {
    return routes.map(route => {
        const stopsIdInRoute = route[ROUTE_STOPS_ID_INDEX].split(',');
        const routeId = route[ROUTE_ID_INDEX];
        return {
            [routeId]: stopsIdInRoute.indexOf(stop.id)
        }
    })
}

export const getTimesForRoutes = (routes, times) => {
    const timesForStop = [];
    routes.forEach(route => {
        const routeId = route[ROUTE_ID_INDEX];
        times.forEach(time => {
            time.direction_id === routeId && timesForStop.push(time);
        })
    });
    return timesForStop;
}

export const getTimesForStopWithRoute = (stopNumberInRoutes, timesForRoutes) => {
    let timesForStopWithRoute = {};
    const routesNumberWithStop = stopNumberInRoutes.length;

    for (let routeNumber = 0; routeNumber < routesNumberWithStop; routeNumber++) {
        const timesInRoute = timesForRoutes[routeNumber];
        const routes = stopNumberInRoutes[routeNumber];
        const routeId = timesInRoute.direction_id;
        const numberOfStop = routes[routeId];
        const startTimesForStop = numberOfStop >= 0 && numberOfStop * timesInRoute.workdays.length;
        const endTimesForStop = startTimesForStop + timesInRoute.workdays.length;

        if (startTimesForStop >= 0) {
            timesForStopWithRoute[routeId] = timesInRoute.times.slice(startTimesForStop, endTimesForStop);
        } else {
            timesForStopWithRoute[routeId] = false;
        }
    }

    return timesForStopWithRoute;

}

export const convertMinutesToHours = (timesInMinutes) => {

    return timesInMinutes.map(time => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours}:${minutes}`

    })
}
