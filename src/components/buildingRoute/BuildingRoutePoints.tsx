import React from 'react';
import css from "./BuildingRoutes.module.css";
import arrow from '../../assets/image/arrow.png';
import arrow_green from '../../assets/image/arrow_green.png';
import {MarkerType} from "../../bll/reducers/staticData";

type BuildingRoutePointsOwnPropsType = {
    pointsInBuildingRoute: Array<MarkerType | null>
    renderRoutesOfPoints: (points: Array<MarkerType | null>) => void
}

type BuildingRoutePointsPropsType = BuildingRoutePointsOwnPropsType;

const BuildingRoutePoints: React.FC<BuildingRoutePointsPropsType> = (props) => {

    return (
        <div className={css.building_route_wrapper}>
            <div className={css.building_route_block}>
                <div className={css.building_route_points}>
                    <div className={css.point_block}>
                        <span className={css.point_word}>точка А</span>
                        {props.pointsInBuildingRoute[0]?.name}
                    </div>
                    {props.pointsInBuildingRoute.length == 2 &&
                     props.pointsInBuildingRoute[0] !== props.pointsInBuildingRoute[1]
                        ? <div className={css.build_btn}
                               onClick={() => props.renderRoutesOfPoints(props.pointsInBuildingRoute)}>
                            <img src={arrow_green} alt=""/>
                        </div>
                        : <div className={css.build_btn}>
                            <img src={arrow} alt=""/>
                        </div>
                    }
                    <div className={css.point_block}>
                        <span className={css.point_word}>точка Б</span>
                        {props.pointsInBuildingRoute[1]?.name}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuildingRoutePoints;