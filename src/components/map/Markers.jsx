import React from 'react'
import {Marker, InfoWindow} from "react-google-maps";
import stopIcon from '../../assets/image/stop_icon.png'
import {ROUTE_NAME_INDEX, STOP_ICON_HEIGHT, STOP_ICON_WIDTH} from "../../constants";
import {getRoutesWithStop} from "../../functions";
import css from '../Main.module.css'

const areEqual = (prevProps, nextProps) => {
    // return prevProps.stopsMarkerData === nextProps.stopsMarkerData;
}

const Markers = React.memo(({stopsMarkerData, chooseCurrentStop, routesTxt, currentStop}) => {

    const MARKER_ICON = {
        url: stopIcon,
        scaledSize: new window.google.maps.Size(STOP_ICON_WIDTH, STOP_ICON_HEIGHT)
    }

    const renderRoutesWithStop = (currentStop) => {
        const routes = getRoutesWithStop(currentStop, routesTxt);
        return routes.map(route => {
            return <div className={css.routeWithStop}>
                {route[ROUTE_NAME_INDEX]}
            </div>
        })
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
                                {renderRoutesWithStop(currentStop)}
                            </h2>
                        </InfoWindow>)}
                </Marker>
            })}
        </>
    )
}, areEqual)

export default Markers;