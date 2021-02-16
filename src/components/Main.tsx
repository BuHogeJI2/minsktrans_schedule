import React, {useEffect} from 'react'
import Map from "./map/Map";
import css from './Main.module.css'
import {MAP_URL} from "../constants";
import {connect} from "react-redux";
import {fetchAllData} from "../bll/reducers/serverData";
import {AppStateType} from "../bll/store";

type MainStatePropsType = {
    stopsTxt: string
    routesTxt: string
    timesTxt: string
}

type MainDispatchPropsType = {
    fetchAllData: () => void
}

type MainPropsType = MainStatePropsType & MainDispatchPropsType;

const Main: React.FC<MainPropsType> = (props) => {

    useEffect(() => {
        props.fetchAllData();
    }, [props])

    return (
        <div className={css.map_wrapper}>
            <Map containerElement={<div className={css.container_element}/>}
                 mapElement={<div className={css.container_element}/>}
                 loadingElement={<div className={css.container_element}/>}
                 googleMapURL={MAP_URL}
                 stopsTxt={props.stopsTxt}
                 routesTxt={props.routesTxt}
                 timesTxt={props.timesTxt}
            />
        </div>
    )
}

let mapStateToProps = (state: AppStateType) => {
    return {
        stopsTxt: state.serverData.stopsTxt,
        routesTxt: state.serverData.routesTxt,
        timesTxt: state.serverData.timesTxt,
    }
}

export default connect(mapStateToProps, {fetchAllData})(Main);

