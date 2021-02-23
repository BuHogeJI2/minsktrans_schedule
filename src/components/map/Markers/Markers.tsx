import React from 'react'
import {Marker} from "react-google-maps";
import stopIcon from '../../../assets/image/stop_icon.png'
import {STOP_ICON_HEIGHT, STOP_ICON_WIDTH} from "../../../constants";
import CustomInfoWindow from "./CustomInfoWindow";
import {MarkerType, TimeDataType} from "../../../bll/reducers/staticData";
import {DirectionType} from "../../../bll/reducers/dynamicData";

type MarkersOwnPropsType = {
    markersData: Array<MarkerType>
    routesTxt: string
    stopsTxt: string
    times: Array<TimeDataType>
    setDirections: (direction: DirectionType) => void
    setCurrentStop: (stop: MarkerType | null) => void
    setCurrentRoute: (direction: Array<string> | null) => void
}

const areEqual = (prevProps: MarkersOwnPropsType, nextProps: MarkersOwnPropsType) => {
    return prevProps.markersData === nextProps.markersData;
}

const Markers: React.FC<MarkersOwnPropsType> = React.memo((props) => {

        const MARKER_ICON = {
        url: stopIcon,
        // @ts-ignore
        scaledSize: new window.google.maps.Size(STOP_ICON_WIDTH, STOP_ICON_HEIGHT)
    }

    const handleOnMarkerClick = (marker: MarkerType) => {
        props.setCurrentRoute(null);
        props.setCurrentStop(marker);
    }

    return (
        <>
            {props.markersData.map(marker => {
                return <Marker key={marker.id}
                               icon={MARKER_ICON}
                               onClick={() => handleOnMarkerClick(marker)}
                               position={marker.position}>

                    <CustomInfoWindow setCurrentRoute={props.setCurrentRoute}
                                      setCurrentStop={props.setCurrentStop}
                                      marker={marker}
                                      setDirections={props.setDirections}
                                      times={props.times}
                                      routesTxt={props.routesTxt}
                                      stopsTxt={props.stopsTxt}/>
                </Marker>
            })}
        </>
    )
}, areEqual)

export default Markers;