import React from 'react'
import Map from "./map/Map";
import css from './Main.module.css'

const MAP_API_KEY = 'AIzaSyCDEmqfw0DMVYSqCnoSnNKb3b8tABnhs9A'
const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

const Main = (props) => {
    return (
        <div className={css.map_wrapper}>
            <Map containerElement={<div className={css.container_element} />}
                 mapElement={<div style={{height: '100%'}}/>}
                 loadingElement={<div style={{height: '100%'}} />}
                 googleMapURL={MAP_URL}
            />
        </div>
    )
}

export default Main;

