import React from 'react'
import Map from "./map/Map";
import css from './Main.module.css'
import {MAP_URL} from "../constants";

const Main = () => {
    return (
        <div className={css.map_wrapper}>
            <Map containerElement={<div className={css.container_element} />}
                 mapElement={<div className={css.container_element} />}
                 loadingElement={<div className={css.container_element} />}
                 googleMapURL={MAP_URL}
            />
        </div>
    )
}

export default Main;

