import React, {useCallback, useEffect, useState} from 'react'
import {GoogleMap, withGoogleMap, withScriptjs, DirectionsRenderer} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import mapStyle from "./mapStyle";
import {getStopMarkerData, splitData, splitTimes} from "../../functions";
import SearchForm from "../SearchForm/SearchForm";
import OpenSearchFormButton from "../buttons/OpenSearchFormButton";
import Markers from "./Markers";
import {
    CLUSTER,
    MAP_ZOOM,
    MINSK_COORDS, UPPER_F_CHAR_CODE,
} from "../../constants";


const Map = ({stopsTxt, routesTxt, timesTxt}) => {

    const [stopsMarkerData, setStopsMarkerData] = useState([]);
    const [currentStop, setCurrentStop] = useState(null);
    const [directions, setDirections] = useState('');

    const handleKeyPress = useCallback(event => {
        if (event.charCode === UPPER_F_CHAR_CODE) {
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
                    <Markers stopsMarkerData={stopsMarkerData}
                             currentStop={currentStop}
                             routesTxt={routesTxt}
                             chooseCurrentStop={chooseCurrentStop}
                    />
                </MarkerClusterer>
                {directions && <DirectionsRenderer directions={directions}/>}
            </GoogleMap>
            <SearchForm stopsTxt={stopsTxt} routesTxt={routesTxt} setDirections={setDirections}/>
        </div>
    )
}

export default withScriptjs(withGoogleMap(Map));