import React from 'react';
import css from "./BuildingRoutes.module.css";
import {ROUTE_NAME_INDEX} from "../../constants";
import {MarkerType} from "../../bll/reducers/staticData";
import cross_icon from '../../assets/image/drop_route.png'
import arrows from '../../assets/image/arrows.png';

type BuildingRouteResultOwnPropsType = {
    buildAPoint: MarkerType
    buildBPoint: MarkerType
    buildWaypoint: MarkerType | null
    buildRoutes: Array<Array<string>>
    setIsShowingBuildingRouteResult: (isShowing: boolean) => void
}

type BuildingRouteResultPropsType = BuildingRouteResultOwnPropsType

const BuildingRouteResult: React.FC<BuildingRouteResultPropsType> = (props) => {

    return (
        <div className={css.building_route_wrapper}>
            <div className={css.building_route_block}>
                <div className={css.building_route_points}>
                    <div className={css.point_block}>
                        <span className={css.point_word}>точка А</span>
                        <span className={css.point_name}>{props.buildAPoint.name}</span>
                        <span className={css.point_route}>({props.buildRoutes[0][ROUTE_NAME_INDEX]})</span>
                    </div>
                    <div className={css.arrows_block}>
                        <img src={arrows} alt=""/>
                    </div>
                    {props.buildWaypoint &&
                    <div>
                        <div className={css.point_block}>
                            <span className={css.point_word}>Пересадки</span>
                            <span className={css.point_name}>{props.buildWaypoint.name}</span>
                        </div>
                        <div className={css.arrows_block}>
                            <img src={arrows} alt=""/>
                        </div>
                    </div>
                    }
                    <div className={css.point_block}>
                        <span className={css.point_word}>точка Б</span>
                        <span className={css.point_name}>{props.buildBPoint.name}</span>
                        {props.buildRoutes.length > 1 && <span
                            className={css.point_route}>({props.buildRoutes[1][ROUTE_NAME_INDEX]})</span>}
                    </div>
                </div>
                <div className={css.build_btn_close} onClick={() => props.setIsShowingBuildingRouteResult(false)}>
                    <img src={cross_icon} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default BuildingRouteResult;