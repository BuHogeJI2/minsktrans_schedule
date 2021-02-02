import React, {useEffect, useState} from 'react'
import Map from "./map/Map";
import css from './Main.module.css'
import {fetchInfo} from "../api";
import {MAP_URL, ROUTES_FILE_NAME, STOPS_FILE_NAME, TIMES_FILE_NAME} from "../constants";

const Main = () => {

    const [stopsTxt, setStopsTxt] = useState('');
    const [routesTxt, setRoutesTxt] = useState('');
    const [timesTxt, setTimesTxt] = useState('')

    useEffect( () => {
        fetchInfo(STOPS_FILE_NAME, setStopsTxt);
        fetchInfo(ROUTES_FILE_NAME, setRoutesTxt);
        fetchInfo(TIMES_FILE_NAME, setTimesTxt);


    }, [])

    return (
        <div className={css.map_wrapper}>
            <Map containerElement={<div className={css.container_element} />}
                 mapElement={<div className={css.container_element} />}
                 loadingElement={<div className={css.container_element} />}
                 googleMapURL={MAP_URL}
                 stopsTxt={stopsTxt}
                 routesTxt={routesTxt}
                 timesTxt={timesTxt}
            />
        </div>
    )
}

export default Main;

