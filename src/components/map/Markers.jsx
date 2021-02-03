import React from 'react'
import {Marker, InfoWindow} from "react-google-maps";
import stopIcon from '../../assets/image/stop_icon.png'
import {ROUTE_NAME_INDEX, STOP_ICON_HEIGHT, STOP_ICON_WIDTH} from "../../constants";
import {getDirectionData, getRoutesWithStop, setDirectionsData} from "../../functions";
import css from '../Main.module.css'

const areEqual = (prevProps, nextProps) => {
    // return prevProps.stopsMarkerData === nextProps.stopsMarkerData;
}

const Markers = React.memo((props) => {

    const MARKER_ICON = {
        url: stopIcon,
        scaledSize: new window.google.maps.Size(STOP_ICON_WIDTH, STOP_ICON_HEIGHT)
    }

    const renderDirection = (route) => {
        const directionData = getDirectionData(route, props.stopsTxt);
        setDirectionsData(directionData, props.setDirections);
    }

    const renderRoutesWithStop = (currentStop) => {
        const routes = getRoutesWithStop(currentStop, props.routesTxt);
        return routes.map(route => {
            return <div className={css.routeWithStop} onClick={()=>{renderDirection(route)}}>
                {route[ROUTE_NAME_INDEX]}
            </div>
        })
    }

    return (
        <>
            {props.stopsMarkerData.map(marker => {
                return <Marker key={marker.id}
                               icon={MARKER_ICON}
                               onClick={() => props.chooseCurrentStop(marker)}
                               position={marker.position}>

                    {props.currentStop && props.currentStop.id === marker.id && (
                        <InfoWindow onCloseClick={() => props.chooseCurrentStop(null)}>
                            <div>
                                <h2>
                                    {props.currentStop.name}
                                </h2>
                                {renderRoutesWithStop(props.currentStop)}
                            </div>
                        </InfoWindow>)}
                </Marker>
            })}
        </>
    )
}, areEqual)

export default Markers;