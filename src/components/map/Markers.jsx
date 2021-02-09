import React, {useRef, useState} from 'react'
import {Marker, InfoWindow} from "react-google-maps";
import stopIcon from '../../assets/image/stop_icon.png'
import {ROUTE_ID_INDEX, ROUTE_NAME_INDEX, STOP_ICON_HEIGHT, STOP_ICON_WIDTH} from "../../constants";
import {
    convertMinutesToHours,
    getDirectionData,
    getRoutesWithStop, getStopNumberInRoutes,
    getTimesForRoutes, getTimesForStopWithRoute,
    setDirectionsData
} from "../../functions";
import css from '../Main.module.css'

const areEqual = (prevProps, nextProps) => {
    // return prevProps.stopsMarkerData === nextProps.stopsMarkerData;
}

const Markers = React.memo((props) => {

    const [currentRoute, setCurrentRoute] = useState(null);

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
            return <div className={css.routeWithStop}>
                <span onClick={()=>renderDirection(route)}>{route[ROUTE_NAME_INDEX]}</span> -->
                <span onClick={()=>setCurrentRoute(route)}>Расписание</span>
            </div>
        })
    }

    const renderTimesWithStop = (currentStop) => {
        let timesWithStop = [];
        const routesWithStop = getRoutesWithStop(currentStop, props.routesTxt);
        const stopNumberInRoutes = getStopNumberInRoutes(routesWithStop, currentStop);
        const timesForRoutes = getTimesForRoutes(routesWithStop, props.times);
        const timesForStop = getTimesForStopWithRoute(stopNumberInRoutes, timesForRoutes);

        const currentRouteId = currentRoute[ROUTE_ID_INDEX];
        const timeForRoute = convertMinutesToHours(timesForStop[currentRouteId])
        console.log(timeForRoute)
        return <div>
            {currentRoute[ROUTE_NAME_INDEX]}: {timeForRoute}
        </div>

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
                                    {currentRoute && <span onClick={()=>setCurrentRoute(null)}>Вернуть маршруты</span>}
                                </h2>
                                {!currentRoute && renderRoutesWithStop(props.currentStop)}
                                {currentRoute && renderTimesWithStop(props.currentStop)}
                            </div>
                        </InfoWindow>)}
                </Marker>
            })}
        </>
    )
}, areEqual)

export default Markers;