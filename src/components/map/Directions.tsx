import React from 'react';
import waypointIcon from "../../assets/image/waypoint_icon.png";
import {DirectionsRenderer} from "react-google-maps";
import {DirectionType} from "../../bll/reducers/dynamicData";

type DirectionsPropsType = {
    directions: DirectionType
}

const Directions: React.FC<DirectionsPropsType> = (props) => {

    const DIRECTION_OPTIONS = {
        polylineOptions: {
            stokeColor: "#ff0000",
            strokeOpacity: 0.5,
            strokeWeight: 5
        },
        markerOptions: {icon: waypointIcon},
        icon: {scale: 1}
    }

    return (
        <DirectionsRenderer directions={props.directions}
                            options={DIRECTION_OPTIONS}
        />
    )
}

export default Directions;