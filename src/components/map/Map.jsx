import React, {useEffect, useState} from 'react'
import {GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import stopIcon from '../../assets/image/stop_icon.png'
import mapStyle from "./mapStyle";
import {
    CLUSTER,
    COORD_MEASURE, INFO_WINDOW_Z_INDEX, MAP_ZOOM,
    MINSK_COORDS,
    STOP_COORDS_INDEX,
    STOP_ICON_HEIGHT,
    STOP_ICON_WIDTH, STOP_INFO_LENGTH,
    STOP_NAME_INDEX
} from "../../constants";
import {fetchStopsInfo} from "../../api";

const getStopsData = (stopsTxt) => {
    const stopsList = []
    const splitedStops = stopsTxt.split('\n');

    splitedStops.forEach(stop => {
        stopsList.push(stop.split(';'))
    })

    return stopsList;
}

const Map = () => {

    const [stopsTxt, setStopsTxt] = useState('');
    const [currentStop, setCurrentStop] = useState(null);

    const renderMarker = (stopInfo) => {
        if (stopInfo.length === STOP_INFO_LENGTH) {
            const stopName = stopInfo[STOP_NAME_INDEX];
            const stopCoords = {
                lat: +stopInfo[STOP_COORDS_INDEX.lat] / COORD_MEASURE,
                lng: +stopInfo[STOP_COORDS_INDEX.lng] / COORD_MEASURE
            }

            return <Marker position={stopCoords}
                           onClick={() => setCurrentStopData(stopName, stopCoords)}
                           icon={{url: stopIcon, scaledSize: new window.google.maps.Size(STOP_ICON_WIDTH, STOP_ICON_HEIGHT)}}
            />
        }
    }

    const setCurrentStopData = (stopName, stopCoords) => setCurrentStop({stopCoords, stopName})

    useEffect(() => {
        const fileName = 'stops.txt';
        fetchStopsInfo(fileName, setStopsTxt)
    }, [])

    return (
        <GoogleMap defaultZoom={MAP_ZOOM}
                   defaultOptions={{styles: mapStyle}}
                   defaultCenter={MINSK_COORDS}>
            <MarkerClusterer averageCenter
                             maxZoom={CLUSTER.maxZoom}
                             minimumClusterSize={CLUSTER.minimumSize}
                             enableRetinaIcons
                             gridSize={CLUSTER.gridSize}>
                {getStopsData(stopsTxt).map(stopInfo => renderMarker(stopInfo))}
            </MarkerClusterer>
            {currentStop &&
            <InfoWindow position={currentStop.stopCoords}
                        onCloseClick={() => setCurrentStop(null)}
                        defaultZIndex={INFO_WINDOW_Z_INDEX}>
                <h3>{currentStop.stopName || 'Без названия'}</h3>
            </InfoWindow>
            }
        </GoogleMap>
    )
}

export default withScriptjs(withGoogleMap(Map));