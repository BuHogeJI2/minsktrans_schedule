import React from 'react'
import Map from "./map/Map";
import css from './Main.module.css'

const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&callback=initMap`

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

