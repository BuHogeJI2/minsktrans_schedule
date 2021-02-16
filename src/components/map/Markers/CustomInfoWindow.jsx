import {InfoWindow} from "react-google-maps";
import css from "../Map.module.css";
import React from "react";
import {useContextConsumer} from "./MarkersContainer";
import {getDirectionData, getRoutesWithCurrentStop, setDirectionsData} from "../../../services/routes";
import {ROUTE_ID_INDEX, ROUTE_NAME_INDEX} from "../../../constants";
import {
    convertMinutesToHours,
    getStopQueueOrderInRoutes,
    getTimesForRoutes,
    getTimesForStopWithRoute
} from "../../../services/times";

const CustomInfoWindow = ({setCurrentStop, setCurrentRoute, marker, ...props}) => {

    const {currentStop, currentRoute} = useContextConsumer();

    const renderDirection = (route) => {
        const directionData = getDirectionData(route, props.stopsTxt);
        setDirectionsData(directionData, props.setDirections);
    }

    const showRoutes = (currentStop) => {
        const routes = getRoutesWithCurrentStop(currentStop, props.routesTxt);
        return routes.map(route => {
            return <div className={css.routeWithStop}>
                <span className={css.route_name_in_routes}
                      onClick={() => renderDirection(route)}>{route[ROUTE_NAME_INDEX]}</span>
                <span className={css.show_times} onClick={() => setCurrentRoute(route)}>Показать расписание</span>
            </div>
        })
    }

    const showTimes = (currentStop) => {
        const routesWithStop = getRoutesWithCurrentStop(currentStop, props.routesTxt);
        const stopNumberInRoutes = getStopQueueOrderInRoutes(routesWithStop, currentStop);
        const timesForRoutes = getTimesForRoutes(routesWithStop, props.times);
        const timesForStop = getTimesForStopWithRoute(stopNumberInRoutes, timesForRoutes);

        const currentRouteId = currentRoute[ROUTE_ID_INDEX];
        const timeForRoute = convertMinutesToHours(timesForStop[currentRouteId])

        return <div className={css.times_wrapper}>
            <div className={css.route_name_in_times}>{currentRoute[ROUTE_NAME_INDEX]}</div>
            {timeForRoute.map(time => {
                return <span className={css.time}>{time}</span>
            })}
        </div>

    }

    const buildRoute = (currentStop) => {
        console.log(currentStop);
    }

    return <>
        {currentStop && currentStop.id === marker.id && (
            <InfoWindow onCloseClick={() => setCurrentStop(null)}>
                <div>
                    <h2 className={css.stop_name}>
                        {currentStop.name}
                        {currentRoute
                            ? <span className={css.show_routes}
                              onClick={() => setCurrentRoute(null)}>Показать маршруты</span>
                            : <span className={css.build_route}
                              onClick={() => buildRoute(currentStop)}>Построить маршрут</span>}
                    </h2>
                    {!currentRoute && showRoutes(currentStop)}
                    {currentRoute && showTimes(currentStop)}
                </div>
            </InfoWindow>)}
    </>
}


export default CustomInfoWindow;