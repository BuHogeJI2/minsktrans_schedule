import React, {useState} from 'react'
import {Marker, InfoWindow} from "react-google-maps";
import stopIcon from '../../assets/image/stop_icon.png'
import {STOP_ICON_HEIGHT, STOP_ICON_WIDTH} from "../../constants";

const areEqual = (prevProps, nextProps) => {
    // return prevProps.stopsMarkerData === nextProps.stopsMarkerData;
}

const Markers = React.memo(({stopsMarkerData, chooseCurrentStop, currentStop}) => {

    const MARKER_ICON = {
        url: stopIcon,
        scaledSize: new window.google.maps.Size(STOP_ICON_WIDTH, STOP_ICON_HEIGHT)
    }

    return (
        <>
            {stopsMarkerData.map(marker => {
                return <Marker key={marker.id}
                               icon={MARKER_ICON}
                               onClick={() => chooseCurrentStop(marker)}
                               position={marker.position}>

                    {currentStop && currentStop.id === marker.id && (
                        <InfoWindow onCloseClick={() => chooseCurrentStop(null)}>
                            <h2>
                                {currentStop.name}
                            </h2>
                        </InfoWindow>)}
                </Marker>
            })}
        </>
    )
}, areEqual)

export default Markers;