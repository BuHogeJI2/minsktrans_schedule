import React, {useCallback, useEffect, useState} from 'react'
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import mapStyle from "./mapStyle";
import SearchForm from "../SearchForm/SearchForm";
import OpenSearchFormButton from "../buttons/OpenSearchFormButton";
import {
    CLUSTER,
    MAP_ZOOM,
    MINSK_COORDS, UPPER_F_CHAR_CODE,
} from "../../constants";
import Directions from "./Directions";
import {getStopMarkerData} from "../../services/stops";
import {getTimes} from "../../services/times";
import MarkersContainer from "./Markers/MarkersContainer";
import Clock from "../clock/Clock";
import {compose} from "redux";
import {connect} from "react-redux";
import {setMarkersData, setTimesData} from "../../bll/reducers/staticData";


const Map = ({stopsTxt, routesTxt, timesTxt, ...props}) => {

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

    useEffect(() => {
        props.setMarkersData(getStopMarkerData(stopsTxt));
        props.setTimesData(getTimes(timesTxt));
    }, [stopsTxt, timesTxt])

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [handleKeyPress])

    return (
        <div>
            <OpenSearchFormButton />
            <Clock />
            <GoogleMap defaultZoom={MAP_ZOOM}
                       defaultOptions={{styles: mapStyle}}
                       defaultCenter={MINSK_COORDS}>
                <MarkerClusterer averageCenter
                                 enableRetinaIcons
                                 maxZoom={CLUSTER.maxZoom}
                                 minimumClusterSize={CLUSTER.minimumSize}
                                 gridSize={CLUSTER.gridSize}>
                    <MarkersContainer stopsMarkerData={props.markersData}
                                      routesTxt={routesTxt}
                                      stopsTxt={stopsTxt}
                                      setDirections={setDirections}
                                      times={props.timesData}/>
                </MarkerClusterer>
                {directions && <Directions directions={directions}/>}
            </GoogleMap>
            <SearchForm stopsTxt={stopsTxt} routesTxt={routesTxt} setDirections={setDirections}/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        markersData: state.staticData.markersData,
        timesData: state.staticData.timesData,
    }
}

export default compose(
    connect(mapStateToProps, {setMarkersData, setTimesData}),
    withScriptjs,
    withGoogleMap)(Map);