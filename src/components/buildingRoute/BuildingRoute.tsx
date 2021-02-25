import React, {useState} from "react";
import {MarkerType} from "../../bll/reducers/staticData";
import {connect} from "react-redux";
import {AppStateType} from "../../bll/store";
import {getRoutesWithCurrentStop, makeDirectionFormat, setDirectionsData} from "../../services/routes";
import {
    checkDirectRoutes, chooseRouteByTime, getMatchingStopInRoutes,
    getMatchingStopsInRoutes,
    getPossibleRoutes
} from "../../services/buildRoute";
import {DirectionType, setIsShowingBuildingRouteResult} from "../../bll/reducers/dynamicData";
import {getStopDataByStopId} from "../../services/stops";
import BuildingRouteResult from "./BuildingRouteResult";
import BuildingRoutePoints from "./BuildingRoutePoints";

type BuildingRouteOwnPropsType = {
    stopsTxt: string
    routesTxt: string
    setDirections: (direction: DirectionType) => void
}

type BuildingRouteDispatchPropsType = {
    setIsShowingBuildingRouteResult: (isShowing: boolean) => void
}

type BuildingRouteStatePropsType = {
    pointsInBuildingRoute: Array<MarkerType | null>
    isShowingBuildingRouteResult: boolean
}

type BuildingRoutePropsType = BuildingRouteOwnPropsType & BuildingRouteStatePropsType & BuildingRouteDispatchPropsType;

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
        props.setIsShowingBuildingRouteResult(true);
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
        <div>
            {props.isShowingBuildingRouteResult && buildAPoint && buildBPoint &&
            <BuildingRouteResult buildAPoint={buildAPoint}
                                 buildBPoint={buildBPoint}
                                 buildWaypoint={buildWaypoint}
                                 buildRoutes={buildRoutes}
                                 setIsShowingBuildingRouteResult={props.setIsShowingBuildingRouteResult}/>
            }
            {props.pointsInBuildingRoute.length && !props.isShowingBuildingRouteResult &&
            <BuildingRoutePoints pointsInBuildingRoute={props.pointsInBuildingRoute}
                                 renderRoutesOfPoints={renderRoutesOfPoints}/>
            }
        </div>
    )
}

let mapStateToProps = (state: AppStateType): BuildingRouteStatePropsType => {
    return {
        pointsInBuildingRoute: state.dynamicData.pointsInBuildingRoute,
        isShowingBuildingRouteResult: state.dynamicData.isShowingBuildingRouteResult,
    }
}

export default connect(mapStateToProps, {setIsShowingBuildingRouteResult})(BuildingRoute);