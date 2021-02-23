import React, {useState} from "react";
import {MarkerType} from "../../bll/reducers/staticData";
import css from './BuildingRoutes.module.css';
import accept_route from '../../assets/image/accept_route.png';
import not_active_accept_route from '../../assets/image/not_active_accept_route.png';
import {connect} from "react-redux";
import {AppStateType} from "../../bll/store";
import {getRoutesWithCurrentStop, makeDirectionFormat, setDirectionsData} from "../../services/routes";
import {
    checkDirectRoutes, chooseRouteByTime, getMatchingStopInRoutes,
    getMatchingStopsInRoutes,
    getPossibleRoutes
} from "../../services/buildRoute";
import {DirectionType} from "../../bll/reducers/dynamicData";
import {getStopDataByStopId} from "../../services/stops";
import {ROUTE_NAME_INDEX} from "../../constants";

type BuildingRouteOwnPropsType = {
    stopsTxt: string
    routesTxt: string
    setDirections: (direction: DirectionType) => void
}

type BuildingRouteStatePropsType = {
    pointsInBuildingRoute: Array<MarkerType | null>
}

type BuildingRoutePropsType = BuildingRouteOwnPropsType & BuildingRouteStatePropsType;

const BuildingRoute: React.FC<BuildingRoutePropsType> = (props) => {

    const [buildAPoint, setBuildAPoint] = useState<MarkerType | null>(null)
    const [buildBPoint, setBuildBPoint] = useState<MarkerType | null>(null)
    const [buildWaypoint, setBuildWaypoint] = useState<MarkerType | null>(null)
    const [buildRoutes, setBuildRoutes] = useState([])

    const setHooks = (pointA, pointB, waypoint, routes) => {
        setBuildAPoint(pointA);
        setBuildBPoint(pointB);
        setBuildWaypoint(waypoint);
        setBuildRoutes(routes);
    }

    const renderRoutesOfPoints = (points) => {
        const pointA = points[0];
        const pointB = points[1];
        const pointARoutes = getRoutesWithCurrentStop(pointA, props.routesTxt);
        const pointBRoutes = getRoutesWithCurrentStop(pointB, props.routesTxt);
        const directRoutes = checkDirectRoutes(pointARoutes, pointBRoutes);

        if (directRoutes.length) {
            const chosenRoute = chooseRouteByTime(directRoutes);
            const directionData = makeDirectionFormat(pointA, pointB, []);
            setHooks(pointA, pointB, null, [chosenRoute])
            setDirectionsData(directionData, props.setDirections);
        } else {
            const matchingStops = getMatchingStopsInRoutes(pointARoutes, pointBRoutes);

            if (matchingStops.length) {
                const possibleRoutesForA = getPossibleRoutes(matchingStops, pointARoutes);
                const possibleRoutesForB = getPossibleRoutes(matchingStops, pointBRoutes);
                const chosenRouteA = chooseRouteByTime(possibleRoutesForA);
                const chosenRouteB = chooseRouteByTime(possibleRoutesForB);
                const matchingStop = getStopDataByStopId(getMatchingStopInRoutes(chosenRouteA, chosenRouteB), props.stopsTxt);
                // @ts-ignore
                const directionData = makeDirectionFormat(pointA, pointB, [{location: matchingStop.position}]);
                setHooks(pointA, pointB, matchingStop, [chosenRouteA, chosenRouteB])
                setDirectionsData(directionData, props.setDirections);
            }
        }
    }

    return (
        <>
            {buildAPoint && buildBPoint && props.pointsInBuildingRoute.length &&
            <div className={css.building_route_wrapper}>
                <div className={css.building_route_block}>
                    <div className={css.building_route_points}>
                        <div className={css.point_A}>
                            точка А: {buildAPoint.name} (По маршруту: {buildRoutes[0][ROUTE_NAME_INDEX]})
                        </div>
                        <hr/>
                        {buildWaypoint &&
                        <div>
                            <div className={css.point_A}>
                                Пересадка: {buildWaypoint.name}
                            </div>
                            <hr/>
                        </div>
                        }
                        <div className={css.point_B}>
                            точка
                            Б: {buildBPoint.name} {buildRoutes.length > 1 && <span>(По маршруту: {buildRoutes[1][ROUTE_NAME_INDEX]})</span>}
                        </div>
                    </div>
                </div>
            </div>
            }
            {props.pointsInBuildingRoute.length && !buildBPoint && !buildAPoint &&
            <div className={css.building_route_wrapper}>
                <div className={css.building_route_block}>
                    <div className={css.building_route_points}>
                        <div className={css.point_A}>
                            точка А: {props.pointsInBuildingRoute[0]?.name}
                        </div>
                        <hr/>
                        <div className={css.point_B}>
                            точка Б: {props.pointsInBuildingRoute[1]?.name}
                        </div>
                    </div>
                    {props.pointsInBuildingRoute.length == 2 && props.pointsInBuildingRoute[0] !== props.pointsInBuildingRoute[1]
                        ? <div className={css.build_btn} onClick={() => renderRoutesOfPoints(props.pointsInBuildingRoute)}>
                            <img src={accept_route} alt=""/>
                        </div>
                        : <div className={css.not_active_build_btn}>
                            <img src={not_active_accept_route} alt=""/>
                        </div>
                    }
                </div>
            </div>
            }
        </>
    )
}

let mapStateToProps = (state: AppStateType): BuildingRouteStatePropsType => {
    return {
        pointsInBuildingRoute: state.dynamicData.pointsInBuildingRoute,
    }
}

export default connect(mapStateToProps, {})(BuildingRoute);