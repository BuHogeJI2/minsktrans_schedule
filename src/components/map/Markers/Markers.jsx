import React from 'react'
import {Marker} from "react-google-maps";
import stopIcon from '../../../assets/image/stop_icon.png'
import {STOP_ICON_HEIGHT, STOP_ICON_WIDTH} from "../../../constants";
import CustomInfoWindow from "./CustomInfoWindow";

const areEqual = (prevProps, nextProps) => {
    return prevProps.stopsMarkerData === nextProps.stopsMarkerData;
}

const Markers = React.memo(({setCurrentStop, setCurrentRoute, stopsMarkerData, ...props}) => {

    const MARKER_ICON = {
        url: stopIcon,
        scaledSize: new window.google.maps.Size(STOP_ICON_WIDTH, STOP_ICON_HEIGHT)
    }

    const handleOnMarkerClick = (marker) => {
        setCurrentRoute(null);
        setCurrentStop(marker);
    }

    return (
        <>
            {stopsMarkerData.map(marker => {
                return <Marker key={marker.id}
                               icon={MARKER_ICON}
                               onClick={() => handleOnMarkerClick(marker)}
                               position={marker.position}>

                    <CustomInfoWindow setCurrentRoute={setCurrentRoute}
                                      setCurrentStop={setCurrentStop}
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