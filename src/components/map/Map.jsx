import React, {useCallback, useEffect, useState} from 'react'
import {GoogleMap, withGoogleMap, withScriptjs, InfoWindow, DirectionsRenderer} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import mapStyle from "./mapStyle";
import {CLUSTER, INFO_WINDOW_Z_INDEX, MAP_ZOOM, MINSK_COORDS, ROUTES_FILE_NAME, STOPS_FILE_NAME} from "../../constants";
import {fetchInfo} from "../../api";
import {getDataList, renderMarker, setDirectionsData} from "../../functions";
import SearchForm from "../SearchForm/SearchForm";

const Map = () => {

    const [stopsTxt, setStopsTxt] = useState('');
    const [routesTxt, setRoutesTxt] = useState('');
    const [currentStop, setCurrentStop] = useState(null);
    const [directions, setDirections] = useState('');

    const handleKeyPress = useCallback(event => {
        if (event.charCode === 70) {
            let modalForm = document.querySelector('#modal_form_wrapper');
            modalForm.style.display = 'block';

            window.onclick = (event) => {
                if (event.target === modalForm) {
                    modalForm.style.display = 'none';
                }
            }
        }
    }, [])

    useEffect(() => {
        fetchInfo(STOPS_FILE_NAME, setStopsTxt);
        fetchInfo(ROUTES_FILE_NAME, setRoutesTxt);

        setDirectionsData(setDirections);
    }, [])

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [handleKeyPress])

    return (
        <div>
            <GoogleMap defaultZoom={MAP_ZOOM}
                       defaultOptions={{styles: mapStyle}}
                       defaultCenter={MINSK_COORDS}>
                <MarkerClusterer averageCenter
                                 maxZoom={CLUSTER.maxZoom}
                                 minimumClusterSize={CLUSTER.minimumSize}
                                 enableRetinaIcons
                                 gridSize={CLUSTER.gridSize}>
                    {getDataList(stopsTxt).map(stopInfo => renderMarker(stopInfo, setCurrentStop))}
                </MarkerClusterer>
                {currentStop &&
                <InfoWindow position={currentStop.stopCoords}
                            onCloseClick={() => setCurrentStop(null)}
                            defaultZIndex={INFO_WINDOW_Z_INDEX}>
                    <h3>{currentStop.stopName || 'Без названия'}</h3>
                </InfoWindow>
                }
                {/*{directions && <DirectionsRenderer directions={directions}/>}*/}
            </GoogleMap>
            <SearchForm routesTxt={routesTxt}/>
        </div>
    )
}

export default withScriptjs(withGoogleMap(Map));