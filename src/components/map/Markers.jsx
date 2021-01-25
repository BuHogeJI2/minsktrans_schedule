import React from 'react'
import {Marker} from "react-google-maps";
import stopIcon from '../../assets/image/stop_icon.png'
import {STOP_ICON_HEIGHT, STOP_ICON_WIDTH} from "../../constants";

const areEqual = (prevProps, nextProps) => {
    return prevProps.stopsMarkerData === nextProps.stopsMarkerData;
}

const Markers = React.memo(({stopsMarkerData, chooseCurrentStop}) => {

    const MARKER_ICON = {
        url: stopIcon,
        scaledSize: new window.google.maps.Size(STOP_ICON_WIDTH, STOP_ICON_HEIGHT)
    }

    return (
        <>
            {stopsMarkerData.map(marker => {
                return <Marker key={marker.id}
                               icon={MARKER_ICON}
                               onClick={()=>chooseCurrentStop(marker)}
                               position={marker.position} />
            })}
        </>
    )
}, areEqual)

export default Markers;