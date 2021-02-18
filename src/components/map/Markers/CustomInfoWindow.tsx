import {InfoWindow} from "react-google-maps";
import css from "../Map.module.css";
import React from "react";
import {getDirectionData, getRoutesWithCurrentStop, setDirectionsData} from "../../../services/routes";
import {ROUTE_ID_INDEX, ROUTE_NAME_INDEX} from "../../../constants";
import {
    convertMinutesToHours,
    getStopQueueOrderInRoutes,
    getTimesForRoutes,
    getTimesForStopWithRoute
} from "../../../services/times";
import {MarkerType, TimeDataType} from "../../../bll/reducers/staticData";
import {DirectionType} from "../../../bll/reducers/dynamicData";
import {connect} from "react-redux";
import {AppStateType} from "../../../bll/store";

type CustomInfoWindowOwnPropsType = {
    marker: MarkerType
    times: Array<TimeDataType>
    routesTxt: string
    stopsTxt: string
    setDirections: (direction: DirectionType) => void
    setCurrentStop: (stop: MarkerType | null) => void
    setCurrentRoute: (direction: Array<string> | null) => void
}

type CustomInfoWindowStatePropsType = {
    currentStop: MarkerType | null
    currentRoute: Array<string> | null
}

type CustomInfoWindowPropsType = CustomInfoWindowOwnPropsType & CustomInfoWindowStatePropsType;

const CustomInfoWindow: React.FC<CustomInfoWindowPropsType> = (props) => {

    const renderDirection = (route: Array<string> | null) => {
        const directionData = getDirectionData(route, props.stopsTxt);
        setDirectionsData(directionData, props.setDirections);
    }

    const showRoutes = (currentStop: MarkerType | null) => {
        const routes = getRoutesWithCurrentStop(currentStop, props.routesTxt);
        return routes.map(route => {
            return <div className={css.routeWithStop}>
                <span className={css.route_name_in_routes}
                      onClick={() => renderDirection(route)}>{route[ROUTE_NAME_INDEX]}</span>
                <span className={css.show_times} onClick={() => props.setCurrentRoute(route)}>Показать расписание</span>
            </div>
        })
    }

    const showTimes = (currentStop: MarkerType | null) => {
        const routesWithStop = getRoutesWithCurrentStop(currentStop, props.routesTxt);
        const stopNumberInRoutes = getStopQueueOrderInRoutes(routesWithStop, currentStop);
        const timesForRoutes = getTimesForRoutes(routesWithStop, props.times);
        const timesForStop = getTimesForStopWithRoute(stopNumberInRoutes, timesForRoutes);

        const currentRouteId = props.currentRoute && props.currentRoute[ROUTE_ID_INDEX];
        const timeForRoute = convertMinutesToHours(timesForStop[currentRouteId])

        return <div className={css.times_wrapper}>
            {props.currentRoute &&
            <div className={css.route_name_in_times}>{props.currentRoute[ROUTE_NAME_INDEX]}</div>}

            {timeForRoute.map(time => {
                return <span className={css.time}>{time}</span>
            })}
        </div>

    }

    const buildRoute = (currentStop: MarkerType | null) => {
        console.log(currentStop);
    }

    return <>
        {props.currentStop && props.currentStop.id === props.marker.id && (
            <InfoWindow onCloseClick={() => props.setCurrentStop(null)}>
                <div>
                    <h2 className={css.stop_name}>
                        {props.currentStop.name}
                        {props.currentRoute
                            ? <span className={css.show_routes}
                              onClick={() => props.setCurrentRoute(null)}>Показать маршруты</span>
                            : <span className={css.build_route}
                              onClick={() => buildRoute(props.currentStop)}>Построить маршрут</span>}
                    </h2>
                    {!props.currentRoute && showRoutes(props.currentStop)}
                    {props.currentRoute && showTimes(props.currentStop)}
                </div>
            </InfoWindow>)}
    </>
}

let mapStateToProps = (state: AppStateType) => {
    return {
        currentStop: state.dynamicData.currentStop,
        currentRoute: state.dynamicData.currentRoute
    }
}

export default connect(mapStateToProps, {})(CustomInfoWindow);