import React, {useCallback, useEffect, useState} from 'react'
import {GoogleMap, withGoogleMap, withScriptjs, InfoWindow, DirectionsRenderer} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import mapStyle from "./mapStyle";
import {getStopMarkerData} from "../../functions";
import SearchForm from "../SearchForm/SearchForm";
import OpenSearchFormButton from "../buttons/OpenSearchFormButton";
import Markers from "./Markers";
import {
    CLUSTER,
    INFO_WINDOW_Z_INDEX,
    MAP_ZOOM,
    MINSK_COORDS,
} from "../../constants";


const Map = ({stopsTxt, routesTxt}) => {

    const [stopsMarkerData, setStopsMarkerData] = useState([]);
    const [currentStop, setCurrentStop] = useState(null);
    const [directions, setDirections] = useState('');

    const handleKeyPress = useCallback(event => {
        if (event.charCode === 70) {
            const modalForm = document.querySelector('#modal_form_wrapper');
            modalForm.style.display = 'block';

            window.onclick = (event) => {
                if (event.target === modalForm) {
                    modalForm.style.display = 'none';
                }
            }
        }
    }, [])

    const chooseCurrentStop = (value) => {
        setCurrentStop(value)
    }

    useEffect(() => {
        setStopsMarkerData(getStopMarkerData(stopsTxt));
    }, [stopsTxt])

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [handleKeyPress])

    return (
        <div>
            <OpenSearchFormButton />
            <GoogleMap defaultZoom={MAP_ZOOM}
                       defaultOptions={{styles: mapStyle}}
                       defaultCenter={MINSK_COORDS}>
                <MarkerClusterer averageCenter
                                 enableRetinaIcons
                                 maxZoom={CLUSTER.maxZoom}
                                 minimumClusterSize={CLUSTER.minimumSize}
                                 gridSize={CLUSTER.gridSize}
                >
                    <Markers stopsMarkerData={stopsMarkerData} chooseCurrentStop={chooseCurrentStop}/>
                </MarkerClusterer>
                {currentStop &&
                    <InfoWindow
                        position={currentStop.position}
                        onCloseClick={() => chooseCurrentStop(null)}
                        zIndex={INFO_WINDOW_Z_INDEX}
                    >
                        <h3>{currentStop.name || 'Без названия'}</h3>
                    </InfoWindow>
                }
                {directions && <DirectionsRenderer directions={directions}/>}
            </GoogleMap>
            <SearchForm stopsTxt={stopsTxt} routesTxt={routesTxt} setDirections={setDirections}/>
        </div>
    )
}

export default withScriptjs(withGoogleMap(Map));