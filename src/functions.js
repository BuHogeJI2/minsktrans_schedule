import {
    COORD_MEASURE,
    STOP_COORDS_INDEX,
    STOP_ICON_HEIGHT,
    STOP_ICON_WIDTH,
    STOP_INFO_LENGTH,
    STOP_NAME_INDEX
} from "./constants";
import {Marker} from "react-google-maps";
import stopIcon from "./assets/image/stop_icon.png";
import React from "react";

export const getDataList = (file) => {
    const resultList = []
    const splitedData = file.split('\n');

    splitedData.forEach(line => {
        resultList.push(line.split(';'));
    })

    return resultList;
}

export const renderMarker = (stopInfo, setCurrentStop) => {
    if (stopInfo.length === STOP_INFO_LENGTH) {
        const stopName = stopInfo[STOP_NAME_INDEX];
        const stopCoords = {
            lat: +stopInfo[STOP_COORDS_INDEX.lat] / COORD_MEASURE,
            lng: +stopInfo[STOP_COORDS_INDEX.lng] / COORD_MEASURE
        }

        return <Marker position={stopCoords}
                       onClick={() => setCurrentStop({stopCoords, stopName})}
                       icon={{url: stopIcon, scaledSize: new window.google.maps.Size(STOP_ICON_WIDTH, STOP_ICON_HEIGHT)}}
        />
    }
}

export const setDirectionsData = (setDirections) => {
    const origin = { lat: 6.5244, lng:  3.3792 };
    const destination = { lat: 6.4667, lng:  3.4500};

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints: []
    }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result)
        } else {
            console.error('direction error:', result)
        }
    })
}

export const getSearchingRoutes = (request, routesTxt) => {
    const routes = getDataList(routesTxt);
    let searchingRoutes = [];
    routes.forEach(route => {
        let routeName = route[10];
        if (routeName) {
            if (routeName.includes(request)) {
                searchingRoutes.push(route)
            }
        }
    })
    return searchingRoutes;
}
