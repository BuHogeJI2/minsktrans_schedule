import {decode_times} from "../parser_times";
import {HOUR_IN_MINUTES, MIDNIGHT, ROUTE_ID_INDEX, ROUTE_STOPS_ID_INDEX, TWO_DIGIT_NUMBER} from "../constants";

export const getTimes = (times) => {
    const splitedTimes = times.split('\n');
    return splitedTimes.map(timeLine => decode_times(timeLine))
}

export const getStopQueueOrderInRoutes = (routes, stop) => {
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

        timesForStopWithRoute[routeId] = startTimesForStop >= 0 && timesInRoute.times.slice(startTimesForStop, endTimesForStop);
    }

    return timesForStopWithRoute;
}

export const convertMinutesToHours = (timesInMinutes) => {

    return timesInMinutes.map(time => {
        let hours = Math.floor(time / HOUR_IN_MINUTES);
        let minutes = time % HOUR_IN_MINUTES;

        if (hours >= MIDNIGHT) hours -= MIDNIGHT;

        if (hours < TWO_DIGIT_NUMBER || minutes < TWO_DIGIT_NUMBER) {
            if (hours < TWO_DIGIT_NUMBER) hours = `0${hours}`
            if (minutes < TWO_DIGIT_NUMBER) minutes = `0${minutes}`
        }

        return `${hours}:${minutes}`
    })
}