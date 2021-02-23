import React, {useCallback, useEffect} from 'react'
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
import Clock from "../clock/Clock";
import {connect} from "react-redux";
import {MarkerType, setMarkersData, setTimesData, TimeDataType} from "../../bll/reducers/staticData";
import {
    DirectionType,
    setCurrentRoute,
    setCurrentStop,
    setDirections
} from "../../bll/reducers/dynamicData";
import {AppStateType} from "../../bll/store";
import Markers from "./Markers/Markers";
import BuildingRoute from "../buildingRoute/BuildingRoute";

type MapOwnPropsType = {
    stopsTxt: string
    routesTxt: string
    timesTxt: string
}

type MapStatePropsType = {
    markersData: Array<MarkerType>
    timesData: Array<TimeDataType>
    directions: DirectionType
}

type MapDispatchPropsType = {
    setMarkersData: (markersData: Array<MarkerType>) => void
    setTimesData: (timesData: Array<TimeDataType>) => void
    setDirections: (direction: DirectionType) => void
    setCurrentStop: (stop: MarkerType | null) => void
    setCurrentRoute: (direction: Array<string> | null) => void
}

type MapPropsType = MapOwnPropsType & MapStatePropsType & MapDispatchPropsType;

const Map: React.FC<MapPropsType> = ({stopsTxt, routesTxt, timesTxt, ...props}) => {

    const handleKeyPress = useCallback(event => {
        if (event.charCode === UPPER_F_CHAR_CODE) {
            const modalForm = document.querySelector('#modal_form_wrapper');
            // @ts-ignore
            modalForm.style.display = 'block';

            window.onclick = (event: any) => {
                if (event.target === modalForm) {
                    // @ts-ignore
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
            <BuildingRoute stopsTxt={stopsTxt} routesTxt={routesTxt} setDirections={props.setDirections}/>
            <OpenSearchFormButton/>
            <Clock/>
            <GoogleMap defaultZoom={MAP_ZOOM}
                       defaultOptions={{styles: mapStyle}}
                       defaultCenter={MINSK_COORDS}>
                <MarkerClusterer averageCenter
                                 enableRetinaIcons
                                 maxZoom={CLUSTER.maxZoom}
                                 minimumClusterSize={CLUSTER.minimumSize}
                                 gridSize={CLUSTER.gridSize}>
                    <Markers markersData={props.markersData}
                             routesTxt={routesTxt}
                             stopsTxt={stopsTxt}
                             setDirections={props.setDirections}
                             setCurrentStop={props.setCurrentStop}
                             setCurrentRoute={props.setCurrentRoute}
                             times={props.timesData}/>
                </MarkerClusterer>
                {props.directions && <Directions directions={props.directions}/>}
            </GoogleMap>
            <SearchForm stopsTxt={stopsTxt} routesTxt={routesTxt} setDirections={props.setDirections}/>
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        markersData: state.staticData.markersData,
        timesData: state.staticData.timesData,
        directions: state.dynamicData.directions,
    }
}

export default connect(mapStateToProps, {
    setMarkersData,
    setTimesData,
    setDirections,
    setCurrentStop,
    setCurrentRoute,
})(withScriptjs(withGoogleMap(Map)));
