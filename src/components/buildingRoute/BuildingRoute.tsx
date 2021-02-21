import React from "react";
import {MarkerType} from "../../bll/reducers/staticData";
import css from './BuildingRoutes.module.css';
import accept_route from '../../assets/image/accept_route.png';
import not_active_accept_route from '../../assets/image/not_active_accept_route.png';

type BuildingRouteOwnPropsType = {
    pointsInBuildingRoute: Array<MarkerType | null>
}

const BuildingRoute: React.FC<BuildingRouteOwnPropsType> = (props) => {

    return (
        <>
            {console.log(props.pointsInBuildingRoute)}
            {props.pointsInBuildingRoute.length &&
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
                        ? <div className={css.build_btn}>
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

export default BuildingRoute;